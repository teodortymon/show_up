CLIENT_ID = '766997000709-ttnlcg6vqcn0hea8m73ott16ic9jp4f6.apps.googleusercontent.com';
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
Session.set("previousDay",0);
B = '';

Template.allSections.helpers({
	allSections: function () {
		sections = ['international', 'a', 'b', 'cl', 'd', 'dr', 'e', 'f', 'i', 'ish', 'ist', 'in', 'k', 'm', 'media', 'mit', 's', 't', 'w'];
		return sections;
	}
});

Template.oneSection.events({
	"submit": function (event) {
    event.preventDefault();
    Session.set(event.target.id, event.target.text.value);
    // event.target.placeholder.value = "Set to:" + event.target.text.value;
    console.log(event.target);
  },

  "click .clear-button": function (event) {
  	Meteor.call("clearEventsSection", event.target.id);
  },

	"click .authorize-button": function (event) {
		gapi.auth.authorize({
          'client_id': CLIENT_ID,
          'scope': SCOPES,
          'immediate': false
        });

		gapi.client.load('calendar', 'v3');
		$('#'+event.target.id).html('Please try again');
		
		var c = Session.get(event.target.id);
		console.log(event.target.id);
		console.log(c);

		var d = new Date();
		d.setDate(d.getDate() - 220 ); //UWAGA KURWA


		var request = gapi.client.calendar.events.list({
	      'calendarId': c,
	      'timeMin': (d).toISOString(),
	      'showDeleted': false,
	      'singleEvents': true,
	      'maxResults': 100,
	      'orderBy': 'startTime'
	    });
		
		request.execute(function(resp) {
			var events_new = resp.items;
			if(! events_new){
				console.log("restarting");
				B=false;
			}
			else{
				// Meteor.call("clearEvents");
			    var section = event.target.id;
				Meteor.call("populateEvents", events_new, section);
				console.log(events_new);
				
				// Meteor.call("clearDays");
				// Meteor.call("populateDays");

				$('#'+event.target.id).html('Success!');
			}
		});
	}

});

Template.adminSettings.events({

  "submit #intro": function (event) {
	event.preventDefault();
	Meteor.call("changeVariable",event.target.id, event.target.text.value);
    event.target.text.value = "";
	},

  "submit #outro": function (event) {
	event.preventDefault();
	Meteor.call("changeVariable",event.target.id, event.target.text.value);
    event.target.text.value = "";
	},

  "submit #payable": function (event) {
    event.preventDefault();
    Meteor.call("changeVariable",event.target.id, event.target.text.value);
    event.target.text.value = "";
  },

  "submit #free": function (event) {
    event.preventDefault();
    Meteor.call("changeVariable",event.target.id, event.target.text.value);
    event.target.text.value = "";
  },

  "submit #calendar": function (event) {
    event.preventDefault();
    Meteor.call("changeAdminsCalendar", event.target.text.value);
    event.target.text.value = "";
  },

  "click #restartUsers": function (event) {
    // event.preventDefault();
    Meteor.call("restartUsers");
    // event.target.text.value = "";
  },

  "click #deleteUsers": function (event) {
    // event.preventDefault();
    console.log("BAM");

    Meteor.call("deleteAllUsers");

    // event.target.text.value = "";
  },

  "click #resetUsers": function (event) {
    Meteor.call("resetUsers");
  }

});

Template.adminEvent.onCreated(function() {
  var self = this;
  self.opt = new ReactiveVar([]);
  self.autorun(function(){
    	self.subscribe("singleEventUsers", self.opt.get() );
    	console.log("SUBSCRIBING");
  });
});

Template.adminEvent.events({
	"click #loadUsers": function(event, template){
    
    var opt = template.opt.get();
  
    opt = this.users;
    console.log("click" + this.users);
    
    template.opt.set(opt);

	}
});