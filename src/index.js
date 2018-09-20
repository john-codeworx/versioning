
function init (options = {}) {
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

  const event = document.createEvent('Event');

  event.initEvent('NEW_VERSION', true, true);

  function notify () {
    if (options.hasOwnProperty('dispatch')) {
      options.dispatch({
        type: 'NEW_VERSION'
      });
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
  }
}

module.exports = {init};
