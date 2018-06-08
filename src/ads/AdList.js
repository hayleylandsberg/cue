import React, { Component } from "react"
import Ad from "./Ad";


export default class AdList extends Component {

    state = {
        ads: []
    }

    componentDidMount () {
        fetch(`http://localhost:5001/ads`)
            .then(r => r.json())
            .then(ads => this.setState({ads: ads}))
    }

    render() {
        return (
            <div>
                {
                    this.state.ads.map(ad => <Ad key={ad.id} ad={ad} />)
                }
            </div>
        )
    }
}
