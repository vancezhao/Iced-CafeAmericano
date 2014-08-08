/**
 * Created by vancezhao on 14-8-4.
 */

$(function () {

    app.initialize();

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

        console.log('User Login!');
        // var url = "http://10.136.3.145:8080/mobile-sample/";
        // $(location).attr('href', url);
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
                $.cookie('claimCookie', cookieData);

                console.log('claimCookie : ' + cookieData);
                $.mobile.changePage("main.html", {
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
                console.error('claim login: ' + $.claimLoginAPI);
                console.error('error occus: ' + errorThrown);
                console.error('error textStatus: ' + textStatus);
            }
        });
    }


    $(document).on('pagebeforeshow', "#home", function (event, data) {
        console.log('get data from home:  ' + data);

        var parameters = $(this).data("url").split("?")[1];
        var parameter;
        parameter = parameters.replace("parameter=", "");
        console.log("parameter : " + parameter);

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

    $(document).on("pagebeforechange", function (e, ob) {
        if (ob.toPage && (typeof ob.toPage === "string") && ob.toPage.indexOf('index.html') >= 0) {
            console.log("blocking the back");
            e.preventDefault();
        }
    });

});
