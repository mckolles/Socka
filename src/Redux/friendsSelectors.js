export const getfriends=(state)=>{
    return state.friendsPage.friendsData
}
export const getPageSize=(state)=>{
    return state.friendsPage.pageSize
}
export const getTotalFriendsCount=(state)=>{
    return state.friendsPage.totalUsersCount
}
export const getCurrentPage=(state)=>{
    return state.friendsPage.currentPage
}
export const getIsFetching=(state)=>{
    return state.friendsPage.isFetching
}
export const getFollowingInProgres=(state)=>{
    return state.friendsPage.followingInProgres
}