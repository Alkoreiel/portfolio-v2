const linkW = document.querySelector(".link_wrap");
const linkH2 = linkW.querySelector("h2");
const h1 = document.querySelector("h1");
const splitText = new SplitText(h1, { type: "chars" });
const chars = splitText.chars;

const dropTimeline = gsap.timeline({ paused: true });
dropTimeline.to(chars, {
  duration: 0.6,
  y: 100,
  autoAlpha: 0,
  stagger: {
    each: 0.05,
    from: "random",
  },
  ease: "power2.out",
});

function resetH1() {
  gsap.set(chars, { y: 0, autoAlpha: 1 });
}

linkW.addEventListener("mouseenter", () => {
  gsap.to(linkH2, { scale: 1.2, duration: 0.5 });
  dropTimeline.restart();

  if (linkW.classList.contains("about")) {
    gsap.to(".about-content", { autoAlpha: 1, duration: 0.5 });
  } else if (linkW.classList.contains("anim")) {
    let tl = gsap.timeline();
    tl.to(".anim-bg", { autoAlpha: 1, duration: 0.5 })
      .call(() => {
        // Play Rive animation here
      })
      .call(() => {
        // Play Lottie animations here
      })
      .to(".anim-content", { autoAlpha: 1, duration: 0.5 }, "<");
  } else if (linkW.classList.contains("rest")) {
    gsap.to(".rest-content", { autoAlpha: 1, duration: 0.5 });
  }
});

linkW.addEventListener("mouseleave", () => {
  gsap.to(linkH2, { scale: 1, duration: 0.5 });
  resetH1();
  gsap.set([".about-content", ".anim-content", ".rest-content"], {
    autoAlpha: 0,
  });
});
