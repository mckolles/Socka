import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Textarea } from "../Common/Utils/FormControls";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";
import { initialStateType } from "../../Redux/diologsReducer";

const ava: "https://sun9-69.userapi.com/impg/oBT2IlqS59892ar9zWMRqvlYBTyxj_Ke-FqHYQ/GSx7MixfTCY.jpg?size=750x750&quality=96&sign=4cd064a9bb5033aadc23ec0f9a0cbb5d&type=album" = "https://sun9-69.userapi.com/impg/oBT2IlqS59892ar9zWMRqvlYBTyxj_Ke-FqHYQ/GSx7MixfTCY.jpg?size=750x750&quality=96&sign=4cd064a9bb5033aadc23ec0f9a0cbb5d&type=album";
const maxLength10 = maxLengthCreator(50);

interface DialogsItemsProps {
  name: string;
  id: number;
  message: string;
}

const DialogsItems: React.FC<DialogsItemsProps> = (props) => {
  return (
    <NavLink to={"/Dialogs/" + props.id}>
      <div className={s.diologs}>
        <div className={s.img}>
          <img src={ava} alt="" />
        </div>
        <div className={s.dialogsItem}>
          <p> {props.name}</p>
        </div>
        <div className={s.message}>{props.message}</div>
      </div>
    </NavLink>
  );
};

interface AddMessageFormValues {
  newMessageBody: string;
}

interface AddMessageFormProps extends InjectedFormProps<AddMessageFormValues> {}

const AddMessageForm: React.FC<AddMessageFormProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newMessageBody"
        validate={[requiredField, maxLength10]}
        className={s.textAreaDiologs}
        placeholder="Send message"
      />
      <button className={s.DiologsButton}>Отправить</button>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<AddMessageFormValues>({
  form: "dialogAddMessageForm",
})(AddMessageForm);

interface DialogsProps {
  dialogsPage: initialStateType;
  sendSms: (smsText: string) => void;
}

const Dialogs: React.FC<DialogsProps> = (props) => {
  let dialog = props.dialogsPage.diologsData.map((d) => (
    <DialogsItems name={d.name} id={d.id} message={d.message} key={d.id} />
  ));
  let addNewMessage = (values: AddMessageFormValues) => {
    props.sendSms(values.newMessageBody);
  };

  return (
    <div className={s.wrapper}>
      <AddMessageFormRedux onSubmit={addNewMessage} />
      {dialog}
    </div>
  );
};

export default Dialogs;
