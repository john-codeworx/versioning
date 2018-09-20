import {initialise} from '../';

initialise();

document.getElementById('notification').style.display = 'none';

window.addEventListener('NEW_VERSION', function (e) {
  document.getElementById('notification').style.display = 'block';
}, false);

document.getElementById('reload').addEventListener('click', () => {
  window.location.reload(true);
});
