'use strict';

/* ************************************************************
  menuUI
************************************************************ */
export default class MenuUI {
  constructor() {
    this.trigger = document.getElementById('menu-toggle');
    this._init();
  }
  _init() {
    const that = this;
    const links = document.querySelectorAll('.l-nav__link');
    const bodyClickFn = function(evt) {
      if (!hasParentClass(evt.target, 'l-nav')) {
        that.resetMenu();
        document.removeEventListener('click', bodyClickFn);
      }
    };
    links.forEach( el => {
      el.addEventListener('click', () => {
        that.resetMenu();
      });
    });
    function hasParentClass(e, classname) {
      if (e === document) {
        return false;
      }
      if (e.classList.contains(classname)) {
        return true;
      }
      return e.parentNode && hasParentClass(e.parentNode, classname);
    }
    this.trigger.addEventListener('click', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      setTimeout(function() {
        if (that.trigger.classList.contains('close')) {
          that.resetMenu();
          document.removeEventListener('click', bodyClickFn);
        } else {
          that.trigger.classList.add('close');
          document.body.classList.add('nav-open');
        }
      }, 25);
      document.addEventListener('click', bodyClickFn);
    });
  }
  resetMenu(){
    this.trigger.classList.remove('close');
    document.body.classList.remove('nav-open');
  }
  // destroy() {
  // }
}

