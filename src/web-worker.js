import '@babel/polyfill';
import 'universal-fetch';
import { set, get, del } from 'idb-keyval';

self.addEventListener('message', async ({data}) => {
  console.log(`Message from main thread: ${data}`);

  switch(data) {
    case 'start':
      await install(true);
      await poller();

      setInterval(poller, 1000 * 10);

      break;
  }
});

async function install (force = false) {
  const v = await get('version');

  if (!v || force) {
    const response = await fetch('./version.json');
    const {version} = await response.json();

    await set('version', version);
  }
}

async function poller () {
  // get the current version from the server then compare with local version.
  const response = await fetch('./version.json');
  const {version: newVersion} = await response.json();
  const version = await get('version');

  console.log(version, newVersion);

  if (newVersion !== version) {
    // keep the new version and notify the main thread that there's a new version.
    // await set('new.version', newVersion);

    self.postMessage('version.update');
  }
}
