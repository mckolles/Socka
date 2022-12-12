
export const requiredField=value=>{
    if(value) return undefined
    else return 'Field is required'
    
}


export const maxLengthCreator=(maxLength)=>(value=1)=>{
if(value.length>maxLength) return `Max length is ${maxLength} characters`
    else return undefined
    
}