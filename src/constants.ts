const METHOD = {
    GET: 'get',
    DELETE: 'delete',
    POST: 'post',
    PUT: 'put',
  } as const
  
  type ObjectValues<T> = T[keyof T]
  type Method = ObjectValues<typeof METHOD>
  
  export default Method
  
  export const LIVESTORY_AGENT = 'LS-Agent'
  
  export const LIVESTORY_JS_CLIENT_AGENT = {
    defaultAgentName: 'LS-JS-CLIENT',
    defaultAgentVersion: 'LS-Agent-Version',
    packageVersion: '1.0.0',
  }
  