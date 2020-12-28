export interface RequestBase {
  url: string
  method: 'GET' | 'POST'
  data: any
  header: RequestHeader
  loading: boolean
  mask: boolean
  title: string
  failToast: boolean
}

export interface RequestHeader {
  'content-type': string
  token?: string
}

 type Request = {
  [k in keyof RequestBase]?: RequestBase[k]
}

export interface WECHATLOGIN {
  code: string,
  user_type: string
}
export interface USERINFO{
  type:string,
  iv:string,
  encryptedData:string,
  user_type:string,
  open_id:string
}
