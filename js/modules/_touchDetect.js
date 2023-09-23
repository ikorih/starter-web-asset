'use strict';

/*
タッチデバイスで指が触れた時に .touched がつく
またタッチデバイスかどうかの判別でbodyタグに .touch-is-active と .mouse-is-active のどちらかをつける
*/

export default class TouchDetect {
  constructor(selector) {
    this.selector = selector;
    this.els = typeof this.selector === 'undefined' ? document.querySelectorAll('a') : document.querySelectorAll(this.selector);
    this._set();
  }
  _set(){
    this.els.forEach(el => {

      el.addEventListener('touchstart',this._touched.bind(el), false);
      el.addEventListener('touchend',this._touchRemoved.bind(el), false);

    });

    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('touchstart', onTouchStart, true);

    function onTouchStart() {
      removeListeners();
      document.body.classList.add('touch-is-active');
      document.body.classList.remove('mouse-is-active');
    }

    function onMouseMove() {
      removeListeners();
      document.body.classList.remove('touch-is-active');
      document.body.classList.add('mouse-is-active');
    }

    function removeListeners() {
      document.removeEventListener('mousemove', onMouseMove, true);
      document.removeEventListener('touchstart', onTouchStart, true);
    }

  }
  _touched(){
    this.classList.add('touched');
  }
  _touchRemoved(){
    this.classList.remove('touched');
  }
  reset(){
    // TODO
  }
  removeEvent(){
    this.els.forEach(el => {
      el.addEventListener('touchstart',this._touched, false);
      el.addEventListener('touchend',this._touchRemoved, false);
    });

  }
}

