function initialise (config = {}) {
  if (typeof window === 'undefined') return;

  const worker = new Worker('./web-worker.js');

  worker.addEventListener('message', ({data}) => {
    console.log(`Message from worker: ${data}`);

    switch (data) {
      case 'version.update':
        notify();

        break;
    }
  });

  window.addEventListener('load', () => {
    worker.postMessage('start');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(err => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }

  function notify () {
    if (config.hasOwnProperty('dispatch')) {
      config.dispatch({
        type: 'NEW_VERSION'
      });
    } else {
      const event = document.createEvent('Event');
      event.initEvent('NEW_VERSION', true, true);
      window.dispatchEvent(event);
    }
  }
}

module.exports = {initialise};
