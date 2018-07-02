import React, { Component } from "react"
import swal from 'sweetalert'
import "./DiaryList.css"


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }


export default class EditDiary extends Component {

    constructor(props){
        super(props)
        this.state={
            posts: [],
            message: "",
            postInput: ""
    
        }
    }
    
    activeUser = localStorage.getItem("yakId")

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    updatePost = function(postId){
         // Create user in API
         fetch(`http://localhost:5001/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: this.state.postInput
            })
        })
        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            console.log(postId)
            this.props.displayAllPosts()
            swal("Success!", "Your diary entry has been updated.", "success")
        })
        // .then(() => {
        //     return fetch(`http://localhost:5001/posts?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
        // })
    }.bind(this);

    render() {
        return (
            <form className="form-update-post" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Update Diary Entry</h1>
            <div className="flexForm-update">
            <label htmlFor="inputMessage" className="sr-only">Post</label>
            <input onChange={this.handleFieldChange} type="post" id="messageChange" className="form-control" id="postInput" placeholder={this.props.post.message} value={this.state.postInput} required="" autoFocus="" />
            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={()=> this.updatePost(this.props.post.id)}>Update</button>
            </form>
        )
    }
}
