var ids = {
facebook: {
 clientID: <%= ENV['FB_ID'] %>
 clientSecret: <%= ENV['FB_SECRET'] %>
 callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
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
