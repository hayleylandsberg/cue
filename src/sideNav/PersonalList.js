import React, { Component } from "react"
import "./Personal.css"

export default class PersonalList extends Component {

        state = {
            users: {
            }
        }

        gender = () => {
            // if (this.state.users.gender === "female") {
            //     <img className="avatarLarge" src={require('../images/avatar1.png')}/>
            // } else {
            //     return <img className="avatarLarge" src={require('../images/avatar.png')}/>
            // }
        }
    
        componentDidMount(){
            fetch(`http://localhost:5001/users?id=${this.props.activeUser}`)
            .then(r => r.json()).then(userData => {
                console.log(userData)
                this.setState({users: userData[0]})
            })
        }
    
    render() {
        const gender = this.state.users.gender;
        let image;
        if (gender === "female") {
            image = <img className="avatarLarge" src={require('../images/avatar1.png')}/>
        } else {
            image = <img className="avatarLarge" src={require('../images/avatar.png')}/>
        }
        return (
            <div id="sideNav">
            <div>
                {image}
            </div>
            <div id="sideNavHeader">
            <h4 id="activeUserName">{this.state.users.firstName} {this.state.users.lastName}</h4>
            <h6>{this.state.users.city}, {this.state.users.state}</h6>
            </div>
            <div id="personalInfo" className="info">
                <h5>Personal Information</h5>
                <p>Age: {this.state.users.age}</p>
                <h6>Medical Conditions</h6>
                <p>{this.state.users.conditions}</p>
                <h6>Allergies</h6>
                <p>{this.state.users.allergies}</p>
            </div>
            <div id="pharmacy" className="info">
                <h5>Preferred Pharmacy</h5>
                <p>{this.state.users.pharmacyName}</p>
                <p>Phone: {this.state.users.pharmacyNumber}</p>
            </div>
            <div id="emergency" className="info">
                <h5>Emergency Contact</h5>
                <p>{this.state.users.emergencyName}</p>
                <p>Phone: {this.state.users.emergencyNumber}</p>
            </div>
            <img className="icon" src={require('../images/medicine-box.png')}/>
            <img className="icon" src={require('../images/diary.png')}/>
            <img className="icon" src={require('../images/doctor1.png')}/>
            <img className="icon" src={require('../images/medicine.png')}/>
            <img className="icon" src={require('../images/siren.png')}/>
            </div>
        )
    }
}
