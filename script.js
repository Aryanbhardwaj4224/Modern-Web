const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// ---
const orochi = document.getElementById("minicircle");
const gifRightStraight = "gif/ezgif.com-gif-to-mp4-converter.gif";
const gifRightTilt = "gif/ezgif.com-rotate1.gif";
const gifLeftTilt = "gif/ezgif.com-rotate2.gif";
let previousValueOfX = 0;
let lastMoveTime = Date.now();

function orochiMouseFollower() {
  window.addEventListener("mousemove", (value) => {
    const currentValueOfX = value.clientX;
    const currentValueOfY = value.clientY;
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

// ---

const elem = document.querySelectorAll(".elem");
elem.forEach((element) => {
  let previousValueOfX = 0;
  let displacementOfX = 0;

  element.addEventListener("mouseleave", (value) => {
    let img = element.querySelector("img");
    gsap.to(img, {
      opacity: 0,
      ease: "power3",
    });
  });
  element.addEventListener("mousemove", (value) => {
    let img = element.querySelector("img");
    let bounds = element.getBoundingClientRect();
    let currentValueOfX = value.clientX;
    let currentValueOfY = value.clientY;
    let elementValueFromTop = bounds.top;
    let elementValueFromLeft = bounds.left;
    let DifferenceInValueOfY =
      currentValueOfY - elementValueFromTop - img.offsetHeight / 2;
    let DifferenceInValueOfX =
      currentValueOfX - elementValueFromLeft - img.offsetWidth / 2;

    displacementOfX = previousValueOfX - currentValueOfX;
    previousValueOfX = currentValueOfX;

    gsap.to(img, {
      opacity: 1,
      ease: "power3",
      top: DifferenceInValueOfY,
      left: DifferenceInValueOfX,
      rotate: gsap.utils.clamp(-20, 20, displacementOfX),
    });
  });

  element.addEventListener("mouseenter", () => {
    gsap.to(orochi, { opacity: 0, duration: 0.3, ease: "power3.out" });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(orochi, { opacity: 1, duration: 0.3, ease: "power3.out" });
  });
});

const link = document.getElementById("playVideo");
const container = document.getElementById("videoContainer");
const gameplay = document.getElementById("gameplay");

let videoVisible = false;

link.addEventListener("click", (e) => {
  e.preventDefault();

  if (!videoVisible) {
    // Show video
    container.innerHTML = `
      <iframe width="560" height="315"
        src="https://www.youtube.com/embed/6oCzaDV6zEw?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
    container.style.display = "flex";
    gameplay.style.paddingBottom = "2vw"; // extra space equal to video height
    link.innerHTML = "close video <i class='ri-arrow-right-up-line'></i>";
    videoVisible = true;
  } else {
    // Hide video
    container.innerHTML = "";
    container.style.display = "none";
    gameplay.style.paddingBottom = "2vw"; // reset to normal
    link.innerHTML =
      "click to view gameplay <i class='ri-arrow-right-up-line'></i>";
    videoVisible = false;
  }

  // if using Locomotive Scroll, refresh it
  if (typeof scroll !== "undefined") {
    scroll.update();
  }
});


const time = document.querySelector("#time");
setInterval(() => {
  const now = new Date();
  const localTime = now.toLocaleTimeString(); // e.g., "18:52:30"
    time.textContent = localTime;
}, 1000);