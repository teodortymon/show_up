// if (!Roles.userIsInRole(Meteor.users.findOne({'profile':{'name':'Teodor W.'}}), ['admin'])) {
//     Roles.addUsersToRoles(Meteor.users.findOne({'profile':{'name':'Teodor W.'}})._id, ['admin']);
//     }
    
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

// console.log(typeof Meteor.users.findOne({ 'emails': { $elemMatch: { 'address': 'j@com' } } } ));


  
// RegisterLimit.remove({});
if(! RegisterLimit.find().count() ){
  RegisterLimit.insert({free: 3, payable: 1});
}

// if ( Meteor.users.find().count() === 1 ) {
    // if (!Roles.userIsInRole(Meteor.users.findOne({'profile':{'name':'Teodor W.'}}), ['admin'])) {
//     Roles.addUsersToRoles(Meteor.users.findOne({'profile':{'name':'Teodor W.'}})._id, ['admin']);
//     }
    
    
    
    // Accounts.createUser({
    //     username: 'admin',
    //     email: 'admin@com',
    //     password: 'flyingpotato',
    // });
    // Roles.addUsersToRoles(Meteor.users.findOne({'email': 'admin'})._id, ['admin']);
// }






