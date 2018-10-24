import '@babel/polyfill';
import 'universal-fetch';
import {set, get, del} from 'idb-keyval';

self.addEventListener('message', ({data}) => {
  console.log(`Message from main thread: ${data}`);

  switch(data) {
    case 'start':
      install();
      poller();

      setInterval(poller, 1000 * 10);

      break;
  }
});

async function install () {
  const response = await fetch('./version.json', {cache: 'no-cache'});
  const {version} = await response.json();

  set('version', version);
}

async function poller () {
  const response = await fetch('./version.json', {cache: 'no-cache'});
  const {version: newVersion} = await response.json();
  const version = await get('version');

  console.log(version, newVersion);

  if (newVersion !== version) {
    self.postMessage('version.update');
  }
}
