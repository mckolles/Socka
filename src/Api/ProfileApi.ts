import { PhotosType, ProfileType } from "../Types/types"
import { ApiResponseType, instance } from "./Api"

type SavePhotoDataType={
  photos:PhotosType
}

export const ProfileAPI= {
    getProfile(userId:number){
        return  instance.get<ProfileType>(`profile/${userId}`).then(res=>res.data)
      },
    getStatus(userId:number){
      return  instance.get<string>(`profile/status/${userId}`).then(res=>res.data)
    },
    updateStatus(status:string){
      return  instance.put<ApiResponseType>(`profile/status`,{status:status}).then(res=>res.data)
    },
    savePhoto(photoFile:any){
      const formData=new FormData()
      formData.append('image',photoFile)
      return  instance.put<ApiResponseType<SavePhotoDataType>>(`profile/photo`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>res.data)
    },
    saveProfile(profile:ProfileType){
      return  instance.put<ApiResponseType>(`profile`,profile).then(res=>res.data)
    }
    }