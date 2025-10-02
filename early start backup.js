const introTitle = document.querySelector(".intro_title.anim");
const introH = introTitle ? introTitle.querySelector("h2") : null;
const animbgEl = document.querySelector(".home_animation-bg");
const animbgS = "150vmax";

// Select all split characters in your h1 (e.g., using SplitText)
const h1Chars = document.querySelectorAll("h1");

if (introTitle && animbgEl) {
  introTitle.addEventListener("mouseenter", () => {
    gsap.set(animbgEl, {
      autoAlpha: 0,
      width: "0vmax",
      height: "0vmax",
      borderRadius: "100vw",
    });

    gsap.to(animbgEl, {
      autoAlpha: 1,
      borderRadius: "0vw",
      width: animbgS,
      height: animbgS,
      duration: 1.9,
      ease: "power2.inOut",
    });

    if (introH) {
      gsap.to(introH, {
        scale: 1.2,
        duration: 0.9,
        ease: "power2.inOut",
      });
    }

    if (h1Chars.length) {
      gsap.to(h1Chars, {
        duration: 0.6,
        y: 100,
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: "random",
        },
        ease: "power2.out",
        },
      });
    }
  });

  introTitle.addEventListener("mouseleave", () => {
    gsap.to(animbgEl, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power4.inOut",
    });

    if (introH) {
      gsap.to(introH, {
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }

    if (h1Chars.length) {
      gsap.to(h1Chars, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: {
          each: 0.07,
        },
      });
    }
  });
}
