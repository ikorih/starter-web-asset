import gsap from 'gsap';

export default class TransitionScroll {
  constructor(target, speed, onMobile) {
    this.html = document.documentElement;
    this.body = document.body;
    this.scroller = {
      container: target || document.querySelector('#main'),
      target: false,
      ease: speed || 0.05, // <= scroll speed
      endY: 0,
      y: 0,
      resizeRequest: 1,
      scrollRequest: 0,
    };
    this.requestId = null;
    // this.mobileOrIE = -1 !== navigator.userAgent.indexOf('IEMobile');
    this.onMobile = onMobile || false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      if (this.onMobile ){
        this.init();
      }
    } else {
      this.init();
    }
  }
  setDom(){
    // 実際にスクロールさせる要素を作成
    // this.scroller.container.innerHTML = '<div class="parallax-scrollable">' + this.scroller.container.innerHTML + '</div>';
    this.scroller.target = this.scroller.container.children[0];
    // this.DOM.content = this.DOM.target.children[0];
  }
  setStyle(){
    // 親要素をスクリーンに固定
    this.scroller.container.style.position = 'fixed';
    this.scroller.container.style.width = '100%';
    this.scroller.container.style.height = '100%';
    this.scroller.container.style.top = 0;
    this.scroller.container.style.left = 0;
    this.scroller.container.style.overflow = 'hidden';

    // スクロール要素に overflow:hiddenを追加して内包してるコンテンツをはみ出させないように
    this.scroller.target.style.overflow = 'hidden';
    this.scroller.target.style.position = 'absolute';
    this.scroller.target.style.top = '0';
    this.scroller.target.style.left = '0';
    this.scroller.target.style.width = '100%';
    // this.scroller.target.style.display = 'flex';
    this.scroller.target.style.transformStyle = 'preserve-3d';
  }
  init(){
    this.setDom();
    this.setStyle();
    gsap.set(this.scroller.target, {
      // rotation: 0.01,
      force3D: true
    });
    this.onLoad();
  }
  onLoad(){
    this.updateScroller();
    window.focus();

    setTimeout( () => this.onScroll(), 50 );
    this.updateScroller();
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('scroll', () => this.onScroll());
  }
  updateScroller(){

    var resized = this.scroller.resizeRequest > 0;

    if (resized) {
      var height = this.scroller.target.clientHeight;
      this.body.style.height = height + 'px';
      this.scroller.resizeRequest = 0;
    }

    var scrollY = window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;

    this.scroller.endY = scrollY;
    this.scroller.y += (scrollY - this.scroller.y) * this.scroller.ease;

    if (Math.abs(scrollY - this.scroller.y) < 0.05 || resized) {
      this.scroller.y = scrollY;
      this.scroller.scrollRequest = 0;
    }

    gsap.set(this.scroller.target, {
      y: -this.scroller.y
    });

    this.requestId = this.scroller.scrollRequest > 0 ? requestAnimationFrame(() => this.updateScroller()) : null;
  }
  onScroll(){
    this.scroller.scrollRequest++;
    if (!this.requestId) {
      this.requestId = requestAnimationFrame( () => this.updateScroller());
    }
  }
  onResize(){
    this.scroller.resizeRequest++;
    if (!this.requestId) {
      this.requestId = requestAnimationFrame( () => this.updateScroller());
    }
  }
}



