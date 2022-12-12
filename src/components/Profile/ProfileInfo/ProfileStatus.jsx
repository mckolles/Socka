    import React from "react"; 

    // старая классовая компонента для сравнениия с хуками

    class ProfileStatus extends React.Component {
        state = {
            editMode:false,
            status:this.props.status
        }
        activateEditMode = () => {
            this.setState({editMode: true})
        }   
        deactivateEditMode = (e) => {
            this.setState({editMode: false})
            this.props.updateStatus(this.state.status)
        }   
         onStatusChange=(e)=>{
             this.setState({status:e.target.value})
         }
        componentDidUpdate(prevProps,prevState){
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