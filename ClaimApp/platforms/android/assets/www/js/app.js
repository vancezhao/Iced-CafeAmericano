/**
 * Created by vancezhao on 14-8-4.
 */

$(function () {
    app.initialize();

    //initial menu
//    $(document).on('pagebeforeshow', function (event, ui) {
//        // avoid duplicating the header on the first page load
//        if (ui.prevPage.length == 0) return;
//
//        // remove the jQuery Mobile-generated header
//        $('.ui-header').addClass('to-remove-now');
//        $('#header').removeClass('to-remove-now');
//        $('.to-remove-now').remove();
//
//        // grab the code from the current header and footer
//        var header = $('#header')[0].outerHTML;
//        var footer = $('#footer')[0].outerHTML;
//
//
//        // mark the existing header and footer for deletion
//        $('#header').addClass('to-remove');
//        $('#footer').addClass('to-remove');
//
//        console.log('header is: ' + header);
//        // prepend the header and append the footer to the generated HTML
//        event.currentTarget.innerHTML = header + event.currentTarget.innerHTML + footer
//    });
//
//
//// remove header from previous page
//    $(document).on('pagehide', function (event, ui) {
//        $('.to-remove').remove();
//    });

    $(document).on("pagebeforechange", function (event) {
        console.log('page before change');
        $.mobile.loading('show');
    });


// attach fastClick button
//    FastClick.attach(document.body);

// check cookie
    var localCookie = $.cookie('claimCookie');

    if (typeof localCookie == "undefined") {
        console.log('cookie is null login now!');
    } else {
        console.log('authencated successfully login now!');
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
                    quality: 50,
                    targetWidth: 1000,
                    targetHeight: 1000,
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
            history.go(1);
        }
    });

    $(document).on('pagebeforeshow', '#claimPage', function () {
        $.ajax({
            type: "GET",
            url: $.claimGetFormAPI,
            cache: false,
            dataType: "text",
            success: function onSuccess(data) {
                $.mobile.loading('hide');

                $('#claimForm').html(data);
                $('#claimForm').trigger('create');

                $('#claimForm').append('<div class="row" id="claimNoticeImageLoader" data-iscroll>' +
                    '<div class="col-xs-12" data-iscroll>' +
                    '<img id="imageDisplay" class="claimNoticeImage img-rounded img-responsive"/>' +
                    '</div>' +
                    '<div class="col-xs-12" data-iscroll>' +
                    '<label for="textarea">Comments</label>' +
                    '<textarea name="textarea" class="claimPictureComment"></textarea>' +
                    '</div></div>');

                $('#claimForm').append('<div class="row" data-iscroll>' +
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

        $('#menu').mmenu();

        $('#takePicBtn').click(function () {
            ClaimImageLoader.takePict();
            $('#claimNoticeImageLoader').show();
        });

        $('#openPicFolder').click(function () {
            ClaimImageLoader.getPictFromGallery();
            $('#claimNoticeImageLoader').show();
        });


    });
})
;