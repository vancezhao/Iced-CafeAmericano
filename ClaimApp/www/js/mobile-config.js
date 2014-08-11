/**
 * Created by vancezhao on 14-8-8.
 */
$(document).bind("mobileinit", function () {
    $.getJSON('config/config.json', function (data) {
        $.serviceURL = data.ServiceURL;
        $.claimServiceURL = $.serviceURL+data.ClaimServiceURL;
        $.userServiceURL = $.serviceURL+data.UserServiceURL;
        $.claimLoginAPI = $.userServiceURL + data.UserLoginAPI;
        $.claimProductAPI = $.claimServiceURL + data.ClaimProductAPI;
        $.claimImageUploadAPI = $.claimServiceURL + data.ClaimImageUploadAPI;
        $.claimGetFormAPI = $.claimServiceURL + data.ClaimFormAPI;
    })
});