import { GetItemstype, ApiResponseType, instance } from "./Api"


export const friendsApi= {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemstype>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(res => res.data)
    },
     followFriendAPI(friendId:number ){  
      return instance.post<ApiResponseType>(`follow/${friendId}`,{}).then(res=>res.data)
    },
     unfollowFriendAPI(friendId:number){
            return instance.delete<ResponseType>(`follow/${friendId}`).then(res=>res.data)
    }
}

