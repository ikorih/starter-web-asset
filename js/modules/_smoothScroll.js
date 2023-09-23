'use strict';

export default class SmoothSCroll {
  constructor(options) {
    this.triggers = [].slice.call(document.querySelectorAll('a[href^="#"]'));
    const defaultOptions = {
      offset: 0,
      duration: 500
    };
    this.options = Object.assign(defaultOptions, options);
    this.options.ease = {
      easeInOut: function (t) {
        return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
      }
    };
    this._init();
  }
  _init() {
    const that = this;
    this.triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        const href = trigger.getAttribute('href');
        const currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
        const targetElement = document.getElementById(href.replace('#', ''));
        if (targetElement) {
          e.preventDefault();
          e.stopPropagation();

          const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - 115;
          const startTime = performance.now();
          const loop = function (nowTime) {
            const time = nowTime - startTime;
            const normalizedTime = time / that.options.duration;
            if (normalizedTime < 1) {
              window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * that.options.ease.easeInOut(normalizedTime)));
              requestAnimationFrame(loop);
            } else {
              window.scrollTo(0, targetPosition);
            }
          };
          requestAnimationFrame(loop);
        }
      });
    });
  }
  // destroy() {
  // }
}

