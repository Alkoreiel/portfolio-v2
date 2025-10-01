import { gsap } from "gsap";
import SplitText from "gsap/SplitText";

const linkW = document.querySelector(".intro-link");
const linkH2 = linkW.querySelector("h2");
const h1 = document.querySelector("h1");
const splitText = new SplitText(h1, { type: "chars" });
const chars = splitText.chars;

// Timeline for drop animation of h1 chars
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
  // Scale up h2
  gsap.to(linkH2, { scale: 1.2, duration: 0.5 });

  // Play drop animation of h1 chars
  dropTimeline.restart();

  // Conditional content handling
  if (linkW.hasAttribute("about")) {
    gsap.to(".about-content", { autoAlpha: 1, duration: 0.5 });
  } else if (linkW.hasAttribute("anim")) {
    // Animate background, rive, then lottie inside anim-content
    let tl = gsap.timeline();
    tl.to(".anim-bg", { autoAlpha: 1, duration: 0.5 })
      .call(() => {
        // Play Rive animation here (integrate rive player API)
      })
      .call(() => {
        // Play Lottie animations here (trigger Lottie API)
      })
      .to(".anim-content", { autoAlpha: 1, duration: 0.5 }, "<");
  } else if (linkW.hasAttribute("rest")) {
    gsap.to(".rest-content", { autoAlpha: 1, duration: 0.5 });
  }
});
linkW.addEventListener("mouseleave", () => {
  // Reset h2 scale
  gsap.to(linkH2, { scale: 1, duration: 0.5 });

  // Reset h1 chars visible
  resetH1();

  // Hide all conditional contents
  gsap.set([".about-content", ".anim-content", ".rest-content"], {
    autoAlpha: 0,
  });
});
