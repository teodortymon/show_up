Template.body.helpers({
    initCollapsible: function () {
    	$('.collapsible').collapsible();
    	console.log("Collapsible ON!");
    },
    
    hasUserDecided: function () {
      return !Meteor.user().decided;
    }
    
});

Template.user.helpers({
	
});

Template.days.rendered = function () {
	$('.collapsible').collapsible();
	console.log("LOOL");
};

Template.afterDecision.rendered = function () {
  $('.collapsible').collapsible();
};

Template.user_event.events({
	"click #user-event-remove": function(){
		// console.log(this);
		// console.log(Template.parentData(1));
		Meteor.call("userEventRemove",this._id, Template.parentData(1)._id);
	},

	"click #user-event-paid": function(){
		Meteor.call("userPay",this._id, Template.parentData(1)._id);
	},
});


Template.user.events({
	"click #user-remove": function () {
		Meteor.call("userRemove", this._id);
	},

	"click #user-restart": function () {
		Meteor.call("restartUser", this._id);
	},



	"click #user-admin":function () {
		Meteor.call("giveAdminPermission", this._id);
	}
});

Template.usersList.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([0,20]);
  self.autorun(function(){
    self.subscribe('usersPaginated', self.opt.get()[0], self.opt.get()[1]);
  });
});

Template.usersList.events({

  'click .events-prev': function(event, template){
    
    var opt = template.opt.get();
  
    if(opt[0]!= 0){
      opt[0] -=20;
      // opt[1] -=10;
    
      template.opt.set(opt);
      // console.log(template.opt.get());
    };
  },
  'click .events-next': function(event, template){
    // if(Meteor.users.find().fetch().length == 11){
    // if(true){
      var opt = template.opt.get();
      opt[0] +=20;
      // opt[1] +=10;
      
      template.opt.set(opt);
      // console.log(template.opt.get());
    // };
  },
});


