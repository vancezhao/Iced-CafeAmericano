/**
 * Created by vancezhao on 14-8-4.
 */
var desiredWidth;

$(function () {
    // attach fastClick button
    FastClick.attach(document.body);

    // handle login 
    $('#loginBtn').on("click", function (event) {
        console.log('User Login!');

        //   $.mobile.changePage("http://localhost:8080/mobile-sample/");
        //
        //   $.mobile.changePage({
        //            url: "http://www.google.com",
        //            type: "get"
        //        });

        //        $.mobile.pageContainer.pagecontainer("change", "redirect.html");

        // var url = "http://10.136.3.145:8080/mobile-sample/";
        // $(location).attr('href', url);

        var credentials = {
            username: 'vance',
            password: 'test',
            type: 'emailAddress'
        };
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1/claimApp/api/user/claimLogin',
            data: (credentials),
            cache: false,
            dataType: 'text',
            crossDomain: true,
            success: function (data) {
                console.log('data is: ' + data);
                $.mobile.changePage('main.html', {
                    reloadPage: true,
                    changeHash: true,
                    data: JSON.stringify(credentials),
                    changeHash: false
                });

                //                var url = "http://127.0.0.1/claimApp/";
                //                $(location).attr('href', url);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error occus: ' + errorThrown);
            }
        });

    });

    $(document).on('pagebeforeshow', "#home", function (event, data) {
        console.log('get data from home:  ' + data);

        var parameters = $(this).data("url").split("?")[1];

        parameter = parameters.replace("parameter=", "");
        console.log("parameter : "+parameter);

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1/claimApp/api/user/product",
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
});


function getSwatches() {
    var colorArr = createPalette($("#yourimage"), 5);
    for (var i = 0; i < Math.min(5, colorArr.length); i++) {
        $("#swatch" + i).css("background-color", "rgb(" + colorArr[i][0] + "," + colorArr[i][1] + "," + colorArr[i][2] + ")");
        console.log($("#swatch" + i).css("background-color"));
    }
}

//Credit: https://www.youtube.com/watch?v=EPYnGFEcis4&feature=youtube_gdata_player
function gotPic(event) {
    if (event.target.files.length == 1 &&
        event.target.files[0].type.indexOf("image/") == 0) {
        $("#yourimage").attr("src", URL.createObjectURL(event.target.files[0]));
    }
}

function getPicture() {
    console.log('onReady');
    $("#takePictureField").on("change", gotPic);
    $("#yourimage").load(getSwatches);
    desiredWidth = window.innerWidth;

    if (!("url" in window) && ("webkitURL" in window)) {
        window.URL = window.webkitURL;
    }
    ;
}
