import { connect } from "react-redux";
import { addPostAC, updatePostAC } from "../../Redux/profileReducer";

import Profile from "./Profile";

let mapStatetoProps = (state) => {
  return {
    profilePage:state.profilePage
  }
}
let mapDispatchtoProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostAC());
    },
    updatePost: (message) => {
      dispatch(updatePostAC(message));
    },
  };
};

const ProfileContainer = connect(mapStatetoProps, mapDispatchtoProps)(Profile);

export default ProfileContainer;
