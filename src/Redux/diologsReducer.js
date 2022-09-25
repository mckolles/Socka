let initialState ={
    diologsData:[
    { name: "Sveta", id: "1", message: "Hi" },
    { name: "Sasha", id: "2", message: "Hello pidor" },
    { name: "Sergey", id: "3", message: "Im tsar" },
    { name: "Arseniy", id: "4", message: "Hello Im pidor" },
    { name: "Vladilen", id: "5", message: "Im a gayfish" },
  ],
  valueTextArea:""
}

const diologsReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'UPDATE-DIALOGS-TEXTAREA':
            state.valueTextArea=action.post;
        return state
        case 'ADD-DIALOGS-TEXTAREA':
            state.diologsData.push(
                { name: "Sveta", id: "1", message: state.valueTextArea},
              )
              state.valueTextArea=""
        return state
        default:
            return state
    }
}

export const updateDiaolgsTextAreActionCreator=(message) => ({type:'UPDATE-DIALOGS-TEXTAREA',post:message})
export const addDiaolgsTextAreActionCreator=() => ({type:'ADD-DIALOGS-TEXTAREA'})

export default diologsReducer