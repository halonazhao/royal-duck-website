const $ = (id) => document.getElementById(id);

/** 动画结束后跳转的下一页地址，按需修改 */
const NEXT_PAGE_URL = "home.html";

const pieces = {
  platform: $("platform"),
  slide: $("slide"),
  towerL: $("towerL"),
  towerR: $("towerR"),
  robotB: $("robotB"),
  robotP: $("robotP"),
};

// Final layout tuned to match the reference image:
// - platform centered & low
// - slide centered & a bit forward
// - towers back-left/back-right
// - robots at front corners
const FINAL = {
  platform: { left: 46, top: 82, xPercent:-50, yPercent:-50 },
  slide:    { left: 45, top: 69, xPercent:-50, yPercent:-50 },

  towerL:   { left: 39, top: 62, xPercent:-50, yPercent:-50 },
  towerR:   { left: 55, top: 62, xPercent:-50, yPercent:-50 },

  robotB:   { left: 32, top: 78, xPercent:-50, yPercent:-50 },
  robotP:   { left: 54, top: 80, xPercent:-50, yPercent:-50 },
};

function placeFinal() {
  Object.entries(pieces).forEach(([key, el]) => {
    const f = FINAL[key];
    gsap.set(el, {
      left: f.left + "%",
      top:  f.top  + "%",
      xPercent: f.xPercent,
      yPercent: f.yPercent,
      opacity: 0
    });
  });
}

function buildAnimation() {
  const vh = window.innerHeight;

  // platform + slide 一起 → 两座 tower 一起 → 两个 robots
  const steps = [
    [pieces.platform, pieces.slide],
    [pieces.towerL, pieces.towerR],
    [pieces.robotB, pieces.robotP],
  ];

  // 减小旋转幅度，减少眩晕感
  const rotationSeed = new Map([
    [pieces.platform, -1],
    [pieces.towerL, -3],
    [pieces.towerR,  3],
    [pieces.slide,   2],
    [pieces.robotB, -4],
    [pieces.robotP,  4],
  ]);

  const tl = gsap.timeline({ defaults: { duration: 1.6, ease: "bounce.out" } });

  steps.forEach((group, stepIndex) => {
    group.forEach((el, iInGroup) => {
      const startY = -vh * (0.95 + stepIndex * 0.10);
      const drift = (stepIndex % 2 === 0 ? -1 : 1) * (4 + stepIndex * 2);
      // platform 落定后城堡尽快落下：第二组稍早开始，且城堡用更短时长
      const position = stepIndex === 0 ? 0 : iInGroup === 0 ? (stepIndex === 1 ? "-=0.45" : "-=0.3") : "<";
      const duration = stepIndex === 0 ? 1.6 : 1.05;

      const shouldBounce = el === pieces.towerL || el === pieces.towerR || el === pieces.robotB || el === pieces.robotP;
      tl.fromTo(el,
        {
          y: startY,
          x: drift,
          rotation: rotationSeed.get(el) ?? 0,
          opacity: 0
        },
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          duration,
          ease: shouldBounce ? "bounce.out" : "power2.out",
          onComplete: shouldBounce ? () => {
            gsap.to(el, { y: "+=1.5", duration: 0.2, ease: "power1.inOut", yoyo: true, repeat: 1 });
          } : undefined
        },
        position
      );
    });
  });

  // 两座 tower + 两个机器人做最后的轻微弹跳
  tl.to([pieces.towerL, pieces.towerR, pieces.robotB, pieces.robotP], {
    scale: 1.008,
    duration: 0.28,
    ease: "power2.out",
    yoyo: true,
    repeat: 1
  }, "-=0.1");

  return tl;
}

/** 转场：淡出城堡，遮罩淡入，然后跳转 */
function startTransition() {
  const stage = $("stage");
  const overlay = $("transitionOverlay");
  gsap.timeline({
    onComplete: () => { window.location.href = NEXT_PAGE_URL; }
  })
    .to(stage, { opacity: 0, duration: 0.6, ease: "power2.in" }, 0)
    .to(overlay, { opacity: 1, duration: 0.6, ease: "power2.in" }, 0);
}

function init() {
  placeFinal();
  const mainTl = buildAnimation();
  // 动画结束后停留约 1.2 秒，再淡入淡出转场跳转
  mainTl.add(() => gsap.delayedCall(1.2, startTransition), "+=0");
}

// preload then run
const imgs = Array.from(document.images);
Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => img.onload = res)))
  .then(init);

// re-run on resize
let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(() => {
    gsap.killTweensOf("*");
    gsap.globalTimeline.clear();
    init();
  }, 120);
});
