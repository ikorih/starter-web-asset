"use strict";

/**
 * SmoothScroll Class
 * This class enables smooth scrolling for anchor links within the page.
 * It allows customization of the scrolling duration, offset, and easing function.
 *
 * Options:
 * - triggerSelector: Selector for the anchor links that trigger smooth scrolling (default: 'a[href^="#"]').
 * - offset: Offset to apply to the target scroll position (default: 0).
 * - duration: Duration of the scroll animation in milliseconds (default: 500).
 * - ease: Easing function for the scroll animation (default: easeInOut function).
 *
 * Methods:
 * - destroy: Removes event listeners and cleans up the instance.
 *
 * Example usage:
 * const smoothScroll = new SmoothScroll({
 *   triggerSelector: 'a[href^="#custom"]',
 *   offset: 100,
 *   duration: 700,
 *   ease: {
 *     easeInOut: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
 *   }
 * });
 */

export default class SmoothScroll {
  constructor(options = {}) {
    const defaultOptions = {
      triggerSelector: 'a[href^="#"]',
      offset: 0,
      duration: 500,
      ease: {
        easeInOut: function (t) {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
      },
    };

    this.options = Object.assign({}, defaultOptions, options);

    this.triggers = Array.from(
      document.querySelectorAll(this.options.triggerSelector),
    );
    this._init();
  }

  _init() {
    this.clickHandlers = this.triggers.map((trigger) => {
      const handler = this._handleClick.bind(this, trigger);
      trigger.addEventListener("click", handler);
      return { trigger, handler };
    });
  }

  _handleClick(trigger, event) {
    event.preventDefault();
    event.stopPropagation();

    const href = trigger.getAttribute("href");
    const currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    const targetElement = document.getElementById(href.replace("#", ""));

    if (targetElement) {
      const targetPosition =
        window.scrollY +
        targetElement.getBoundingClientRect().top -
        this.options.offset;
      const startTime = performance.now();
      const loop = (nowTime) => {
        const time = nowTime - startTime;
        const normalizedTime = time / this.options.duration;
        if (normalizedTime < 1) {
          window.scrollTo(
            0,
            currentPosition +
              (targetPosition - currentPosition) *
                this.options.ease.easeInOut(normalizedTime),
          );
          requestAnimationFrame(loop);
        } else {
          window.scrollTo(0, targetPosition);
        }
      };
      requestAnimationFrame(loop);
    }
  }

  destroy() {
    this.clickHandlers.forEach(({ trigger, handler }) => {
      trigger.removeEventListener("click", handler);
    });
    this.clickHandlers = [];
  }
}
