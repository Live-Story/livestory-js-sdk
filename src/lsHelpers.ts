import { ILsContentsParams } from './interfaces'

interface ILsParams extends ILsContentsParams {
  [key: string]: any
}

export class LsHelpers {
  public isCDNUrl = () => true

  public getOptionsPage = (
    options: ILsContentsParams,
    limit = 25,
    skip = 0
  ) => {
    return {
      ...options,
      limit,
      skip
    }
  }

  /**
   * @method stringify
   * @param  {Object} params
   * @param  {String} prefix
   * @param  {Boolean} isArray
   * @return {String} Stringified object
   */
  public stringify(
    params: ILsParams,
    prefix?: string,
    isArray?: boolean,
    attibutes?: Set<string>
  ): string {
    const pairs = []

    for (const key in params) {
      if (!Object.prototype.hasOwnProperty.call(params, key)) {
        continue
      }
      const value = params[key]
      const enkey = isArray ? '' : key

      const isAttribute = attibutes?.has(enkey);

      let pair
      if (typeof value === 'object') {
        pair = this.stringify(
          value,
          prefix ? prefix + (enkey ? encodeURIComponent('[' + (isAttribute ? 'attributes.' : '') + enkey + ']') : '') : enkey,
          Array.isArray(value),
          attibutes
        )
      } else {
        pair =
          (prefix ? prefix + encodeURIComponent('[' +  (isAttribute ? 'attributes.' : '') + enkey + ']') : enkey) +
          '=' +
          encodeURIComponent(value)
      }
      pairs.push(pair)
      
    }
    return pairs.join('&')
  }

}
