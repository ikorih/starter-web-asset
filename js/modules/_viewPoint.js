"use strict";

/**
 * ViewPoint Class
 * This class observes elements and triggers a callback when they enter or leave the viewport.
 * It uses the IntersectionObserver API and allows customization of the observer options.
 *
 * Options:
 * - root: The element that is used as the viewport for checking visibility of the target (default: null).
 * - rootMargin: Margin around the root (default: '0%').
 * - threshold: A single number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should be executed (default: 0).
 * - once: If true, the observer will stop observing the target after the first time it becomes visible (default: true).
 *
 * Methods:
 * - destroy: Disconnects the observer and stops observing all targets.
 *
 * Example usage:
 * const viewPoint = new ViewPoint('.observe', (target, isIntersecting) => {
 *   if (isIntersecting) {
 *     target.classList.add('in-view');
 *   } else {
 *     target.classList.remove('in-view');
 *   }
 * }, {
 *   root: null,
 *   rootMargin: '0% 0% -50% 0%',
 *   threshold: 0.5,
 *   once: false
 * });
 */

export default class ViewPoint {
  constructor(els, cb, options = {}) {
    this.els = document.querySelectorAll(els);
    const defaultOptions = {
      root: null,
      rootMargin: "0%",
      threshold: 0,
      once: true,
    };
    this.cb = cb;
    this.options = Object.assign({}, defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }

  _init() {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.cb(entry.target, true);
          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };

    this.io = new IntersectionObserver(callback, this.options);

    // Optionally set polling interval for older browsers
    if (this.io.POLL_INTERVAL) {
      this.io.POLL_INTERVAL = 100;
    }

    this.els.forEach((el) => this.io.observe(el));
  }

  destroy() {
    if (this.io) {
      this.io.disconnect();
    }
  }
}
