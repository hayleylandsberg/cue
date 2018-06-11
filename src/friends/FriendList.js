import React, { Component } from "react"
import "./Friend.css"

export default class FriendList extends Component {

        state = {
            users: {
            }
        }
    
        componentDidMount(){
            fetch(`http://localhost:5001/users?id=${this.props.activeUser}`)
            .then(r => r.json()).then(userData => {
                console.log(userData)
                this.setState({users: userData[0]})
            })
        }
    
    render() {
        return (
            <div id="sideNav">
            <img className="avatarLarge" src={require('../images/avatar1.png')}/>
            <h4 id="activeUserName">{this.state.users.firstName} {this.state.users.lastName}</h4>
            <img className="icon" src={require('../images/first-aid-case.png')}/>
            <img className="icon" src={require('../images/diary.png')}/>
            <img className="icon" src={require('../images/doctor1.png')}/>
            <img className="icon" src={require('../images/medicine.png')}/>
            <img className="icon" src={require('../images/siren.png')}/>
            </div>
        )
    }
}
