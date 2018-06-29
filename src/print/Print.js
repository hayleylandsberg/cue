import React, { Component } from "react"


export default class Print extends Component {

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
               </div>
                <div id="listOfMedications">
                
                </div>
            </div>
        )
    }
}
