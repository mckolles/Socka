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
     followFriendAPI(friendId,follow,toggleFollowingInProgres,userId){  
      toggleFollowingInProgres(true,userId)
       instance.post(`follow/${friendId}`,{})
        .then(response=>{
          toggleFollowingInProgres(false,userId)
          if (response.data.resultCode === 0){
            return follow(friendId)
          }
          
        })
    },
     unfollowFriendAPI(friendId,unfollow,toggleFollowingInProgres,userId){
            toggleFollowingInProgres(true,userId)
            return instance.delete(`follow/${friendId}`)
            .then(response=>{
              toggleFollowingInProgres(false,userId)
              if (response.data.resultCode === 0){
                return unfollow(friendId)
              }
              
            })
    }
    }
    

     

