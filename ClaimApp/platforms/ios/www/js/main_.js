/**
 * Created by vancezhao on 14-8-7.
 */
$(function() {

//    $('#menu').slicknav();

    $('#mainToTakePciture').click(function() {
        console.log('navigate to takePicture html');
        $.mobile.navigate('takePicture.html', {});
    });

});
