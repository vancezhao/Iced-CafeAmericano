/**
 * Created by vancezhao on 14-8-4.
 */

$(function () {

    app.initialize();

    //initial menu

    // attach fastClick button
    FastClick.attach(document.body);
    // check cookie
    var localCookie = $.cookie('claimCookie');

    if (typeof localCookie == "undefined") {
        console.log('need login now!');
    } else {
        claimLogin();
    }
    console.log('localCookie is: ' + localCookie);
    // handle login
    $('#loginBtn').on("click", function (event) {
        // Prevent the usual navigation behavior
        event.preventDefault();

        claimLogin();
    });

    function claimLogin() {
        var credentials = {
            username: $('#login-name').val(),
            password: $('#login-pass').val(),
            type: 'emailAddress'
        };

        $.ajax({
            type: 'post',
            url: $.claimLoginAPI,
            data: (credentials),
            cache: false,
            dataType: 'text',
            crossDomain: true,
            success: function (cookieData) {
                console.log('User Login!');
                $.cookie('claimCookie', cookieData);
                $.mobile.credentials = credentials;
                console.log('claimCookie : ' + cookieData);
                $.mobile.navigate("menu.html", {
                    reloadPage: true,
                    data: JSON.stringify(credentials),
                    changeHash: false,
                    allowSamePageTransition: true,
                    transition: 'none'
                });
                window.plugins.toast.showShortTop('Welcome back ' + credentials.username, function () {
                }, function (error) {
                    console.error('error' + error)
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('claim login: ' + $.claimLoginAPI);
                console.log('error occus: ' + errorThrown);
                console.log('error textStatus: ' + textStatus);
            }
        });
    }

    $(document).on('pagebeforeshow', "#home", function (event, data) {
        console.log('get data from home:  ' + data);

//        var parameters = $(this).data("url").split("?")[1];
//        var parameter;
//        parameter = parameters.replaceAll("parameter=", "");
//        console.log("parameter : " + parameter);

        $.ajax({
            type: "GET",
            url: $.claimProductAPI,
            cache: false,
            dataType: "json",
            success: function onSuccess(data) {
                $("#resultLog").append("The data is : " + data + "<br/>");
                var json = data.codeItems;
                $("#resultLog").append("The eval data is : " + json + "<br/>");
                $.each(data.codeItems, function (i, item) {
                    $("#resultLog").append("For Loop key:" + item.key + ", value:" + item.value + "<br/>");
                    $('#product').append('<option value="' + item.key + '" selected="selected">' + item.key + '</option>');
                });
                $('#product').selectmenu('refresh');
            }
        });
    });

    $(document).on('pagebeforeshow', "#addingDialog", function (event, data) {
        console.log('loading addingDialog');
        var parameters = $(this).data("url").split("?")[1];

        var imageURI = parameters;
        console.log('addingDialog for data:  ' + imageURI);

        $('#imageCancel').click(function () {
            console.log('get data on addingDialog:  ' + imageURI + ' when click imageCancel');

            $.mobile.changePage("takePicture.html", {
                data: imageURI });
        });

        $('#imgUpload').click(function () {
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

        });

    });

    $(document).on('pagebeforeshow', "#takePicture", function (event, data) {
//        console.log('get data from home:  ' + data);
        var parameters = $(this).data("url").split("?")[1];
        var imageURI = parameters;

//        var parameters = $(this).data("url").split("?")[1];
//        var parameter;
//        parameter = parameters.replace("parameter=", "");
//        console.log("parameter : " + parameter);
        $('#imageUpload').attr('src', imageURI);

        function imageUploader(imageURI) {
            console.log('imageUploader loading: ' + imageURI);
            $.mobile.changePage("uploader.html", {
                data: imageURI,
                role: "dialog" });
        };

        // take picture from camera or from local gallery
        $('#takePicBtn').click(
            function claimTakePicture() {
                var options = {
                    quality: 45,
                    //                    targetWidth: 1000,
                    //                    targetHeight: 1000,
                    destinationType: Camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.JPEG,
                    sourceType: Camera.PictureSourceType.CAMERA
                };
                navigator.camera.getPicture(
                    function (imageURI) {
//                $('#takePicImage').attr('src', imageURI);
                        imageUploader(imageURI)
                    }, function (error) {
                        console.error('capture camera error message: ' + error);
                    }, options);
            });

        $('#openPicFolder').click(
            function uploadPicture() {
                // Retrieve image file location from specified source
                navigator.camera.getPicture(
                    function (imageURI) {
                        $('#takePicImage').attr('src', imageURI);
                        imageUploader(imageURI)
                        console.log('success loading image with' + imageURI);
                    },
                    function (message) {
                        console.error('upload picture failed: ' + message);
                    }, {
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    }
                );
            });
    });

    $(document).on("pagebeforechange", function (e, ob) {
        if (ob.toPage && (typeof ob.toPage === "string") && ob.toPage.indexOf('index.html') >= 0) {
            console.log("blocking the back");
            e.preventDefault();
        }
    });
});
