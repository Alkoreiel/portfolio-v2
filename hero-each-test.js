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

    const h2ScaleTimeline = gsap.timeline({ paused: true });
    h2ScaleTimeline.to(linkH2, { scale: 1.2, duration: 0.5 });

    let contentTimeline;

    if (anima === "about") {
      contentTimeline = gsap.timeline({ paused: true });
      contentTimeline
        .to(".about-content", { autoAlpha: 1, duration: 0.5, backgroundColor: "#12b839ff" }, ".9")
        .from(".about-content .text-line", { x: -100, autoAlpha: 0, stagger: 0.2, duration: 0.5 }, "<")
        .from(".about-content .image", { y: 50, autoAlpha: 0, duration: 0.6 }, "<0.3");
    } else if (anima === "anim") {
      contentTimeline = gsap.timeline({ paused: true });
      contentTimeline
        .to(".anim-content", { autoAlpha: 1, duration: 0.5, backgroundColor: "#b8128fff" })
        .to( ".logo-rive", { autoAlpha: 1}, "+.3"
        .call(() => {
          // Start Rive animation here, e.g. riveInstance.play();
        })
        .from(".anim-content .lottie", { autoAlpha: 0, stagger: 0.15, duration: 0.4 }, "<0.3");
    } else if (anima === "rest") {
      contentTimeline = gsap.timeline({ paused: true });
      contentTimeline
        .to(".rest-content", { autoAlpha: 1, duration: 0.5, backgroundColor: "#e5e50cff" })
        .from(".rest-content .image", { y: 30, autoAlpha: 0, stagger: 0.2, duration: 0.5 }, "<");
    }

    linkW.addEventListener("mouseenter", () => {
      dropTimeline.restart();
      h2ScaleTimeline.restart();
      contentTimeline.restart();
    });

    linkW.addEventListener("mouseleave", () => {
      resetH1();
      gsap.set([`.${anima}-content`], { autoAlpha: 0, duration: 0.5 });
      gsap.set(linkH2, { scale: 1, duration: 0.5 });
    });
  });
});
