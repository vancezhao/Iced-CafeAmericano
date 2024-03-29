/**
 * Created by vancezhao on 14-8-8.
 */
$(document).bind("mobileinit", function () {
    $.getJSON('config/config.json', function (data) {
        $.serviceURL = data.ServiceURL;
        $.claimServiceURL = $.serviceURL + data.ClaimServiceURL;
        $.userServiceURL = $.serviceURL + data.UserServiceURL;
        $.claimLoginAPI = $.userServiceURL + data.UserLoginAPI;
        $.claimProductAPI = $.claimServiceURL + data.ClaimProductAPI;
        $.claimImageUploadAPI = $.claimServiceURL + data.ClaimImageUploadAPI;
        $.claimGetFormAPI = $.claimServiceURL + data.ClaimFormAPI;

        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";

        $.mobile.touchOverflowEnabled = true;

    })

});


$(document).delegate("div.pull-demo-page", "pageinit", function (event) {
    $(".iscroll-wrapper", this).bind({
        "iscroll_onpulldown": onPullDown,
        "iscroll_onpullup": onPullUp
    });
});