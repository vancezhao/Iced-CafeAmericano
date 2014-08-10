var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('mainLogin');

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('app started.');
        console.log('device version is: ' + parseFloat(window.device.version));
        if (parseFloat(window.device.version) > 7.0) {
//            $('[data-role="header"]').addClass("ios7");
//            document.body.style.marginTop = "20px";
        }
    }

};
