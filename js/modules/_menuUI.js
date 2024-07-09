"use strict";

/**
 * MenuUI Class
 * This class handles the functionality for a menu toggle button and its associated navigation links.
 * It allows the menu to open and close, and it also closes the menu when clicking outside the menu area.
 * The class accepts customizable options for selecting the menu toggle button, navigation links, and CSS classes.
 *
 * Options:
 * - menuToggleSelector: Selector for the menu toggle button (default: '#menu-toggle').
 * - navLinkSelector: Selector for the navigation links (default: '.l-nav__link').
 * - navClass: Class name for the navigation container (default: 'l-nav').
 * - closeClass: Class name added to the menu toggle button when the menu is open (default: 'close').
 * - navOpenClass: Class name added to the body when the menu is open (default: 'nav-open').
 * - focusTrapSelector: Selector for the focus trap element (default: '#js-focus-trap').
 *
 * Methods:
 * - resetMenu: Closes the menu by removing the appropriate CSS classes.
 * - destroy: Removes event listeners and cleans up the instance.
 *
 * Example usage:
 * const menu = new MenuUI({
 *   menuToggleSelector: '#custom-menu-toggle',
 *   navLinkSelector: '.custom-nav-link',
 *   navClass: 'custom-nav',
 *   closeClass: 'custom-close',
 *   navOpenClass: 'custom-nav-open',
 *   focusTrapSelector: '#custom-focus-trap'
 * });
 */

export default class MenuUI {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        menuToggleSelector: "#menu-toggle",
        navLinkSelector: ".l-nav__link",
        navClass: "l-nav",
        closeClass: "close",
        navOpenClass: "nav-open",
        focusTrapSelector: "#js-focus-trap",
      },
      options,
    );

    this.trigger = document.querySelector(this.options.menuToggleSelector);
    this.focusTrap = document.querySelector(this.options.focusTrapSelector);

    this._init();
  }

  _init() {
    this.links = document.querySelectorAll(this.options.navLinkSelector);
    this.bodyClickFn = this._bodyClickHandler.bind(this);

    this.links.forEach((el) => {
      el.addEventListener("click", this.resetMenu.bind(this));
    });

    this.triggerClickFn = this._triggerClickHandler.bind(this);
    this.trigger.addEventListener("click", this.triggerClickFn);

    if (this.focusTrap) {
      this.focusTrapHandler = () => {
        this.trigger.focus();
      };
      this.focusTrap.addEventListener("focus", this.focusTrapHandler);
    }
  }

  _hasParentClass(element, className) {
    while (element !== document) {
      if (element.classList.contains(className)) {
        return true;
      }
      element = element.parentNode;
    }
    return false;
  }

  _bodyClickHandler(evt) {
    if (!this._hasParentClass(evt.target, this.options.navClass)) {
      this.resetMenu();
      document.removeEventListener("click", this.bodyClickFn);
    }
  }

  _triggerClickHandler(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    setTimeout(() => {
      if (this.trigger.classList.contains(this.options.closeClass)) {
        this.resetMenu();
        document.removeEventListener("click", this.bodyClickFn);
      } else {
        this.trigger.classList.add(this.options.closeClass);
        document.body.classList.add(this.options.navOpenClass);
        document.addEventListener("click", this.bodyClickFn);
      }
    }, 25);
  }

  resetMenu() {
    this.trigger.classList.remove(this.options.closeClass);
    document.body.classList.remove(this.options.navOpenClass);
  }

  destroy() {
    this.links.forEach((el) => {
      el.removeEventListener("click", this.resetMenu.bind(this));
    });
    this.trigger.removeEventListener("click", this.triggerClickFn);
    document.removeEventListener("click", this.bodyClickFn);

    if (this.focusTrap) {
      this.focusTrap.removeEventListener("focus", this.focusTrapHandler);
    }
  }
}
