// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration entry
  
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "171609056658846",
        secret: "f5d71275ccc7bdc63e65187743407864"
      }
    },
    { upsert: true }
  );
  

  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: "766997000709-qt7pvl845klc6o1v085mlgf6kkf1ks54.apps.googleusercontent.com",
        secret: "IZgylFZH3DQ0tFZQWGmlvBSx"
      }
    },
    { upsert: true }
  );

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});
