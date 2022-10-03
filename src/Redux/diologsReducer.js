let initialState = {
  diologsData: [
    { name: "Sveta", id: "1", message: "Hi" },
    { name: "Sasha", id: "2", message: "Hello pidor" },
    { name: "Sergey", id: "3", message: "Im tsar" },
    { name: "Arseniy", id: "4", message: "Hello Im pidor" },
    { name: "Vladilen", id: "5", message: "Im a gayfish" },
  ],
  valueTextArea: "",
};

const diologsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE-DIALOGS-TEXTAREA": {
      return {
        ...state,
        valueTextArea: action.post,
      };

    }
    case "ADD-DIALOGS-TEXTAREA": {
      return{
        ...state,
        diologsData: [
          ...state.diologsData,
          { name: "Sveta", id: "1", message: state.valueTextArea },
        ],
        valueTextArea: "",
      };

    }
    default:
      return state;
  }
};

export const updateDiaolgsAC = (message) => ({
  type: "UPDATE-DIALOGS-TEXTAREA",
  post: message,
});
export const addDiaolgsAC = () => ({
  type: "ADD-DIALOGS-TEXTAREA",
});

export default diologsReducer;
