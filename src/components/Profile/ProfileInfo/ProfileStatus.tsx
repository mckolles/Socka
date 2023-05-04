    import React, { ChangeEvent } from "react"; 

    // старая классовая компонента для сравнениия с хуками

    type PropsType ={
        status:string,
        updateStatus:(newStatus:string)=>void
    }
        
    type StateType ={
        editMode:boolean,
        status:string
    } 

    class ProfileStatus extends React.Component<PropsType,StateType> {
        state = {
            editMode:false,
            status:this.props.status
        }
        activateEditMode = () => {
            this.setState({editMode: true})
        }   
        deactivateEditMode = (e:ChangeEvent<HTMLInputElement>) => {
            this.setState({editMode: false})
            this.props.updateStatus(this.state.status)
        }   
         onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
             this.setState({status:e.target.value})
         }
        componentDidUpdate(prevProps:PropsType,prevState:StateType){
            if(prevProps.status!==this.props.status){
               this.setState({status:this.props.status}) 
            }
        }
        render() {
            return(
            <>
            
            {!this.state.editMode && <span  onClick={this.activateEditMode}>{this.props.status||"---"}</span>}
            {this.state.editMode && <input onChange={this.onStatusChange}
            autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />}
            </>
        )}
    }

    export default ProfileStatus