import { connect } from "react-redux";
import { addDiaolgsAC, updateDiaolgsAC } from "../../Redux/diologsReducer";
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
    updateSms: (message) => {
      dispatch(updateDiaolgsAC(message));
    },
    sendSms: () => {
      dispatch(addDiaolgsAC());
    },
  };
};


export default 
compose(
  connect(mapStatetoProps, mapDispatchtoProps),
  WithAuthNavigate
)(Dialogs)

