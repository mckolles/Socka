import { connect } from "react-redux";
import { actions } from "../../Redux/diologsReducer";
import Dialogs from "./Dialogs";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { compose } from "redux";
import { AppStateType } from "../../Redux/reduxStore";

let mapStatetoProps = (state:AppStateType) => {
return {
  dialogsPage:state.dialogsPage
}
}


export default 
compose(
  connect(mapStatetoProps,{ sendSms:actions.addDiaolgsAC}),
  WithAuthNavigate
)(Dialogs)

