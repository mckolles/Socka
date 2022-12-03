import * as axios from "axios"

const instance=axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY":"2d430d82-b427-43d3-955e-a07c12d23be6"
      }
})

export const usersAPI= {
    getUsers(currentPage=1,pageSize=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response=>{
         return response.data
     })
     },
     followFriendAPI(friendId){  
      return instance.post(`follow/${friendId}`,{})
    },
     unfollowFriendAPI(friendId){
            return instance.delete(`follow/${friendId}`)
    },
    getProfile(userId){
      return instance.get(`profile/${userId}`)
    }
  }
export const authAPI= {
    me(){
      return instance.get(`auth/me`)
    }
  }
    

     

