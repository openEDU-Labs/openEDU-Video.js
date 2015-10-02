function customOverlay(options) {
  this.on('play', function(e) {
      console.log('playback has started!');
  });
}


/**
* Create the component's DOM element
*
* @return {Element}
* @method createEl
*/
createEl() {
  var el  = super.createEl('div', {
    className: 'vjs-custom-overlay-display'
  });

  this.contentEl_ = Dom.createEl('p');
  console.log(this);
  console.log(el);
  //console.log(this.contentEl_);
  el.appendChild(this.contentEl_);
  this.contentEl_.innerHTML = 'This is test text this is test test kslafjklasdjfkadsflkajdsflkajdflkajdflaskfjlakdfjlkadjflkadfjlksadfjlkajdfklj slkdfjlaksdfjlkasfjlkasdfjlkasdjflkadjflkajdsfklajdfklajdfkjasdf asdf jaskdfjlakdsfjkas dflkasdj faskldfjaksdfj lkads flkadj flkdfj lkajdf lakjdf ';
  return el;
}
