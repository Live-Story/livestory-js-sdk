import Client from './index'
import LsFetch from './lsFetch'
import * as lsHelpers from './lsHelpers'

const extend = (to: Record<any, any>, _from: Record<any, any>) => {
  for (const key in _from) to[key] = _from[key]
}

extend(Client, { LsFetch })
extend(Client, lsHelpers)

// Single default export object for UMD friendly bundle
export default Client
