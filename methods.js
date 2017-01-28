Meteor.methods({

  deleteAllUsers: function(){
    _.each(Meteor.users.find().fetch(), function(x){

      if (!Roles.userIsInRole(x, ['sectionAdmin']) && !Roles.userIsInRole(x, ['admin']) ){
        Meteor.users.remove(x._id);
      }
    console.log(x._id);
    });
  },

  changeAdminsCalendar: function(b){
    Meter.users.update(Meteor.user()._id, {$set: {'sectionCalendar': [b]}});
  },

  changeVariable: function(a, b){
    i = RegisterLimit.find().fetch()[0]._id;
    RegisterLimit.update(i, {$set: {[a]: b}});
  },

  restartUsers: function(){
    Meteor.users.update({},{$set:{'decided': false}},{multi:true})
  },

  restartUser: function(a){
    Meteor.users.update(a, {$set:{'decided': false}});
  },

  resetUsers: function(){
    q = [];
    EventList.update({}, {$set: {'users': q}}, {multi: true});
    EventList.update({}, {$set: {'registered': 0}}, {multi: true});
    Meteor.users.update({}, {$set: {events: q}},{multi:true});
    Meteor.users.update({},{$set:{'decided': false}},{multi:true});
    Meteor.users.update({}, {$set: {'free': 0}},{multi:true});
    Meteor.users.update({}, {$set: {'payable': 0}},{multi:true});
    Meteor.users.update({},{$set:{'paidEvents': false}},{multi:true});
  },

	giveAdminPermission: function(userId) {
		Roles.addUsersToRoles(Meteor.users.findOne(userId), ['admin']);
	},

  clearEvents: function() {
    EventList.remove({});
    console.log("Events removed");
  },

  clearEventsSection: function(section) {
    EventList.remove({'s': section});
  },

  clearDays: function() {
    Days.remove({});
    console.log("Days removed");
  },

  populateEvents: function (events, s) {
    _.each(events, function (event) {
      event.s = s;
      event.eventType = 'free';
      event.users = [];
      event.limit= 1;
      event.registered = 0;
      EventList.insert(event);
      console.log(event);
    });
    // _.each(EventList.find().fetch(), function(a){
    //   EventList.update(a._id, {$set: {'eventType':'free'}});
    //   EventList.update(a._id, {$set: {'users':[] }});
    //   EventList.update(a._id, {$set: {'limit': 1 }});
    //   EventList.update(a._id, {$set: {'s': s }});
      
      // EventList.update(a._id, {$set: {'registered': 0 }});
      
      
    // });
    console.log("Events Populated");
  },

  populateDays: function () {
    _.each(_.groupBy(EventList.find().fetch(), function(a){ return moment(a.start.dateTime).format('DDD'); }), function (a) {
      Days.insert(a);
      });

    console.log("Days Populated");
  },
  
  eventRemove: function(a) {
    EventList.remove(a);
    console.log('Event Removed!');
  },
  
  
  eventUpdate: function (a, b, c) {
    console.log('trying to update '+ a + ' ' + b + ' ' + c);
    EventList.update({_id:a}, {$set: {[b]: c} });
  },
  
  eventUpdateDateStart: function (event, value) {
         EventList.update({_id: event}, {
      $set: {'start.dateTime': value} }
      );
  },
  
  eventUpdateDateEnd: function (event, value) {
         EventList.update({_id:event}, {
      $set: {'end.dateTime': value} }
      );
  },
  
  userClear: function () {
    user = Meteor.user();
    Meteor.users.update(user._id, {$set: {'free': 0}});
    Meteor.users.update(user._id, {$set: {'payable': 0}});
    // _.each(user.events, function (a){
    //   EventList.update(a, {$inc: {'registered': -1} } );
    // });
    var q = [];
    if(user.events.length)
      Meteor.users.update(user._id, {$set: {'events': q }});
    console.log(user);
    
    
    
  },
  
  eventSet: function (event, user) {
    var Type = EventList.findOne(event).eventType;
    // var count = Session.get(Type);
    // var list = Session.get("list");
    // if(count == undefined)
    //     count = 0;
    // if(list == undefined)
    //     list = [];

    // console.log(count);
    // console.log(Type);
    
    if(_.include(Meteor.users.findOne(user).events,event)){                               //wyjebywanie
      // count--;
      // Session.set(Type, count);

      // list = _.without(list, event);
      // Session.set('list',list);

      Meteor.users.update(user, {$pull: {events: event}});
      // EventList.update(event, {$inc: {registered: -1} } );
      // EventList.update(event, {$pull: {users: user}});
      Meteor.users.update(user, {$inc: {[Type]: -1}});
      // console.log(Meteor.users.findOne(user).Type);
      Session.set("Q",true);
    }else{
      
      if(Type == 'notLimited'){
        Meteor.users.update(user, {$push: {events: event}});
        // EventList.update(event, {$inc: {registered: 1} } );
        // EventList.update(event, {$addToSet: {users: user}});
        // count++;
        // Session.set(Type, count);

        // list.push(event);
        // Session.set('list',list);
          

        Session.set("L_add", true);
        Session.set("Q",true);
      }
      
      if(Type == 'free'){
        if(Meteor.users.findOne(user).free < RegisterLimit.find().fetch()[0].free){
          Meteor.users.update(user, {$push: {events: event}});
          // EventList.update(event, {$inc: {registered: 1} } );
          // EventList.update(event, {$addToSet: {users: user}});
          Meteor.users.update(user, {$inc: {free: 1}});

          // count++;
          // Session.set(Type, count);

          // list.push(event);
          // Session.set('list',list);
          
          Session.set("F_add", true);
          
          Session.set("Q",true);
        }else{
          Session.set("F_limit",true);
        }
      }
      
      if(Type == 'payable'){
        if(Meteor.users.findOne(user).payable < RegisterLimit.find().fetch()[0].payable){
          Meteor.users.update(user, {$push: {events: event}});
          // EventList.update(event, {$inc: {registered: 1} } );
          // EventList.update(event, {$addToSet: {users: user}});
          Meteor.users.update(user, {$inc: {payable: 1}});
          Session.set("Q",true);
          Session.set("P_add", true);

          // count++;
          // Session.set(Type, count);

          // list.push(event);
          // Session.set('list',list);
          
          
        }else{
          Session.set("P_limit",true);
        }
      }
      //wpierdalanie
    
    // add if depending on the type of the event
      // if(Meteor.users.findOne(user).events.length < RegisterLimit.find().fetch()[0].number){
      //   Meteor.users.update(user, {$push: {events: event}});
      //   EventList.update(event, {$inc: {registered: 1} } );
      //   Session.set("Q",true);
      //   // $(q.target).parent().prev().toggleClass("chosen");
      // }else{
      //   if(Meteor.users.findOne(user).events.length == RegisterLimit.find().fetch()[0].number){
      //     Session.set("T",true);
      //     // Materialize.toast("Sorry, you have used your limit of events. Please uncheck some of them to register for this one" , 4000);
      //   }
      // }
    }
  },
  
  userDecide: function(user) {
    Meteor.users.update(user, {$set: {decided: true}});

    EventList.update({}, {$pull: {users: user} },{multi:true});
    //remember to delete users form previous -> decrease their registered length

    _.each(Meteor.users.findOne(user).events, function(event){
      EventList.update(event, {$addToSet: {users: user}});
       // if(! _.include(EventList.findOne(event).users, event)){ 
       // {console.log('NEW'); EventList.update(event, {$inc: {registered: 1} } );}}
    });
    // _.each(EventList.find().fetch(), function(event){
    //   EventList.update(event._id, {$set: {registered: event.users.length}});
    // });
  },

  userManuallyAdd: function(user, event_w) {
    event = event_w._id;
    type=event_w.type;
    console.log('# ' +event_w +' '+user);
    EventList.update(event, {$addToSet: {users: user}});
    Meteor.users.update(user, {$addToSet: {events: event}});
    Meteor.users.update(user, {$inc: {[type]: 1}});
  },

  userRemove: function (user) {
    _.each(Meteor.users.findOne(user).events, function(event){
      EventList.update(event, {$pull: {users: user}});
    });

    Meteor.users.remove(user);
  },

  userEventRemove: function(user, event) {
    EventList.update(event, {$pull: {users: user}});
    // EventList.update(event, {$inc: {registered: -1}});
    Meteor.users.update(user, {$pull: {events: event}});
    Meteor.users.update(user, {$inc: {[EventList.findOne(event).eventType]: -1}});  
  },

  userPay: function(user, event) {
    Meteor.users.update(user, {$addToSet: {paidEvents: event}});
  },
});


