import { InferActionsTypes } from "./reduxStore";

let initialState = {
  diologsData: [
    { name: "Sveta", id: 1, message: "Hi" },
    { name: "Sasha", id: 2, message: "Hello pidor" },
    { name: "Sergey", id: 3, message: "Im tsar" },
    { name: "Arseniy", id: 4, message: "Hello Im pidor" },
    { name: "Vladilen", id: 5, message: "Im a gayfish" },
  ] as Array<DialogDataType>
};

const diologsReducer = (state = initialState, action:ActionsTypes):initialStateType => {
  switch (action.type) {
    case 'diologsReducer/ADD-DIALOGS-TEXTAREA': {
      let body=action.newMessageBody
      return{
        ...state,
        diologsData: [
          ...state.diologsData,
          { name: "Sveta", id: 1, message: body },
        ]
      };

    }
    default:
      return state;
  }
};


export const actions={
  addDiaolgsAC:(newMessageBody:string) => ({
    type: 'diologsReducer/ADD-DIALOGS-TEXTAREA',
    newMessageBody
  } as const)
}

export type initialStateType=typeof initialState
type ActionsTypes=InferActionsTypes<typeof actions >
type DialogDataType ={
  name:string,
  id:number,
  message:string
}

export default diologsReducer;
