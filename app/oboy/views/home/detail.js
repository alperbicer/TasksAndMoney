'use strict';

define(['config/App', 'base/BaseCrudController', 'oboy/services/OboyService'], function (app, BaseCrudController, fl, flg) {

    var DetailController = BaseCrudController.extend({
        //Module Id
        ModuleId: 'DetailController',

        //Methods
        
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
        getModel: function (initData, fromLocal) {
            return this.OboyService.getJob(this.params.id);
        },
        extendScope: function () {
            this._super();
            this.scope.yenile = this.yenile.bind(this);
            this.scope.rating = {};
              this.scope.rating.rate = 3;
              this.scope.rating.max = 5;
        }
    });
    //Register
    app.addController('DetailController', DetailController, ['$ionicScrollDelegate', 'OboyService']);
});
