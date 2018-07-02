import Settings from "../Settings"


export default Object.create(null, {
    getResults: {
        value: terms => {
            const foundItems = {}
            const activeUser = localStorage.getItem("yakId")
            return fetch(`${Settings.remoteURL}/posts?userId=${activeUser}&message_like=${encodeURI(terms)}&_expand=user`)
                .then(r => r.json())
                .then(posts => {
                    foundItems.posts = posts
                    return fetch(`${Settings.remoteURL}/users?q=${encodeURI(terms)}`)
                })
                .then(r => r.json())
                .then(users => {
                    foundItems.users = users
                    return { foundItems }
                })

                .then(
                fetch(`${Settings.remoteURL}/medications?userId=${activeUser}&name_like=${encodeURI(terms)}&_expand=user`)
                .then(r => r.json())
                .then(medications => {
                    foundItems.medications = medications
                    return fetch(`${Settings.remoteURL}/users?q=${encodeURI(terms)}`)
                })
                .then(r => r.json())
                .then(users => {
                    foundItems.users = users
                    return { foundItems }
                }))
                .then(
                    fetch(`${Settings.remoteURL}/doctors?userId=${activeUser}&name_like=${encodeURI(terms)}&_expand=user`)
                    .then(r => r.json())
                    .then(doctors => {
                        foundItems.doctors = doctors
                        return fetch(`${Settings.remoteURL}/users?q=${encodeURI(terms)}`)
                    })
                    .then(r => r.json())
                    .then(users => {
                        foundItems.users = users
                        return { foundItems }
                    }))
                    .then(
                        fetch(`${Settings.remoteURL}/appointments?userId=${activeUser}&doctorName_like=${encodeURI(terms)}&_expand=user`)
                        .then(r => r.json())
                        .then(appointments => {
                            foundItems.appointments = appointments
                            return fetch(`${Settings.remoteURL}/users?q=${encodeURI(terms)}`)
                        })
                        .then(r => r.json())
                        .then(users => {
                            foundItems.users = users
                            return { foundItems }
                        }))
        }
    }
})