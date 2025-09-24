const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function circleMouseFollower() {
  window.addEventListener("mousemove", (event) => {
    document.querySelector("#minicircle" ).style.transform = `translate(${event.clientX}px, ${event.clientY}px )`;
  });
}

function circleSkew() {
  window.addEventListener("mousemove", function (event) {
    
  });
}

function firstPageAnimation() {
  let t1 = gsap.timeline();
  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.3,
    })
    .from("#hero-footer", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

circleMouseFollower();
firstPageAnimation();
