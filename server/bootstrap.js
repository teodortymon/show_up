Accounts.onCreateUser(function(options, user) {
    user.events = [];
    
    if (options.profile) {
      user.profile = options.profile;
    }
    return user;
  });

// Meteor.users.remove({});
var x ="admin";
if(typeof Meteor.users.findOne({ 'emails': { $elemMatch: { 'address': x+'@com' } } } ) == "undefined"){
    Roles.addUsersToRoles(Accounts.createUser({
       username: x,
       email :  x+'@com',
       password : 'showapp',
       profile  : {
           s: x,
           name: x,
       }

    }), ['admin']);
    console.log(x+" user created!");
};



