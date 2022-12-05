let initialState = {
  diologsData: [
    { name: "Sveta", id: "1", message: "Hi" },
    { name: "Sasha", id: "2", message: "Hello pidor" },
    { name: "Sergey", id: "3", message: "Im tsar" },
    { name: "Arseniy", id: "4", message: "Hello Im pidor" },
    { name: "Vladilen", id: "5", message: "Im a gayfish" },
  ]
};

const diologsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-DIALOGS-TEXTAREA": {
      let body=action.newMessageBody
      return{
        ...state,
        diologsData: [
          ...state.diologsData,
          { name: "Sveta", id: "1", message: body },
        ]
      };

    }
    default:
      return state;
  }
};


export const addDiaolgsAC = (newMessageBody) => ({
  type: "ADD-DIALOGS-TEXTAREA",
  newMessageBody
});

export default diologsReducer;
