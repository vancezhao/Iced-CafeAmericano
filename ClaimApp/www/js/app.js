/**
 * Created by vancezhao on 14-8-4.
 */

$(function () {
    app.initialize();

    window.onerror = function(message, url, lineNumber) {
        console.log("Error: "+message+" in "+url+" at line "+lineNumber);
    }

    $(document).on("pagebeforechange", function (e, ob) {
//        $.mobile.loading('show');
//        if (ob.toPage && (typeof ob.toPage === "string") && ob.toPage.indexOf('index.html') >= 0) {
//            console.log("blocking the back");
//            e.preventDefault();
//            history.go(1);
//        }
    });

    $(document).on('pageload', function (e) {
        $.mobile.loading('hide');
    });

    $.isDesktop = (function () {
        return !('ontouchstart' in window) // works on most browsers
            || !('onmsgesturechange' in window); // works on ie10

    })();

    $('#new').on('click', function () {
        console.log('new claim');
        $.mobile.changePage("productList.html", { transition: "slide"});
    });

// attach fastClick button
    FastClick.attach(document.body);

// check cookie
    var localCookie = $.cookie('claimCookie');

    console.log('localCookie is: ' + localCookie);

    $(document).on('pagebeforeshow', "#index", function (event, data) {
        console.log('get data from home:  ' + data)
//        $.ajax({
//            type: "GET",
//            url: $.claimProductAPI,
//            cache: false,
//            dataType: "json",
//            success: function onSuccess(data) {
//                $("#resultLog").append("The data is : " + data + "<br/>");
//                var json = data.codeItems;
//                $("#resultLog").append("The eval data is : " + json + "<br/>");
//                $.each(data.codeItems, function (i, item) {
//                    $("#resultLog").append("For Loop key:" + item.key + ", value:" + item.value + "<br/>");
//                    $('#product').append('<option value="' + item.key + '" selected="selected">' + item.key + '</option>');
//                });
//                $('#product').selectmenu('refresh');
//            }
//        });
    });

    $(document).on('pagebeforeshow', "#addingDialog", function (event, data) {
        var parameters = $(this).data("url").split("?")[1];
        var imageURI = parameters;

        $('#imageCancel').click(function () {
            $.mobile.changePage("takePicture.html", {
                data: imageURI });
        });

    });

    $(document).on('pagebeforeshow', "#takePicture", function (event, data) {
        var parameters = $(this).data("url").split("?")[1];
        var imageURI = parameters;

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
                    quality: 50,
                    targetWidth: 1000,
                    targetHeight: 1000,
                    destinationType: Camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.JPEG,
                    sourceType: Camera.PictureSourceType.CAMERA
                };
                navigator.camera.getPicture(
                    function (imageURI) {
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

    $(document).on('pagebeforeshow', '#claimPage', function () {
        $.mobile.loading('hide');
        $('#backListBtn').click(function () {
            console.log('backListBtn click!');
            $.mobile.changePage("productList.html", { transition: "slide", reverse: true});
        });

        $.ajax({
            type: "GET",
            url: $.claimGetFormAPI,
            cache: false,
            dataType: "text",
            success: function onSuccess(data) {
                $.mobile.loading('hide');

                $('#claimForm').html(data);
                $('#claimForm').trigger('create');

                $('#mediaComponent').append('<div class="row" id="claimNoticeImageLoader">' +
                    '<div class="col-xs-12">' +
                    '<img id="imageDisplay" class="claimNoticeImage img-rounded img-responsive"/>' +
                    '</div>' +
                    '<div class="col-xs-12">' +
                    '<label for="textarea">Comments</label>' +
                    '<textarea name="textarea" class="claimPictureComment"></textarea>' +
                    '</div></div>');

                $('#mediaComponent').append('<div class="row" id="mediaBtnGroup">' +
                    '<div class="col-xs-6">' +
                    '<a id="takePicBtn" class="ui-icon-camera ui-btn-icon-left claimNoticeImageBtn">Camera</a>' +
                    '</div>' +
                    '<div class="col-xs-6">' +
                    '<a id="openPicFolder" class="ui-icon-bullets ui-btn-icon-left claimNoticeImageBtn">Media File</a>' +
                    '</div>' +
                    '</div>');

            },
            error: function onError(err) {
                console.error('error ' + err);
            },
            beforeSend: function beforeSend() {
                $.mobile.loading('show');
                console.log('before send');
            },
            complete: function onComplete() {
                $.mobile.loading('hide');
            },
            async: false
        });

        $('#takePicBtn').click(function () {
            ClaimImageLoader.takePict();
            $('#claimNoticeImageLoader').show();
        });

        $('#openPicFolder').click(function () {
            ClaimImageLoader.getPictFromGallery();
            $('#claimNoticeImageLoader').show();
        });

        $('#submitFormBtn').click(function () {
            window.plugins.toast.showShortTop('Claim Notice Successfully! ', function () {
            }, function (error) {
                console.error('error' + error)
            });
            $.mobile.changePage('index.html', {
                transition: "slide",
                showLoadMsg: true
            });
        });
    });

    $(document).on('pagebeforeshow', '#productList', function () {

        console.log('page productList');
        $.mobile.loading('hide');

        $('#backBtn').click(function () {
            console.log('backBtn click!');
            $.mobile.changePage("index.html", { transition: "slide", reverse: true});
        });

        $('#californiaProperty').click(function () {
            console.log('californiaProperty click!');
            $.mobile.changePage('claimForm.html', {
                transition: "slide",
                showLoadMsg: true
            });
        });
    });

    $(document).on('pageinit', '#productList', function () {
        console.log('page init productList');
        $.mobile.loading('hide');
    });
});
