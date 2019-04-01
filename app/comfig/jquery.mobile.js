/*
 Bypass jQuery Mobile Routing and let Backbone Handle it
 */
$(document).bind("mobileinit", function () {
    jt.log('JQM Initialized')

    $.mobile.ajaxEnabled = false;

    // Let Backbone handle click events
    $.mobile.linkBindingEnabled              = false;
    //$.mobile.listview.prototype.options.icon = "";

    // Don't listen to hash changes. Let backbone do this
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled     = false;

    // No hoverdelay for buttons. Use FastClick for 0 delay a tags
    $.mobile.buttonMarkup.hoverDelay = 0;

    // Disable button styling out of the box. Only style if specified
    $.mobile.button.prototype.options.initSelector = ".jquery-button";
})