var Helper = require('./helper_funcs.js');
var Twot = require('../models/twot_model.js').twot;
var User = require('../models/user_model.js').user;

var login_page = function(req,res){
    if (req.user) {
        res.redirect('/home')
    } else {
        res.render('login');
    }
};

var home = function(req,res){
    if (req.user) {
        User.find().exec(function(err,users){
            if(err){
                res.status(404).send('Server error while finding username!');
            } else {
                var all_twots = [];
                var all_users = [];
                for (var i = 0; i < users.length; i++){
                    if(users[i].twots.length > 0) {
                        all_twots = all_twots.concat(users[i].twots);
                    }
                }
                for (var i = 0; i < users.length; i++){
                    all_users.push({name:users[i].name, user_id:users[i]._id});
                }
                all_twots.sort(function compare(a,b) {
                    return b.time - a.time;
                });
                all_users.sort(function(a,b){
                    return a > b;
                });
                console.log(all_twots);
                var render_info = {};
                render_info.twotes = all_twots;
                render_info.users = all_users;
                render_info.logged_in_user = req.user.name;
                render_info.logged_in_user_id = req.user._id;
                console.log(render_info);
                res.render('home',render_info);
            }
        });
    } else{
        res.redirect('/login');
    }
};


var twote_submit = function(req,res){
    var user_id = req.user._id;
    User.findOne({_id:user_id}).exec(function(err,user){
        if(err){
            res.status(404).send('Server error while finding username!');
        } else {
            console.log(user);
            if (user) {
                if (Helper.is_white_space(req.body.text)) {
                    res.send({error_message:"Enter a message that isn't only whitespace!"});
                } else {
                    var submit_time = Helper.get_time();
                    var twote_info = {creator: req.user.name,text: req.body.text.slice(0,140), time: submit_time, creator_id: user_id};
                    new_twote = Twot(twote_info);
                    twote_info.twote_id = new_twote._id;
                    user.twots = user.twots.concat(new_twote);
                    console.log(user);
                    user.save(function(err){
                        if (err) {
                            res.status(404).send("Couldn't update twotes!");
                        } else {
                            console.log('twote saved!');
                            res.send(twote_info);
                        }
                    })
                }
            } else {
                console.log("couldn't find the user!!!!");
                res.send({redirect:'/login'});
            }
        }
    });
};

var logout = function(req,res){
    req.logout();
    res.send({redirect:'/login'});
};

var delete_twote = function(req,res){
    var user_id = req.user._id;
    var twote_id = req.body.twote_id.slice(7);
    console.log(twote_id);
    User.findOne({_id:user_id}).exec(function(err,user){
        if(err){
            res.status(404).send('Server error while finding username!');
        } else {
            if (user) {
                new_twots = user.twots.filter(function (el) {
                    return el._id === twote_id ;
                });
                user.twots = new_twots;
                user.save(function(err){
                    if (err) {
                        res.status(404).send("Couldn't update twotes!");
                    } else {
                        console.log('Twote deleted!');
                        res.send({'twote_id':req.body.twote_id});
                    }
                })
            } else {
                res.send({redirect:'/login'});
            }
        }
    });
}

var auth_facebook = function(req,res){
    res.send('hello auth');
}

var auth_facebook_callback = function(req,res){
    res.redirect('/home')
}

module.exports.login_page = login_page;
module.exports.home = home;
module.exports.twote_submit = twote_submit;
module.exports.logout = logout;
module.exports.delete_twote = delete_twote;
module.exports.auth_facebook = auth_facebook;
module.exports.auth_facebook_callback = auth_facebook_callback;
