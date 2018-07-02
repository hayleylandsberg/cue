import React, { Component } from "react"
import Medication from "./Medication";
import RegModal from "./RegModalMedication"
import Archive from "./Archive"
import PersonalList from "../sideNav/PersonalList"


export default class MyCabinet extends Component {

    state = {
        medications: this.props.medications,
        score: 0
    }

    getUsersScore = function() {
        fetch(`http://localhost:5001/users?id=${this.props.activeUser}`)
                .then(r => r.json()).then(userData => {
                    this.setState({score: userData[0].score})
                })
            }.bind(this)

    componentDidMount () {
        this.props.displayAllMedications()
        this.getUsersScore()
    }

    
    updateScore = (userId) => {
        return new Promise((resolve, reject) => {
            console.log("Are you working?", this.state.score)
            // Create user in API
            this.setState({score: this.state.score + 1}, () => {
                fetch(`http://localhost:5001/users/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        score: this.state.score
                    })
                }).then(() => {
                    resolve()
                })
            })
        })
    }

    render() {
        return (
            <div>
                <PersonalList activeUser={this.props.activeUser} />
            <div className="medication-mc">
                <h4>Daily Streak Score: {this.state.score} </h4>
                <div id="medicine-heading-mc">
                <h1>Medicine Cabinet</h1>
                <RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllMedications={this.props.displayAllMedications}/>
               
                </div>
                <div id="listOfMedications-mc">
                {
                    this.props.medications.slice(0).reverse().filter(m => m.archive === false).map(medication => <Medication key={medication.id} medication={medication} displayAllMedications={this.props.displayAllMedications} resetMeds={this.props.resetMeds} activeUser={this.props.activeUser} showView = {this.props.showView} updateScore={this.updateScore} score={this.state.score}/>)

                }
                </div>

                <div className="archive-list">
                    <div id="archive-heading-mc">
                    <h2>Archived Medication</h2>
                    </div>
                    <div className="list-of-archived">
                 {
                    this.props.medications.slice(0).reverse().filter(m => m.archive === true).map(medication => <Archive key={medication.id} medication={medication} displayAllMedications={this.props.displayAllMedications}/>)
                }
                </div>
            </div>
            </div>
            </div>
        )
    }
}
