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
      console.warn("Obsolete method. Please use `ProfileAPI.getProfile` instead")
      return ProfileAPI.getProfile(userId)
    }
  }
export const authAPI= {
    me(){
      return instance.get(`auth/me`)
    },
    login(email,password,rememberMe=false){
      return instance.post(`auth/login`,{email,password,rememberMe})
    },
    logout(){
      return instance.delete(`auth/login`)
    }
  }

export const ProfileAPI= {
  getProfile(userId){
      return  instance.get(`profile/${userId}`)
    },
  getStatus(userId){
    return  instance.get(`profile/status/${userId}`)
  },
  updateStatus(status){
    return  instance.put(`profile/status`,{status:status})
  }
  }


    

     
