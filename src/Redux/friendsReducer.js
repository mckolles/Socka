let initialState = {
    friendsData: [
    ]
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
      case "SET-FRIEND": 
        return {
            ...state,
            friendsData: [...state.friendsData,...action.friends]
        }

      default:
        return state;
    }
  };
  
  export const followAC= (userId) => ({
    type: "FOLLOW-FRIEND",
    userId
  });
  export const unfollowAC = (userId) => ({
    type: "UNFOLLOW-FRIEND",
    userId
  });
  export const setFriendsAC = (friends) => ({
    type: "SET-FRIEND",
    friends
  });
  
  export default friendsReducer;