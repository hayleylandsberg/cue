import React, { Component } from "react"
import "./Medication.css"


export default class Medication extends Component {

    render() {
        return (
            <div className="medicine-mc">
                <div className="heading-meds-mc">
                    <h5>{this.props.medication.name}</h5>
                    <img className="archive" src={require('../images/archive.png')}></img>
                </div>
                <div className="dosage-mc">
                <p>{this.props.medication.dosage}</p>
                <p>{this.props.medication.frequency}</p>
                <p>{this.props.medication.rxNumber}</p>
                </div>
            </div>
        )
    }
}
