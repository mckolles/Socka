let initialState = {
    friendsData: [],
    pageSize:10,
    totalUsersCount: 50,
    currentPage:1,
    isFetching: true

}

  const friendsReducer = (state = initialState, action) => {

    switch (action.type) {
      case "FOLLOW-FRIEND": 
        return {
            ...state,
            friendsData:state.friendsData.map(
                f => {
                    if (f.id===action.userId){
                        return {...f,followed:true}
                    }
                    return f
                }
            )
        }
      
      case "UNFOLLOW-FRIEND": 
        return {
            ...state,
            friendsData:state.friendsData.map(
                f => {
                    if (f.id===action.userId){
                        return {...f,followed:false}
                    }
                    return f
                }
            )
        }
      case "SET-FRIENDS": 
        return {...state,friendsData:action.friendsData}
        
      
      case "SET-CURRENT-PAGE": 
        return {...state,currentPage: action.currentPage}
        
      case "SET-TOTAL-USERS-COUNT": 
        return {...state,totalUsersCount:action.totalUsersCount}
      case "TOGGLE-IS-FETCHING": 
        return {...state,isFetching:action.isFetching}

      default:
        return state;
    }
  };
  
  export const follow= (userId) => ({
    type: "FOLLOW-FRIEND",
    userId
  });
  export const unfollow = (userId) => ({
    type: "UNFOLLOW-FRIEND",
    userId
  });
  export const setFriends = (friendsData) => ({
    type: "SET-FRIENDS",
    friendsData
  });
  export const setCurrentPage = (currentPage) => ({
    type: "SET-CURRENT-PAGE",
    currentPage
  });
  export const setTotalUsersCount = (totalUsersCount) => ({
    type: "SET-TOTAL-USERS-COUNT",
    totalUsersCount
  
  });
  export const setIsFetching = (isFetching) => ({
    type: "TOGGLE-IS-FETCHING",
    isFetching
  
  });
 
  
  export default friendsReducer;