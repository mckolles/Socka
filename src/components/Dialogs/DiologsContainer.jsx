import { connect } from "react-redux";
import { addDiaolgsAC, updateDiaolgsAC } from "../../Redux/diologsReducer";

import Dialogs from "./Dialogs";

let mapStatetoProps = (state) => {
return {
  dialogsPage:state.dialogsPage
}
}
let mapDispatchtoProps = (dispatch) => {
  return {
    updateSms: (message) => {
      dispatch(updateDiaolgsAC(message));
    },
    sendSms: () => {
      dispatch(addDiaolgsAC());
    },
  };
};

const DialogsContainer = connect(mapStatetoProps, mapDispatchtoProps)(Dialogs);

export default DialogsContainer;
