import React, { Component } from "react"
import Medication from "./Medication";
import RegModal from "./RegModalMedication"


export default class MyCabinet extends Component {

    state = {
        medications: this.props.medications
    }

    componentDidMount () {
        this.props.displayAllMedications()
    }

    render() {
        return (
            <div className="medication-mc">
                <div id="medicine-heading-mc">
                <h1>Medicine Cabinet</h1>
                <RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllMedications={this.props.displayAllMedications}/>
               
                </div>
                <div id="listOfMedications-mc">
                {
                    this.props.medications.slice(0).reverse().map(medication => <Medication key={medication.id} medication={medication} />)

                }
                </div>
            </div>
        )
    }
}
