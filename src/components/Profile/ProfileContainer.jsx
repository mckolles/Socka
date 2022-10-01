import { connect } from "react-redux";
import { addPostActionCreator } from "../../Redux/profileReducer";
import { updatePostActionCreator } from "../../Redux/profileReducer";
import Profile from "./Profile";

let mapStatetoProps = (state) => {
  return {
    profilePage:state.profilePage
  }
}
let mapDispatchtoProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    updatePost: (message) => {
      dispatch(updatePostActionCreator(message));
    },
  };
};

const ProfileContainer = connect(mapStatetoProps, mapDispatchtoProps)(Profile);

export default ProfileContainer;
