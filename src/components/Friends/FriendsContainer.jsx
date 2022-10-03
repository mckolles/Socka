
import { connect } from "react-redux"
import { followAC, setFriendsAC, unfollowAC } from "../../Redux/friendsReducer";
import Friends from "./Friends"


let mapStatetoProps = (state) => {
    return {
      friendsData:state.friendsPage.friendsData
    }
    }
let mapDispatchtoProps = (dispatch) => {
      return {
        unfollow: (userId) => {
          dispatch(unfollowAC(userId));
        },
        follow: (userId) => {
          dispatch(followAC(userId));
        },
        setFriends: (friends) => {
          dispatch(setFriendsAC(friends));
        },
      };
    };

const FriendsContainer = connect(mapStatetoProps, mapDispatchtoProps)(Friends);

export default FriendsContainer;