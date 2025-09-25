const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

const orochi = document.getElementById("minicircle");
const gifRightStraight = "gif/ezgif.com-gif-to-mp4-converter.gif";
const gifRightTilt = "gif/ezgif.com-rotate1.gif";
const gifLeftTilt = "gif/ezgif.com-rotate2.gif";
let previousValueOfX = 0;
let lastMoveTime = Date.now();

function orochiMouseFollower() {
  window.addEventListener("mousemove", (value) => {
    const currentValueOfX = value.pageX;
    const currentValueOfY = value.pageY;
    // move GIF
    orochi.style.transform = `translate(${currentValueOfX - 80}px, ${
      currentValueOfY + 30
    }px)`;

    // determine movement direction left or right
    const displacementOfX = currentValueOfX - previousValueOfX;

    if (displacementOfX > 0) {
      orochi.style.backgroundImage = `url(${gifRightTilt})`;
    } else if (displacementOfX < 0) {
      orochi.style.backgroundImage = `url(${gifLeftTilt})`;
    }
    previousValueOfX = currentValueOfX;
    lastMoveTime = Date.now();
  });

  // check if cursor is stationary every 50ms
  setInterval(() => {
    if (Date.now() - lastMoveTime > 100) {
      orochi.style.backgroundImage = `url(${gifRightStraight})`;
    }
  }, 50);
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

orochiMouseFollower();
firstPageAnimation();
