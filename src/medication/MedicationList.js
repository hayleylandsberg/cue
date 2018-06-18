import React, { Component } from "react"
import Medication from "./Medication";
import RegModal from "./RegModalMedication"


export default class MedicationList extends Component {

    state = {
        medications: this.props.medications
    }

    componentDidMount () {
        this.props.displayAllMedications()
    }

    render() {
        return (
            <div className="medication">
                <div id="medicine-heading"><h3>Medicine Cabinet</h3>
                <div><RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllMedications={this.props.displayAllMedications}/></div>
                </div>
                <div id="listOfMedications">
                {
                    this.props.medications.slice(0).reverse().filter(m => m.archive === false).map(medication => <Medication key={medication.id} medication={medication} displayAllMedications={this.props.displayAllMedications}/>)

                }
                </div>
            </div>
        )
    }
}
