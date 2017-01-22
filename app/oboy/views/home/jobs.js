'use strict';

define(['config/App', 'base/BaseCrudController', 'oboy/services/OboyService'], function (app, BaseCrudController) {

    var JobsController = BaseCrudController.extend({
        //Module Id
        ModuleId: 'JobsController',

        //Methods
        jobDetail: function (id) {
            this.go('home.jobDetail', { id: id });
        },
        postJob: function () {
            this.go('home.postjob');
        },
        yenile: function () {
            this.refresh(false);
            this.$ionicScrollDelegate.scrollTop();
        },

        //Contructor
        init: function (bundle, $ionicScrollDelegate, OboyService) {
            this._super(bundle);
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            this.OboyService = OboyService;
        },
        getModel: function () {
            return this.OboyService.getAllJobs();
        },
        extendScope: function () {
            this._super();
            this.scope.jobDetail = this.jobDetail.bind(this);
            this.scope.postJob = this.postJob.bind(this);
            this.scope.yenile = this.yenile.bind(this);
        }
    });
    //Register
    app.addController('JobsController', JobsController, ['$ionicScrollDelegate', 'OboyService']);
});
