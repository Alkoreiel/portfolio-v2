document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const splitText = new SplitText(h1, { type: "chars" });
  const chars = splitText.chars;
  const linkWraps = document.querySelectorAll(".link_wrap");

  function resetH1() {
    gsap.set(chars, { y: 0, autoAlpha: 1 });
    gsap.set([".about-content", ".anim-content", ".rest-content"], { autoAlpha: 0 });
  }

  const dropTimeline = gsap.timeline({ paused: true });
  dropTimeline.to(chars, {
    duration: 0.6,
    y: 100,
    autoAlpha: 0,
    stagger: { each: 0.05, from: "random" },
    ease: "power2.out",
  });

  linkWraps.forEach(linkW => {
    const linkH2 = linkW.querySelector("h2");
    const anima = linkW.getAttribute("data-anima");
    const contentSelector = `.${anima}-content`;

    // Timeline for this button's h2 scale
    const h2ScaleTimeline = gsap.timeline({ paused: true });
    h2ScaleTimeline.to(linkH2, { scale: 1.2, duration: 0.5 });

    // Timeline for its relative content (optional add steps here)
    const contentTimeline = gsap.timeline({ paused: true });
    contentTimeline.to(contentSelector, { autoAlpha: 1, duration: 0.5 });

    linkW.addEventListener("mouseenter", () => {
      dropTimeline.restart();
      h2ScaleTimeline.restart();
      contentTimeline.restart();
    });

    linkW.addEventListener("mouseleave", () => {
      resetH1();
      gsap.set(contentSelector, { autoAlpha: 0, duration: 0.5 });
      gsap.set(linkH2, { scale: 1, duration: 0.5 });
    });
  });
});

