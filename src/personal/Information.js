import React, { Component } from "react"
import Personal from "./Personal";


export default class Information extends Component {

    state = {
        personal: []
    }

    componentDidMount () {
        fetch(`http://localhost:5001/users`)
            .then(r => r.json())
            .then(user => this.setState({personal: user}))
    }

    render() {
        return (
            <div className="personal">
                <h3>Personal Information</h3>
                {
                    this.state.personal.map(user => <Personal key={user.id} user={user} />)
                }
            </div>
        )
    }
}
