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
        }
    }
})