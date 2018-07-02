import Settings from "../Settings"


export default Object.create(null, {
    getResults: {
        value: terms => {
            const foundItems = {}

            return fetch(`${Settings.remoteURL}/posts?message_like=${encodeURI(terms)}&_expand=user`)
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