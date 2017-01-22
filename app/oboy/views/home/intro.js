'use strict';

define(['config/App', 'base/BaseController'], function (app, BaseController) {

    var IntroController = BaseController.extend({
        //Module Id
        ModuleId: 'IntroController',
        //Contructor
        init: function (bundle, $ionicSlideBoxDelegate) {
            this._super(bundle);
            this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
            $ionicSlideBoxDelegate.slide(0);
        },
        next: function () {
            this.$ionicSlideBoxDelegate.next();
        },
        previous: function () {
            this.$ionicSlideBoxDelegate.previous();
        },
        // Called each time the slide changes
        slideChanged: function (index) {
            this.scope.slideIndex = index;
        },
        startApp: function () {
            this.routing.startApp();
        },
        extendScope: function () {
            this._super();
            this.scope.startApp = this.startApp.bind(this);
            this.scope.next = this.next.bind(this);
            this.scope.previous = this.previous.bind(this);
            this.scope.slideChanged = this.slideChanged.bind(this);
        }
    });
    //Register
    app.addController('IntroController', IntroController, ['$ionicSlideBoxDelegate']);
});