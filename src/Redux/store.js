//Старый стор до редакс

import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";



let store={
   _state:{
    profilePage:{
      posts:[
      {
        avasrc:
          "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
        name: "Kolesnikov NIkita",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing",
        image:
          "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
      },
      {
        avasrc: "https://sun9-67.userapi.com/impg/lFrjc-CpVikro_MvVi_fl2_EYWHo0KNk06RZCg/Nf_Fj25fixc.jpg?size=1595x2160&quality=95&sign=ce8e008645a499d84503d3a9dea82e17&type=album",
        name: "Kolesnikov NIkita",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing",
        image:
          "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
      },
      {
        avasrc: "http://1c-uroki.ru/sites/default/files/arhitect.png",
        name: "Koles NIkita",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing",
        image:
          "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
      },
    ],
  valueProfileInput:""
    },
    dialogsPage: {
      diologsData:[
      { name: "Sveta", id: "1", message: "Hi" },
      { name: "Sasha", id: "2", message: "Hello pidor" },
      { name: "Sergey", id: "3", message: "Im tsar" },
      { name: "Arseniy", id: "4", message: "Hello Im pidor" },
      { name: "Vladilen", id: "5", message: "Im a gayfish" },
    ],
    valueTextArea:""
  }
   
  },
  getState(){
    return this._state
  },

callSubscriber(){
},

subscribe(observer) {
  this.callSubscriber=observer; 
},

dispatch(action){
  this.getState().profilePage=profileReducer(this.getState().profilePage,action)
  this.getState().dialogsPage=diologsReducer(this.getState().dialogsPage,action)
  this.callSubscriber()
}
}

window.store = store


export default store
