/**
 * Created by vancezhao on 14-8-11.
 */


var ClaimImageLoader = ({
    initialize: function () {

    },
    testFun: function () {
        console.log('test fun');
    },
    imageUpLoader: function (imageURI) {
        console.log('loading image ' + imageURI);
//        $.mobile.changePage("uploader.html", {
//            data: imageURI,
//            role: "dialog" });

        console.log('get data on addingDialog:  ' + imageURI + ' when click upload');

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        console.log('Start to upload files');
        console.log('imageURI is: ' + imageURI);

        // for test use only
        console.log('start uploading picture');
        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        options.params = params;
        var ft = new FileTransfer();

        ft.upload(imageURI, encodeURI($.claimImageUploadAPI), function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);

            window.plugins.toast.showShortTop('You\'ve successfully submitted the ticket.', function () {
            }, function (error) {
                console.error('error' + error)
            });

            $.mobile.navigate("main.html", {
                reloadPage: true,
                data: JSON.stringify($.mobile.credentials),
                changeHash: false,
                allowSamePageTransition: true,
                transition: 'none'
            });

        }, function fail(error) {
            console.error("An error has occurred: Code = " + error.code);
            console.error("upload error source " + error.source);
            console.error("upload error target " + error.target);
        }, options);

    },
    takePict: function () {
        console.log('take pict action');
        var options = {
            quality: 45,
//            targetWidth: 1000,
//            targetHeight: 1000,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true
        };
        navigator.camera.getPicture(
            function (imageURI) {
//               $('#takePicImage').attr('src', imageURI);
//                ClaimImageLoader.imageUpLoader(imageURI);
                $('#imageDisplay').attr('src', imageURI);
                
            }, function (error) {
                console.error('capture camera error message: ' + error);
            }, options);
    },
    getPictFromGallery: function () {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(
            function (imageURI) {
                $('#imageDisplay').attr('src', imageURI);
                console.log('success loading image with' + imageURI);
            },
            function (message) {
                console.error('upload picture failed: ' + message);
            }, {
                quality: 30,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
        );
    }
});
