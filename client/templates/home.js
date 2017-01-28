
AccountsTemplates.addField({
        _id: 'name',
        type: 'text',
        required: true,
        displayName: 'Name & Surname',
    });


AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    // defaultTemplate: 'myCustomFullPageAtForm',
    defaultLayout: 'myLayout',
    // defaultLayoutRegions: {
    //     nav: 'myNav',
    //     // footer: 'myFooter'
    // },
    defaultContentRegion: 'main',
    preSignUpHook: function(pwd, info){
    },
    onLogoutHook: function(pwd, info){
        FlowRouter.go('/sign-in');
    }
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);
FlowRouter.route('/', {
  name: 'root',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, queryParams) {
    console.log("Root");
    BlazeLayout.render('myLayout', {main: 'appBody'});
  }
});

Deps.autorun(function() {
    // Meteor.subscribe('user', Meteor.user()._id);
//     Meteor.subscribe('events');
//     Meteor.subscribe('limit');
    
});

// Template.days.onCreated(function() {
//     this.autorun(() => {
//         this.subscribe('user', Meteor.user()._id);
//         this.subscribe('events', Meteor.user()._id);
//         this.subscribe('limit');
//     });
// });

// Template.afterDecision.onCreated(function() {
//     this.autorun(() => {
//         this.subscribe('user', Meteor.user()._id);
//         this.subscribe('events', Meteor.user()._id);
//         this.subscribe('limit');
//     });
// });
// 
Template.days.onRendered(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        centeredSlides: true,
        
        // If we need pagination
        // pagination: '.swiper-pagination',
        
        // Navigation arrows
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        
        // And if we need scrollbar
        // scrollbar: '.swiper-scrollbar',
      });    
      mySwiper.resizeFix(true);  

})

Template.appRenderedBody.onRendered(function(){
    this.autorun(() => {
                $('.collapsible').collapsible();

                



                console.log("Collapsible ON!");
    
    }); 
});
    
Template.appBody.helpers({
    UserDecided: function () {
        return Meteor.user().decided;
        // ...
    }
});


    // var calendar = new GAPI.Calendar('<766997000709-cogelu7ci0k8436qsjsp63jb7arbs8jo.apps.googleusercontent.com>');
    // calendar.get_content(function(content) {
    //     console.log(content);
    // });