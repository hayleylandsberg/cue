import React, { Component } from "react"
import "./Archive.css"

export default class Archive extends Component {

    state = {
        medications: this.props.medications
    }

    componentDidMount () {
        this.props.displayAllMedications()
    }

    render() {
        return (
            <div className="archive-meds-list">
                <div className="archive-meds">
                <div className="heading-archive">
                    <h5>{this.props.medication.name}</h5>
                </div>
                <div id="listOfArchived-mc">
                <div className="archive-description">
                    <p className="underline">Dosage</p>
                    <p className="underline">Frequency</p>
                    <p className="underline">Rx Number</p>
                </div>
                <div className="archive-dosage">
                <p>{this.props.medication.dosage}</p>
                <p>{this.props.medication.frequency}</p>
                <p>{this.props.medication.rxNumber}</p>
                </div>
                </div>
            </div>
            </div>
        )
    }
}