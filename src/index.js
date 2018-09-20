
let _options = {};

const _event = document.createEvent('Event');

_event.initEvent('NEW_VERSION', true, true);

function init (options) {
  _options = options;

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
}

function notify () {
  if (_options.hasOwnProperty('dispatch')) {
    _options.dispatch({
      type: 'NEW_VERSION'
    });
  } else if (typeof window !== 'undefined') {
    window.dispatchEvent(_event);
  }
}

module.exports = {
  init,
  notify
};
