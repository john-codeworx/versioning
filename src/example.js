import {init} from '../';

init();

document.getElementById('notification').style.display = 'none';

window.addEventListener('NEW_VERSION', function (e) {
  document.getElementById('notification').style.display = 'block';
}, false);
