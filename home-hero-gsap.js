document.addEventListener("DOMContentLoaded", () => {
  const linkW = document.querySelector(".link_wrap");
  const linkH2 = linkW.querySelector("h2");
  const h1 = document.querySelector("h1");
  const splitText = new SplitText(h1, { type: "chars" });
  const chars = splitText.chars;

  function resetH1() {
    gsap.set(chars, { y: 0, autoAlpha: 1 });
    gsap.set(".about-content", { autoAlpha: 0, backgroundColor: "#12b839ff" });
    gsap.set(".anim-content", { autoAlpha: 0, backgroundColor: "#b8128fff" });
    gsap.set(".rest-content", { autoAlpha: 0, backgroundColor: "#e5e50cff" });
  }

  const linkHScale = gsap.timeline({ paused: true });
  linkHScale.to(linkH2, {
    scale: 1.2,
    duration: 0.5,
    stagger: {
      each: 0.01,
      from: "start",
    },
  });

  const aboutA = gsap.timeline({ paused: true });
  aboutA.to(".about-content", { autoAlpha: 1, duration: 0.5 });

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

  linkW.addEventListener("mouseenter", () => {
    linkHScale.restart();
    dropTimeline.restart();
    aboutA.restart();

    // if (linkW.querySelector("[anima='about']")) {
    // gsap.to(".about-content", { autoAlpha: 1, duration: 0.5 });
    console.log("scale yay");
    // } else if (linkW.querySelector("[anima='anim']")) {
    //   let tl = gsap.timeline();
    //   tl.to(".anim-bg", { autoAlpha: 1, duration: 0.5 })
    //     .call(() => {
    //       // Play Rive animation here
    //     })
    //     .call(() => {
    //       // Play Lottie animations here
    //     });
    //   tl.to(".anim-content", { autoAlpha: 1, duration: 0.5 }, "<");
    // } else if (linkW.querySelector("[anima='rest']")) {
    //   gsap.to(".rest-content", { autoAlpha: 1, duration: 0.5 });
    // }
  });

  linkW.addEventListener("mouseleave", () => {
    // gsap.to(linkH2, { scale: 1, duration: 0.5 });
    resetH1();
    gsap.set([".about-content", ".anim-content", ".rest-content"], {
      autoAlpha: 0,
      duration: 0.5,
    });
  });
});
