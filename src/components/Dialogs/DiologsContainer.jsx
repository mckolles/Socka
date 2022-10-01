import { connect } from "react-redux";
import { updateDiaolgsTextAreActionCreator } from "../../Redux/diologsReducer";
import { addDiaolgsTextAreActionCreator } from "../../Redux/diologsReducer";
import Dialogs from "./Dialogs";

let mapStatetoProps = (state) => {
return {
  dialogsPage:state.dialogsPage
}
}
let mapDispatchtoProps = (dispatch) => {
  return {
    updateSms: (message) => {
      dispatch(updateDiaolgsTextAreActionCreator(message));
    },
    sendSms: () => {
      dispatch(addDiaolgsTextAreActionCreator());
    },
  };
};

const DialogsContainer = connect(mapStatetoProps, mapDispatchtoProps)(Dialogs);

export default DialogsContainer;
