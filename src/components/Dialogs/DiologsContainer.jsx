import { connect } from "react-redux";
import { addDiaolgsAC } from "../../Redux/diologsReducer";
import Dialogs from "./Dialogs";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { compose } from "redux";

let mapStatetoProps = (state) => {
return {
  dialogsPage:state.dialogsPage
}
}
let mapDispatchtoProps = (dispatch) => {
  return {
    sendSms: (newMessageBody) => {
      dispatch(addDiaolgsAC(newMessageBody));
    },
  };
};


export default 
compose(
  connect(mapStatetoProps, mapDispatchtoProps),
  WithAuthNavigate
)(Dialogs)

