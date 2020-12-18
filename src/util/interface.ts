export interface RequestBase{
  url:string
  method:'GET' | 'POST'
  data:any
  header:RequestHeader
  loading:boolean
  mask:boolean
  title:string
  failToast:boolean
}

export interface RequestHeader{
  'content-type':string
  token?:string
}

export type Request = {
  [k in keyof RequestBase]?:RequestBase[k]
}
