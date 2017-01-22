'use strict';

define(['config/App'], function (app) {
    //Configurasyon
    app.config(function (ConfigProvider, SecurityConfigProvider) {
        //Genel Ayarlar
        ConfigProvider.appVersion = "1.0.0";
        ConfigProvider.projectTitle = 'Oboy';
        ConfigProvider.debugMode = true;
        ConfigProvider.appCheckEnabled = false;
        //Endpoint Settings
        ConfigProvider.defaultApiUrl = 'http://52.174.165.194';
        //OAuth Settings  
        SecurityConfigProvider.allowAnonymousAccess = false;
        SecurityConfigProvider.oauthOptions.loginBaseUri = 'http://52.174.165.194';
    }).run([
        'Routing', '$window', '$location', function (routing, $window, $location) {

            var actLang = $window.localStorage.getItem('activeLanguage');

            if (!actLang) {
                $window.localStorage.setItem('activeLanguage', 'tr-tr');
                //Yeniden baþlat
                $location.reload();
            }

            var appViews = [
                 {
                     state: 'intro',
                     url: '/intro',
                     templateUrl: 'oboy/views/home/intro',
                     controller: 'IntroController',
                     intro: false
                 },
                {
                    state: 'home',
                    url: '/layout',
                    templateUrl: 'oboy/views/home/layout',
                    controller: 'LayoutController'
                },
                {
                    state: 'home.jobs',
                    url: '/jobs',
                    templateUrl: 'oboy/views/home/jobs',
                    controller: 'JobsController',
                    view: 'home-list',
                },
                {
                    state: 'home.jobDetail',
                    url: '/detail/:id',
                    templateUrl: 'oboy/views/home/detail',
                    controller: 'DetailController',
                    view: 'home-list',
                },
                {
                    state: 'home.profil',
                    url: '/profil',
                    templateUrl: 'oboy/views/home/profil',
                    controller: 'ProfilController',
                    view: 'home-list',
                },
                {
                    state: 'home.postjob',
                    url: '/postjob',
                    templateUrl: 'oboy/views/home/postjob',
                    controller: 'PostjobController',
                    view: 'home-list',
                }
            ];
            //Map all states
            routing.map(appViews)
                   .start('home.jobs');
        }
    ]);
});
