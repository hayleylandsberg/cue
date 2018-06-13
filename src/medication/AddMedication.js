import React, { Component } from "react"


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


export default class AddMedication extends Component {

    state={
        medications: [],
        name: "",
        dosage: "",
        frequency: "",
        rxNumber: "",
        userId: "",
        archieve: false

    }

    activeUser = localStorage.getItem("yakId")

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createMedication = function(){
         // Create user in API
         fetch(`http://localhost:5001/medications?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                dosage: this.state.dosage,
                frequency: this.state.frequency,
                rxNumber: this.state.rxNumber,
                userId: parseInt(this.activeUser),
                archieve: false
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            alert("Your Medication has been added to your Medicine Cabinet.")
            this.props.displayAllMedications()
        })
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Add a Medication</h1>
            <div className="flexForm-Medication">
            <label htmlFor="inputMedication" className="sr-only">Medication Name</label>
            <input onChange={this.handleFieldChange} type="name" id="name" className="form-control" placeholder="Medication's Name" required="" autoFocus="" />
            <label htmlFor="inputDosage" className="sr-only">Dosage</label>
            <input onChange={this.handleFieldChange} type="dosage" id="dosage" className="form-control" placeholder="Dosage" required="" />
            <label htmlFor="inputFrequency" className="sr-only">Frequency</label>
            <input onChange={this.handleFieldChange} type="frequency" id="frequency" className="form-control" placeholder="Frequency" required="" autoFocus="" />
            <label htmlFor="inputRxNumber" className="sr-only">rxNumber</label>
            <input onChange={this.handleFieldChange} type="rxNumber" id="rxNumber" className="form-control" placeholder="Prescription Number" required="" autoFocus="" />
            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={this.createMedication}>Add Medication</button>
            </form>
        )
    }
}
