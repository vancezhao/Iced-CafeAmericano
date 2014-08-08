/**
 * Created by vancezhao on 14-8-8.
 */
$(document).bind("mobileinit", function () {
    $.getJSON('config/config.json', function (data) {
        $.claimServiceURL = data.claimServiceURL;
        $.claimLoginAPI = $.claimServiceURL+data.claimLoginAPI;
        $.claimProductAPI =$.claimServiceURL+ data.claimProductAPI;
        $.claimImageUploadAPI = $.claimServiceURL+data.claimImageUploadAPI;
    })
});