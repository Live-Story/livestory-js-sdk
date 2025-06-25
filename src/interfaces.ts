

export interface ILsRequestParams {
  access_token?: string
  limit?: number
  skip?: number
}

export interface ILsWorskspacesParams extends ILsRequestParams {
  sort_by?: string
  filter_query?: any
}

export interface ILsLayoutsParams
  extends ILsDestinationsParams {
    campaign_id?: string
    text?: string
  }

export interface ILsDestinationsParams extends ILsRequestParams {
  folder_id?: string
  store_code?: string
  lang_code?: string
  sort_by?: string
  filter_query?: any
}

export interface ILsContentsParams extends ILsLayoutsParams, Partial<ILsLayoutParams>, ILsDestinationsParams, ILsRequestParams {}

export interface ILsLayoutParams {
  id: string
  lang_code?: string
  store_code?: string
  ssr?: boolean
}

export interface ILsDestinationParams extends Partial<ILsLayoutParams> {}

export interface ILsLayoutFoldersParams extends Partial<ILsRequestParams> {
  campaign_id?: string
  parent_folder?: string
  project?: boolean
  sort_by?: string
  filter_query?: any
}

export interface ILsFolderData {
  _id: string
  campaign_id?: string
  parent_folder?: string
  project?: boolean
  brand?: string
  name: string
  attributes?: { [key: string]: number | string }
}

export interface ILsLayoutFolderParams {
  id: string
}

export interface ILsDestinationFoldersParams extends Partial<ILsRequestParams> {
  parent_folder?: string
  sort_by?: string
  filter_query?: any
}

export interface ILsPostsParams extends ILsDestinationsParams {
  campaign_id?: string
}

export interface ILsPostFoldersParams extends ILsLayoutFoldersParams {}

export interface ILsPostFolderParams {
  id: string
}

export interface ILsCampaignData<> extends ILsMultipleContentData {
  social_settings?: any
  active?: boolean
  authorized_domains?: string[]
  sources?: string[]
}

export interface ILsLayoutData<> extends ILsMultipleContentData {
  wall_id: string
  campaign_id?: string
  timestamp: string
  subtype?: string
  wall_timestamp: string
  embedcode?: string
  embedcode_ssr?: string
  ssr?: string
  folder_id?: string
}

export interface ILsDestinationData<> extends ILsMultipleContentData {
  wall_ids: string[]
  style?: string
  theme?: string
  subtype?: string
  timestamp: string
  wall_timestamp: string
  ab_experience_id?: string
  ab_tests?: any[]
  ds_schedule?: any[]
  wall_schedule?: any[]
}

export interface ILsMultipleContentData {
  _id?: string
  brand?: string
  name?: string
  title?: string
  description?: string
  hashtags?: string
  tags?: string[]
  type?: string
  integrations?: any[]
  style?: string
  theme?: string
  thumb?: string
  cover_picture?: string
}

export interface ILsPhoto {
  path?: string
  width?: number
  height?: number
  content_length?: number
  low: {
    url: string
    width: number
    height: number
  },
  medium: {
    url: string
    width: number
    height: number
  },
  high: {
    url: string
    width: number
    height: number
  }
}

export interface ILsVideoProps {
  url: string;
  width: number;
  height: number;
  content_length: number;
  path: string;
  poster: string;
  poster_path: string;
}

export interface ILsVideo {
  standard: ILsVideoProps;
  v240p: ILsVideoProps;
  v360p: ILsVideoProps;
  v480p: ILsVideoProps;
  v640p: ILsVideoProps;
  v720p: ILsVideoProps;
  v1080p: ILsVideoProps;
  v1440p: ILsVideoProps;
  v2160p: ILsVideoProps;
  v4320p: ILsVideoProps;
  optimized: ILsVideoProps;
}

export interface ILsPostData {
  _id: string
  title: string
  description: string
  type: string
  text: string
  tags: string[]
  hashtags: string
  thumb: string
  cover_picture: string
  pictures: ILsPhoto[]
  videos: ILsVideo[]
  medias: any[]
  link: string
  timestamp: string
  folder_id?: string
}

export interface ILsConfig {
  accessToken?: string
  timeout?: number
  headers?: any
  region?: string
  fetch?: typeof fetch
  maxRetries?: number
  https?: boolean
  endpoint?: string
}

export interface ILsResult {
  data: any
  //perPage: number
  total: number
  headers: Headers
  status?: number
}

export interface ILsResponse {
  data: any
  status: number
  statusText: string
}

export interface ILsPaging {
  count: number;
}

export interface ILsResponseData<T> {
  items: T[];
  paging?: ILsPaging;
}

export interface ILsError {
  message?: string
  status?: number
  response?: ILsResponse
}

export interface ILsCustomFetch extends Omit<RequestInit, 'method'> {}