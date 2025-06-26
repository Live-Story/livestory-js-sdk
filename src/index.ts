import { LIVESTORY_AGENT, LIVESTORY_JS_CLIENT_AGENT } from "./constants"
import { 
  ILsCampaignData,
  ILsConfig,
  ILsContentsParams,
  ILsCustomFetch,
  ILsDestinationData,
  ILsDestinationFoldersParams,
  ILsDestinationParams,
  ILsDestinationsParams,
  ILsError,
  ILsLayoutData,
  ILsFolderData,
  ILsLayoutFolderParams,
  ILsLayoutFoldersParams,
  ILsLayoutParams,
  ILsLayoutsParams,
  ILsPostFolderParams,
  ILsPostFoldersParams,
  ILsPostsParams,
  ILsResult,
  ILsWorskspacesParams,
  ILsPostData,
  ILsResponseData 
} from "./interfaces"
import LsFetch from "./lsFetch"
import { LsHelpers } from "./lsHelpers"

const VERSION = {
  V1: 'v1'
} as const

type ObjectValues<T> = T[keyof T]
type Version = ObjectValues<typeof VERSION>

class Livestory {

  private client: LsFetch
  private accessToken: string
  private helpers: LsHelpers

    /**
   *
   * @param config ILsConfig interface
   * @param endpoint string, optional
   */
  public constructor(config: ILsConfig, pEndpoint?: string) {
    let endpoint = config.endpoint || pEndpoint

    if (!endpoint) {
      const protocol = config.https === false ? 'http' : 'https'
      endpoint = `${protocol}://api.livestory.io/delivery/${'v1' as Version}`
    }

    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    if (config.headers) {
      for (const header in config.headers) {
        headers.set(header, config.headers[header])
      }
    }

    if (!headers.has(LIVESTORY_AGENT)) {
      headers.set(LIVESTORY_AGENT, LIVESTORY_JS_CLIENT_AGENT.defaultAgentName)
      headers.set(
        LIVESTORY_JS_CLIENT_AGENT.defaultAgentVersion,
        LIVESTORY_JS_CLIENT_AGENT.packageVersion
      )
    }

    this.accessToken = config.accessToken ?? ''

    this.client = new LsFetch({
      baseURL: endpoint,
      timeout: config.timeout ?? 0,
      headers: headers,
      fetch: config.fetch,
    })

    this.helpers = new LsHelpers()
  }

  private getToken(): string {
    return this.accessToken
  }

  private parseParams(params: ILsContentsParams): ILsContentsParams {
    if (!params.access_token) {
      params.access_token = this.getToken()
    }

    return params
  }

  private factoryParamOptions(
    url: string,
    params: ILsContentsParams
  ): ILsContentsParams {
    if (this.helpers.isCDNUrl()) {
      return this.parseParams(params)
    }

    return params
  }

  private makeRequest(
    url: string,
    params: ILsContentsParams,
    skip?: number,
    limit?: number
  ): Promise<ILsResult> {
    const query = this.factoryParamOptions(
      url,
      this.helpers.getOptionsPage(params, limit, skip)
    )

    if (query.id) {
      delete query.id
      delete query.limit
      delete query.skip
    }

    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.client.get(url, query)
        if (res.status !== 200) {
          return reject(res)
        }

        const response = { data: (res as ILsResult).data, headers: (res as ILsResult).headers, status: res.status } as ILsResult

        return resolve(response)

      } catch (error) {
        reject(error)
      }
    })
  }

  private async get(
    slug: string,
    params: ILsLayoutsParams,
  ): Promise<ILsResult | ILsError> {
    console.log('merda')
    if (!params) {
      params = {} as ILsContentsParams;
    }
    const url = `/${slug}`;
    const query = this.factoryParamOptions(url, params);

    const result = await this.makeRequest(url, params)

    return Promise.resolve(result)
  }

  public async getLayouts(
    params: ILsLayoutsParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsLayoutData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/layouts`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getLayout(
    params: ILsLayoutParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsLayoutData> {
    const url = `/layouts/${params.id}`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params)

    return Promise.resolve(result.data)
  }

  public async getPages(
    params: ILsDestinationsParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsDestinationData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/destinations`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getPage(
    params: ILsDestinationParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsDestinationData> {
    const url = `/destinations/${params.id}`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params)

    return Promise.resolve(result.data)
  }

  public async getWorkspaces(
    params: ILsWorskspacesParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsCampaignData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/campaigns`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getLayoutFolders(
    params: ILsLayoutFoldersParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsFolderData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/layouts/folders`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getLayoutFolder(
    params: ILsLayoutFolderParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsFolderData> {
    const url = `/layouts/folders/${params.id}`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params)

    return Promise.resolve(result.data)
  }

  public async getPageFolders(
    params: ILsDestinationFoldersParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsFolderData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/destinations/folders`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getPosts(
    params: ILsPostsParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsPostData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/posts`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getPostFolders(
    params: ILsPostFoldersParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsResponseData<ILsFolderData>> {
    const limit = params?.limit || 25
    const skip = params?.skip || 0
    const url = `/posts/folders`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params, skip, limit)

    return Promise.resolve(result.data)
  }

  public async getPostFolder(
    params: ILsPostFolderParams,
    fetchOptions?: ILsCustomFetch
  ): Promise<ILsFolderData> {
    const url = `/posts/folders/${params.id}`

    this.client.setFetchOptions(fetchOptions)

    const result = await this.makeRequest(url, params)

    return Promise.resolve(result.data)
  }

}

export default Livestory
