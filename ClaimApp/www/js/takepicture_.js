$(function () {
//    var imageURI;
//    if (typeof imageURI == 'undefined') {
//        imageURI = 'file:///var/mobile/Applications/E7FD93F1-AEAE-4AF6-8FD3-074B87A6A6BA/tmp/cdv_photo_001.jpg';
//    }
//
//    $.mobile.changePage("uploader.html", {
//        data: imageURI,
//        role: "dialog" });

//    $('#uploadPictBtn').click(function () {
//        console.log('takePicImage is: ' + $('#takePicImage').src());
//        var imageURI = $('#takePicImage').src();
//        var options = new FileUploadOptions();
//        options.fileKey = "file";
//        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
//        options.mimeType = "image/jpeg";
//        console.log('Start to upload files');
//
//        // for test use only
//        var params = new Object();
//        params.value1 = "test";
//        params.value2 = "param";
//        options.params = params;
//        var ft = new FileTransfer();
//        ft.upload(imageURI, encodeURI($.claimImageUploadAPI), function win(r) {
//            console.log("Code = " + r.responseCode);
//            console.log("Response = " + r.response);
//            console.log("Sent = " + r.bytesSent);
//        }, function fail(error) {
//            console.error("An error has occurred: Code = " + error.code);
//            console.error("upload error source " + error.source);
//            console.error("upload error target " + error.target);
//        }, options);
//    });
});

function imageUploader(imageURI) {
    console.log('loading image ' + imageURI);
//    if (typeof imageURI == 'undefined') {
//        imageURI = 'file:///var/mobile/Applications/E7FD93F1-AEAE-4AF6-8FD3-074B87A6A6BA/tmp/cdv_photo_001.jpg';
//    }
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

//function displayPopup() {
//    // close button
//    var closeBtn = $('<a href="#" data-rel="back" class="ui-btn-right ui-btn ui-btn-b ui-corner-all ui-btn-icon-notext ui-icon-delete ui-shadow">Close</a>');
//    var content = $('#addingDialog').html();
//    // Popup body - set width is optional - append button and Ajax msg
//    var popup = $("<div/>", {
//        "data-role": "popup"
//    }).css({
//            width: $(window).width() / 1.25 + "px",
//            height: $(window).height() * 0.75 + "px",
//            padding: 5 + "px"
//        }
//    ).
//        append(closeBtn).append(content);

// Append it to active page
//    $.mobile.pageContainer.append(popup);
//
//// Create it and add listener to delete it once it's closed
//// open it
//    $("[data-role=popup]").popup({
//        dismissible: false,
//        history: false,
//        theme: "b",
//        positionTo: "window",
//        overlayTheme: "b",
//        /* "b" is recommended for overlay */
//        transition: "pop",
//        beforeposition: function () {
//            $.mobile.pageContainer.pagecontainer("getActivePage")
//                .addClass("blur-filter");
//        },
//        afterclose: function () {
//            $(this).remove();
//            $(".blur-filter").removeClass("blur-filter");
//        },
//        afteropen: function () {
//            /* do something */
//        }
//    }).popup("open");
//}
