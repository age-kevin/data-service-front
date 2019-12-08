/**
 * Created by Ferryman on 2017/8/7.
 */
// 设置cookie
export function setCookie (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  var cookies = cname + '=' + cvalue + ';expires=' + expires + ';path=/;';
  document.cookie = cookies;
}
// 获取cookie
export function getCookie (cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return '';
}
// 清除cookie
export function clearCookie (cname) {
  setCookie(cname, '', -1);
}
export function checkCookie () {
  var user = this.getCookie('username');
  if (user !== '') {
    alert('Welcome again ' + user);
  } else {
    user = prompt('Please enter your name:', '');
    if (user !== '' && user !== null) {
      this.setCookie('username', user, 365);
    }
  }
}
