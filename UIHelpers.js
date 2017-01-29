var arr = _.range(1, 10);
var arr_dist = _.range(50, 500);
var muppet = 0;

UI.registerHelper("random", function() {
  if(muppet>10)muppet=0;
  var rand = Math.floor((Math.random()*arr.length));
  var randNumber = arr[rand];
  arr.splice(rand,1);
  // return randNumber+".jpg";
  muppet = muppet +1;
  return "m/m"+muppet+".jpg";
});

UI.registerHelper("random_dist", function() {
  
  var rand = Math.floor((Math.random()*arr_dist.length));
  var randNumber = arr_dist[rand];
  arr.splice(rand,1);
  // return randNumber+".jpg";
  return randNumber;
});


UI.registerHelper("FreeLimit", function() {
  return RegisterLimit.find().fetch()[0].free;
});

UI.registerHelper("PayableLimit", function() {
  return RegisterLimit.find().fetch()[0].payable;
});

UI.registerHelper("dayFormat", function(a) {
  return moment(a).format('dddd, MMMM Do');
});

UI.registerHelper("hourFormat", function(a) {
  return moment(a).format('HH:mm');
});

UI.registerHelper("p", function(a) {
		var day1 = B;
		// Session.set("previousDay", 'dsd'); wild motherfucker!
		console.log("GO!");
		var day2 = moment(a).format('DDD');
		if(day1 == day2)
				return false;
		B = day2;
		return true;
});



UI.registerHelper("chosenEvents", function() {
    console.log('chosenEvents ' +this);
    var q = [];
    _.each(this.events, function (a){
      q.push(EventList.findOne(a));
    });
    return q;
});

UI.registerHelper("registeredUsers", function() {
    // console.log('registeredUsers' + this);

    var q = [];
    _.each(this.users, function (a){
      q.push(Meteor.users.findOne(a));
    });
    return q;
});
  
  
UI.registerHelper("hasUserDecided",function () {
      return !Meteor.user().decided;
});

UI.registerHelper("hasPaid", function(event) {
  if(_.contains(this.paidEvents, event))
    return true;
  return false;
  // return this.aid;
});

UI.registerHelper("email", function () {
  
  if(typeof this.services.google != "undefined")
    return this.services.google.email;
  if(typeof this.services.facebook != "undefined")
    return this.services.facebook.email;
  return this.emails[0].address;
});

UI.registerHelper('or',function(a,b){
  return a || b;
});

UI.registerHelper('displayIntroText',function(){
  return RegisterLimit.find().fetch()[0].intro;
});

UI.registerHelper('displayOutroText',function(){
  return RegisterLimit.find().fetch()[0].outro;
});

UI.registerHelper('isAdmin',function(){
  if(Roles.userIsInRole(Meteor.user()._id, 'admin'))
  { return true; }
  if(Roles.userIsInRole(Meteor.user()._id, 'sectionAdmin'))
  {return true; }
  return false;
});

UI.registerHelper('users', function () {
  return Meteor.users.find();
});

UI.registerHelper('usersLength', function () {
  return this.users.length;
});

UI.registerHelper('eventLimit', function () {
  return this.limit;
});



// Accounts.onCreateUser(function(options, user) {
//   user.events = [];
//   return user;
// });


