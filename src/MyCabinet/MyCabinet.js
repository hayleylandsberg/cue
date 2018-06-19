import React, { Component } from "react"
import Medication from "./Medication";
import RegModal from "./RegModalMedication"
import Archive from "./Archive"
import PersonalList from "../sideNav/PersonalList"


export default class MyCabinet extends Component {

    state = {
        medications: this.props.medications
    }

    componentDidMount () {
        this.props.displayAllMedications()
    }

    render() {
        return (
            <div>
                <PersonalList activeUser={this.props.activeUser} />
            <div className="medication-mc">
                <div id="medicine-heading-mc">
                <h1>Medicine Cabinet</h1>
                <RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllMedications={this.props.displayAllMedications}/>
               
                </div>
                <div id="listOfMedications-mc">
                {
                    this.props.medications.slice(0).reverse().filter(m => m.archive === false).map(medication => <Medication key={medication.id} medication={medication} displayAllMedications={this.props.displayAllMedications} resetMeds={this.props.resetMeds} activeUser={this.props.activeUser} showView = {this.props.showView} />)

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
