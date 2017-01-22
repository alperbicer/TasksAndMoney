'use strict';

define(['config/App', 'base/BaseCrudController', 'oboy/services/OboyService'], function (app, BaseCrudController, oboy) {

    var ProfilController = BaseCrudController.extend({
        //Module Id
        ModuleId: 'ProfilController',

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
            return this.OboyService.getProfil();
        },
        extendScope: function () {
            this._super();
            this.scope.yenile = this.yenile.bind(this);
        }
    });
    //Register
    app.addController('ProfilController', ProfilController, ['$ionicScrollDelegate', 'OboyService']);
});
