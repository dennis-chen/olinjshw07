var ids = {
facebook: {
 clientID: process.env.FB_ID,
 clientSecret: process.env.FB_SECRET,
 callbackURL: 'https://sheltered-reef-9674.herokuapp.com/auth/facebook/callback'
},
twitter: {
 consumerKey: 'get_your_own',
 consumerSecret: 'get_your_own',
 callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
github: {
 clientID: 'get_your_own',
 clientSecret: 'get_your_own',
 callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
google: {
 returnURL: 'http://127.0.0.1:3000/auth/google/callback',
 realm: 'http://127.0.0.1:3000'
}
}

module.exports = ids
