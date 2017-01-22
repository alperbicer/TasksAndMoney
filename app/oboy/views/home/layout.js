'use strict';

define(['config/App', 'base/BaseController'], function (app, BaseController) {
    //ArkasAkilliRehber Controller
    var LayoutController = BaseController.extend({
        //Module Id
        ModuleId: 'LayoutController',
        //#region Methods
        dilDegistir: function () {
            var self = this,
                langs = [{ name: 'Turkce', kod: 'tr-tr' }, { name: 'English', kod: 'en-us' }];
            //Dili sec
            this.showActionSheet(this.getLocal('rota.dilsecimiyapiniz'), _.pluck(langs, 'name'), true).then(function (index) {
                var seciliDil = langs[index];
                //Mevcut dil kontrolu
                if (seciliDil.kod == self.language) {
                    self.showToast(self.getLocal('rota.zatensecilidilaktif', seciliDil.name));
                    return;
                }
                //Dili set et
                self.localization.setLanguage(seciliDil.kod);
                self.showToast(self.getLocal('rota.dildegisimtamamlandi', seciliDil.name));
            });
        },
        logoff: function () {
            var self = this;
            this.showConfirm(this.getLocal('rota.cikisonay'), this.getLocal('rota.cikis')).then(function () {
                self.security.logOff();
            });
        },
        profil: function () {
            this.$ionicSideMenuDelegate.toggleLeft();
            this.go('home.profil');
        },
        showFilterModal: function () {
            var self = this,
                sc = this.rootScope.$new();
            sc.mail = {};
            sc.mail.fullname = this.security.currentUser.fullname;
            sc.mail.email = this.security.currentUser.email;
            sc.mail.message = '';

            this.showModal('templates/filter.html', { scope: sc }).then(function () {
                //Mail Gonder
                self.email.sendMail('YNL Kasa Mobile - ' + sc.mail.fullname,
                    sc.mail.message,
                    '_arkaslojistikyazilimmailgrubu@arkas.com',
                    null,
                    null,
                    sc.mail.email
                ).then(function () {
                    self.showToast(self.getLocal('ynl.emailbasarilimesaji'));
                });
            });
        },
        hakkimizda: function () {
            var self = this;
            this.showPopup(this.getLocal('ynl.hakkimizda'), 'templates/hakkimizda.html', function () {
                self.go(self.routing.introState);
            }, this.getLocal("rota.intro"), true, this.getLocal("rota.tamam"));
        },
        //#endregion

        //#region Events
        defineProperties: function () {
            this._super();
            var self = this;
            Object.defineProperty(this.scope, 'currentUser', {
                configurable: false,
                enumerable: false,
                get: function () {
                    return self.security.currentUser;
                }
            });
        },
        init: function (bundle, security, email, $ionicSideMenuDelegate, $ionicHistory) {
            this._super(bundle);
            this.security = security;
            this.email = email;
            this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
            this.$ionicHistory = $ionicHistory;
        },
        exception: function (fn, ex) {
            //TODO:Zaten acilmiþ ve arka arkaya hata gelmiþ olabilir.
            var templ = "<p>" + this.getLocal('rota.hataozur') + "</p>" +
                "<p><b>" + this.getLocal("rota.hataaciklama") + "</b></p>" + ex.message;

            var p = this.showPopup(this.getLocal('rota.hataolustu'), templ,
                null, this.getLocal("rota.yenidenbaslat"), true, this.getLocal("rota.kapat"), 'error');

            p.then(function () {
                //Yeniden baþlat
                location.reload();
            }, function () {
                //Çýkýþ
                ionic.Platform.exitApp();
            });
        },
        extendScope: function () {
            this._super();
            this.scope.dilDegistir = this.dilDegistir.bind(this);
            this.scope.profil = this.profil.bind(this);
            this.scope.logoff = this.logoff.bind(this);
            this.scope.showFilterModal = this.showFilterModal.bind(this);
            this.scope.hakkimizda = this.hakkimizda.bind(this);
            this.scope.version = this.config.appVersion;

        }
        //#endregion
    });
    //Register
    app.addController('LayoutController', LayoutController, ['Security', 'Email', '$ionicSideMenuDelegate', '$ionicHistory']);
});
