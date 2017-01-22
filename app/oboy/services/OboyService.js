'use strict';

define(['config/App', 'base/BaseApi', 'underscore'], function (app, BaseApiService, _) {
    var oboyService = BaseApiService.extend({
        //Constructor
        init: function (bundle) {
            this._super(bundle, 'oboy');
        },
        //Get all flights
        getAllJobs: function () {
            return this.get('jobs');
        },
        getJob: function (id) {
            if (parseInt(id) > 0)
                return this.get('job/'+id);
            else return null;
        },
        getProfil: function () {
            return this.get('account');
        },
        getSectors: function () {
            return this.get('sectors');
        },
        postJob: function (model) {
            return this.post('jobs/', model);
        },
    });

    app.addServiceApi('OboyService', oboyService);
});