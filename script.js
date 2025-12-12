// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger);

// 1. Lenisの初期化（慣性スクロール）
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 2. ヒーローセクションのアニメーション
// スクロールすると文字が少し上に移動し、背景が暗くなる
gsap.to(".hero-content", {
    y: -100,
    opacity: 0,
    ease: "power1.out",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 3. テキストの出現アニメーション
const revealElements = document.querySelectorAll(".reveal-text");
revealElements.forEach((element) => {
    gsap.fromTo(element, 
        { autoAlpha: 0, y: 50 },
        { 
            autoAlpha: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%", // 画面の80%の位置に来たら開始
            }
        }
    );
});

// 4. 横スクロールアニメーション
// コンテナをピン留めして、中のラッパーを横に移動させる
const sections = gsap.utils.toArray(".card");
const wrapper = document.querySelector(".horizontal-wrapper");

gsap.to(wrapper, {
    xPercent: -100 * (sections.length - 1), // カードの枚数分だけ左へ移動
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-scroll-container",
        pin: true,        // 画面を固定
        scrub: 1,         // スクロール量に同期（数値は滑らかさ）
        // endの値でスクロールの長さを調整（幅の横幅 - 画面幅）
        end: () => "+=" + (wrapper.offsetWidth - window.innerWidth)
    }
});