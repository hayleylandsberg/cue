import React, { Component } from "react"
import "./Ad.css"


export default class Ad extends Component {

    render() {
        return (
            <div className="ad">
                <h5>{this.props.ad.company}</h5>
                <p>{this.props.ad.message}</p>
            </div>
        )
    }
}
