EventList = new Mongo.Collection("eventList");
Days = new Mongo.Collection("days");
RegisterLimit = new Mongo.Collection("registerLimit");


EventList.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


Meteor.users.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
