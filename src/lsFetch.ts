import { LsHelpers } from './lsHelpers'

import {
  ILsResponse,
  ILsError,
  ILsContentsParams,
  ILsCustomFetch
} from './interfaces'
import Method from './constants'

export type ResponseFn = {
  (arg?: ILsResponse | any): any
}

interface ILsFetch {
  baseURL: string
  timeout?: number
  headers: Headers
  responseInterceptor?: ResponseFn
  fetch?: typeof fetch
}

class LsFetch {
  private baseURL: string
  private timeout?: number
  private headers: Headers
  private responseInterceptor?: ResponseFn
  private fetch: typeof fetch
  private ejectInterceptor?: boolean
  private url: string
  private parameters: ILsContentsParams
  private fetchOptions: ILsCustomFetch

  public constructor($c: ILsFetch) {
    this.baseURL = $c.baseURL
    this.headers = $c.headers || new Headers()
    this.timeout = $c?.timeout ? $c.timeout * 1000 : 0
    this.responseInterceptor = $c.responseInterceptor
    this.fetch = (...args: [any]) =>
      $c.fetch ? $c.fetch(...args) : fetch(...args)
    this.ejectInterceptor = false
    this.url = ''
    this.parameters = {} as ILsContentsParams
    this.fetchOptions = {}
  }

  /**
   *
   * @param url string
   * @param params ILsContentsParams
   * @returns Promise<ILsResponse | Error>
   */
  public get(url: string, params: ILsContentsParams) {
    this.url = url
    this.parameters = params
    return this._methodHandler('get')
  }

  private async _responseHandler(res: Response) {
    const headers: string[] = []
    const response = {
      data: {},
      headers: {},
      status: 0,
      statusText: '',
    }

    if (res.status !== 204) {
      await res.json().then(($r) => {
        response.data = $r
      })
    }

    for (const pair of res.headers.entries()) {
      headers[pair[0] as any] = pair[1]
    }

    response.headers = { ...headers }
    response.status = res.status
    response.statusText = res.statusText

    return response
  }

  private async _methodHandler(
    method: Method
  ): Promise<ILsResponse | ILsError> {
    let urlString = `${this.baseURL}${this.url}`

    let body = null

    const attributes = new Set<string>()

    if (Object.prototype.hasOwnProperty.call(this.parameters, 'filter_query')) {
      if (Object.prototype.hasOwnProperty.call(this.parameters.filter_query, '$or')) {
        const or = this.parameters.filter_query.$or
        or.forEach((element: any) => {
          Object.keys(element).forEach((key) => attributes.add(key))
        })
      }
      Object.keys(this.parameters.filter_query).forEach((key) => {
        if (key !== '$or') {
          attributes.add(key)
        }
      })
    }

    if (method === 'get') {
      const helper = new LsHelpers()
      urlString = `${this.baseURL}${this.url}?${helper.stringify(
        this.parameters,
        '',
        false,
        attributes
      )}`
    } else {
      body = JSON.stringify(this.parameters)
    }

    const url = new URL(urlString)

    const controller = new AbortController()
    const { signal } = controller

    let timeout

    if (this.timeout) {
      timeout = setTimeout(() => controller.abort(), this.timeout)
    }

    try {
      const fetchResponse = await this.fetch(`${url}`, {
        method,
        headers: this.headers,
        body,
        signal,
        ...this.fetchOptions,
      })

      if (this.timeout) {
        clearTimeout(timeout)
      }

      const response = (await this._responseHandler(
        fetchResponse
      )) as ILsResponse

      if (this.responseInterceptor && !this.ejectInterceptor) {
        return this._statusHandler(this.responseInterceptor(response))
      } else {
        return this._statusHandler(response)
      }
    } catch (err: any) {
      const error: ILsError = {
        message: err,
      }
      return error
    }
  }

  public setFetchOptions(fetchOptions: ILsCustomFetch = {}) {
    if (Object.keys(fetchOptions).length > 0 && 'method' in fetchOptions) {
      delete fetchOptions.method
    }
    this.fetchOptions = { ...fetchOptions }
  }

  public eject() {
    this.ejectInterceptor = true
  }

  private _statusHandler(res: ILsResponse): Promise<ILsResponse | ILsError> {
    const statusOk = /20[0-6]/g

    return new Promise((resolve, reject) => {

      if (statusOk.test(`${res.status}`)) {
        return resolve(res)
      }

      const error: ILsError = {
        message: res.data.message || res.statusText,
        status: res.status,
        response: res
      }

      reject(error)
    })
  }
}

export default LsFetch
