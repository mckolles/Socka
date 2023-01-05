export type PostType={
    avasrc:string|null,
    name:string|null,
    text:string,
    image:string,
    id:number
  }
  export type ContactsType={
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    website:string
    youtube:string
    mainLink:string
  }
  export type PhotosType={
    small:string|null,
    large:string|null
  }
  export type ProfileType={
    userId:number,
    lookingForAJob:boolean,
    lookingForAJobDescription:string,
    fullName:string,
    contacts:ContactsType,
    photos:PhotosType
  }

  export type FriendsDataType={
    id:number
    name:string
    status:string
    photos:PhotosType
  }