// IE9 IE10 event polyfill 
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  };

  CustomEvent.prototype = window.CustomEvent.prototype;

  window.CustomEvent = CustomEvent;
})();


(function(context) {
  
  function PMLH (popup) { 
    if (popup) {
      popup.addEventListener('beforeunload', function(e) {
        window.dispatchEvent(new CustomEvent('pmlh:internal:closed', {}));
      });
      this.popup = popup;
    }
  }

  context.PMLH = context.PMLH || PMLH;
  window.addEventListener('message', handleMessageReceived);

  PMLH.prototype.setPopup = function(popup) {
    this.popup = popup;
  };

  PMLH.prototype.sendMessage = function(detail, url, eventName) {
    this.popup.postMessage({
      eventName: validateEventName(eventName),
      detail: detail
    }, url);
  };

  function handleMessageReceived (postMessageEvent) {
    var eventName = validateEventName(postMessageEvent.data.eventName),
        event = new CustomEvent(eventName, { detail: postMessageEvent.data.detail });
    window.dispatchEvent(event);
  };

  PMLH.prototype.handleMessageReceived = handleMessageReceived;

  function validateEventName (name) {
    return name ? name : 'pmlh:default';
  } 

})(window);
