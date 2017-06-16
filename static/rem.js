(function(win,doc){
  const ROOT_FOOTSIZE = 100;
  const SCREENZ_SIZE = 320;
  let rate = SCREENZ_SIZE / ROOT_FOOTSIZE;
  let windowWidth = document.body.clientWidth;
  let fontSize = windowWidth / rate;
  document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
})(window,document);

window.onresize = function(){
  const ROOT_FOOTSIZE = 100;
  const SCREENZ_SIZE = 320;
  let rate = SCREENZ_SIZE / ROOT_FOOTSIZE;
  let windowWidth = document.body.clientWidth;
  let fontSize = windowWidth / rate;
  document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
}