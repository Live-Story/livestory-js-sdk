const METHOD = {
    GET: 'get',
    DELETE: 'delete',
    POST: 'post',
    PUT: 'put',
  } as const
  
  type ObjectValues<T> = T[keyof T]
  type Method = ObjectValues<typeof METHOD>
  
  export default Method
  
  export const LIVESTORY_AGENT = 'x-ls-agent'
  
  export const LIVESTORY_JS_CLIENT_AGENT = {
    defaultAgentName: 'LS-JS-CLIENT',
    defaultAgentVersion: 'x-ls-agent-version',
    packageVersion: '1.0.0',
  }
  