'use strict';

define(['config/App', 'base/BaseCrudController', 'oboy/services/OboyService'], function (app, BaseCrudController, oboy) {
            document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("device ready");
};
    var PostjobController = BaseCrudController.extend({
        //Module Id
        ModuleId: 'PostjobController',

        //Methods
        
        yenile: function () {
            this.refresh(false);
            this.$ionicScrollDelegate.scrollTop();
        },

        //Contructor
        init: function (bundle, $ionicScrollDelegate, OboyService, ngMessages) {
            this._super(bundle);
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            this.OboyService = OboyService;
            this.ngMessages = ngMessages;
        },
        getModel: function (initData, fromLocal) {
            var self = this;
            this.OboyService.getSectors().then(function(data){
                self.model.sectorList = data.data;
            });
            this.showToast("asd");
            return {};
         }, 
         gonder: function () 
        {
            var self = this; 
            var postData = {};
            postData.photos = this.uploadedFileList;
            postData.detailedDescription = this.model.detailedDescription;
            postData.shortDescription = this.model.shortDescription;
            postData.country = this.model.country; 
            postData.isOnlineJob = this.model.isOnlineJob; 
            postData.fee = 123;
            //console.log(this.uploadedFileList);
            this.OboyService.postJob(postData).then(function () {
                self.showToast("Başarılı");
                self.go('home.jobs');
            });
        },
        openCamera : function(selection) {
            var srcType = Camera.PictureSourceType.CAMERA;
            var options = this.setOptions(srcType);
            var func = this.uploadPhoto;
            var self = this;
            var uploadedFileList = this.uploadedFileList;
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                func(imageUri,uploadedFileList);
            }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, options);
        },
        createNewFileEntry : function(imgUri) {
            var deneme = document.getElementById('deneme');
            deneme.src = imgUri;
            window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

                // JPEG file
                dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

                    // Do something with it, like write to it, upload it, etc.
                    // writeFile(fileEntry, imgUri);
                    console.log("got file: " + fileEntry.fullPath);

                    // displayFileData(fileEntry.fullPath, "File copied to");
         
                }, function(err){console.log(err,"asd")});

            }, function(err){console.log(err)});
        },
        setOptions : function(srcType) {
            var options = {
                // Some common settings are 20, 50, and 100
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery
                sourceType: srcType,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true  //Corrects Android orientation quirks
            }
            return options; 
        },
        uploadedFileList:[],
        uploadPhoto : function(imageURI,uploadedFileList) {
            var deneme = document.getElementById('deneme');
            deneme.src = imageURI;
            var options = new FileUploadOptions();
            options.fileKey="photo";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false; 
            options.headers = { 
                Connection: "close"
            };
         
            var ft = new FileTransfer();
            //console.log("url" + this.scope.photoo);
            ft.upload(imageURI, encodeURI("http://52.174.165.194/api/photo"), function(r) {
            console.log(r);
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            //this.scope.photoo = [JSON.parse(r.response).filename];
            uploadedFileList.push(JSON.parse(r.response).filename);
        }, function(error) {
            alert("An error has occurred: Code = " + error.code);
        }, options);
        },
        win : function(r) {
            console.log(r);
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            var photo = [JSON.parse(r.response).filename];
        },

        fail : function(error) {
            alert("An error has occurred: Code = " + error.code);
        },

        /*takePhoto : function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                this.$cordovaCamera.getPicture(options).then(function (imageData) {
                    this.scope.imgURI = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    // An error occured. Show a message to the user
                });
        },
        choosePhoto : function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            this.$cordovaCamera.getPicture(options).then(function (imageData) {
                this.scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occured. Show a message to the user
            });
        },*/
                
        extendScope: function () {
            this._super();
            this.scope.yenile = this.yenile.bind(this);
            //this.scope.takePhoto = this.takePhoto.bind(this);
            this.scope.openCamera = this.openCamera.bind(this);
            //this.scope.choosePhoto = this.choosePhoto.bind(this);
            this.scope.setOptions = this.setOptions.bind(this);
            this.scope.createNewFileEntry = this.createNewFileEntry.bind(this);
            this.scope.uploadPhoto = this.uploadPhoto.bind(this);
            this.scope.gonder = this.gonder.bind(this);
            this.scope.model = {};
            this.scope.uploadedFileList=[];
        }
    });
    //Register
    app.addController('PostjobController', PostjobController, ['$ionicScrollDelegate', 'OboyService']);
});
