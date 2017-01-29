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
        clientId: "766997000709-ttnlcg6vqcn0hea8m73ott16ic9jp4f6.apps.googleusercontent.com",
        secret: "-XLO6MxlXDQ-ncJ7WJd-cd81"
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
