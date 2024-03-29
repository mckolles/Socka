import { AppStateType } from "./reduxStore"

export const getfriends=(state:AppStateType)=>{
    return state.friendsPage.friendsData
}
export const getPageSize=(state:AppStateType)=>{
    return state.friendsPage.pageSize
}
export const getTotalFriendsCount=(state:AppStateType)=>{
    return state.friendsPage.totalUsersCount
}
export const getCurrentPage=(state:AppStateType)=>{
    return state.friendsPage.currentPage
}
export const getIsFetching=(state:AppStateType)=>{
    return state.friendsPage.isFetching
}
export const getFollowingInProgres=(state:AppStateType)=>{
    return state.friendsPage.followingInProgres
}

export const getUsersFilter = (state: AppStateType) => {
    return state.friendsPage.filter;
}


export const getIsAuth=(state: AppStateType)=>{
    return state.auth.isAuth;
}
export const getCaptchaUrl=(state: AppStateType)=>{
    return state.auth.captchaUrl;
}
