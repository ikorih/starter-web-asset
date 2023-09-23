'use strict';

import ViewPoint from './modules/_viewPoint';
import TouchDetect from './modules/_touchDetect';
import SmoothScroll from './modules/_smoothScroll';

const App = App || {};

App.baseUI = {
  init: function(){
    new TouchDetect();
    new SmoothScroll();
  }
};

App.scrollObserver = {
  init: function(){
    this.scrollObserver = new ViewPoint('.scr', this._inviewAnimation.bind(this), {once: true});
  },
  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  },
  destroy(){
    this.scrollObserver.destroy();
  }
};

App.baseUI.init();
App.scrollObserver.init();


