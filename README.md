## `window.postMessage` little helper

A very small library that helps passing information between two windows using events.

### How it works

Messages are passed using `window.postMessage` and then dispatched as events.
It should be easier to handle different behaviours in this way, without using tons of `if`.

Whenever the popup window is closed a `pmlh:internal:closed` event is dispatched on the parent window.
So it is possible to get notified and take action when that happens.

When in the popup window `popup.onload` gets called a `pmlh:internal:onload` event is dispatched on the parent window.

### Example

A simple example showing how to use the library

```javascript
  
  // in the opener
  var popup = window.open(url);
  setTimeout(function() { 
    new PMLH(popup).sendMessage({theAnswer: 42}, url, 'pmlh:answer');
  }, 2000);

  // in the opened
  window.addEventListener('pmlh:answer', function(event) {
    console.log(event.detail.theAnswer)
  });
```

You're not forced to use the pmlh part as event name, but I think that helps adding clarity, specially if you're dealing with a lot of event listeners.
For a working example play with `test-opener.html` and `test-opened.html`, remember to allow popups.

### Installation

Grab the minified version and include that.
You could generate it again by running `grunt` in the command line, at the root of the project.
