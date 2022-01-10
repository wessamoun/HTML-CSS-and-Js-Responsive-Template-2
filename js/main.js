// change colors
let colors = document.querySelectorAll(".settings li");

colors.forEach(function (color) {
  color.addEventListener("click", function (e) {
    colors.forEach(function (color) {
      color.classList.remove("active");
    });
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("mainColor", e.target.dataset.color);
  });
});

// local storage colors
let localColor = localStorage.getItem("mainColor");
if (localColor != null) {
  document.documentElement.style.setProperty("--main-color", localColor);
  colors.forEach(function (color) {
    color.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${localColor}"]`)
    .classList.add("active");
}

// local storage random backgrounds
let backgroundBoolean = true;
let localBackground = localStorage.getItem("selectedBackground");
let backgroundRandomButton = document.querySelectorAll(
  ".background .option div"
);
let backgroundNo = document.querySelector(".background .option .no");

function localStorageRandomBackground() {
  if (localBackground !== null) {
    if (localBackground === "false") {
      backgroundBoolean = false;
      backgroundRandomButton.forEach(function (button) {
        button.classList.remove("selected");
      });
      backgroundNo.classList.add("selected");
    }
  }
}
localStorageRandomBackground();
// random background
let landing = document.querySelector(".landing");
let backgroundArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let backgroundIntervalFunction;

backgroundRandomButton.forEach(function (button) {
  button.addEventListener("click", function (e) {
    backgroundRandomButton.forEach(function (button) {
      button.classList.remove("selected");
    });
    e.target.classList.add("selected");
    if (e.target.dataset.background === "yes") {
      backgroundBoolean = true;
      backgroundOption();
      localStorage.setItem("selectedBackground", backgroundBoolean);
    } else {
      backgroundBoolean = false;
      clearInterval(backgroundIntervalFunction);
      localStorage.setItem("selectedBackground", backgroundBoolean);
    }
  });
});
function backgroundOption() {
  if (backgroundBoolean === true) {
    backgroundIntervalFunction = setInterval(function () {
      landing.style.backgroundImage = `url(imgs/${
        backgroundArray[Math.floor(Math.random() * backgroundArray.length)]
      })`;
    }, 1000);
  }
}
backgroundOption();
//settings show
let settings = document.querySelector(".settings");
let settingsIcon = document.querySelector(".settings .icon i");
settingsIcon.addEventListener("click", function () {
  settings.classList.toggle("open");
  settingsIcon.classList.toggle("fa-spin");
});

//skills rate on scroll
let skills = document.querySelector(".skills");
let rate = document.querySelectorAll(".rate span");
window.onscroll = function () {
  if (window.scrollY >= skills.offsetTop - skills.offsetHeight / 2) {
    rate.forEach(function (span) {
      span.style.width = span.dataset.width;
    });
  }
};

//show image
let images = document.querySelectorAll(".images .img");
let imageOverlay = document.querySelector(".image-overlay");
images.forEach(function (image) {
  image.addEventListener("click", function (e) {
    imageOverlay.style.display = "block";
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let h2Content = document.createTextNode(`Image ${e.target.className}`);
    let span = document.createElement("span");
    span.classList.add("close");
    let spanContent = document.createTextNode("X");
    span.appendChild(spanContent);
    h2.appendChild(h2Content);
    div.innerHTML = this.innerHTML;
    div.appendChild(h2);
    div.appendChild(span);
    imageOverlay.appendChild(div);
    console.log(h2);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className == "close") {
    imageOverlay.style.display = "none";
  }
});

//use bullets to scroll
let bullets = document.querySelectorAll(".bulletss .bullet");
bullets.forEach(function (bullet) {
  bullet.addEventListener("click", function (e) {
    document
      .querySelector(`.${e.target.dataset.scroll}`)
      .scrollIntoView({ behavior: "smooth" });
  });
});
// localStorage hide bullets
let localStorageHideBullets = localStorage.getItem("bulletsVisibility");
if (localStorageHideBullets != null) {
  if (localStorageHideBullets == "hidden") {
    bullets.forEach(function (bullet) {
      bullet.style.visibility = "hidden";
    });
    document
      .querySelector(".bullets .option .yes")
      .classList.remove("selected");
    document.querySelector(".bullets .option .no").classList.add("selected");
  }
}
//hide bullets
let bulletsHideButton = document.querySelectorAll(".bullets .option div");
bulletsHideButton.forEach(function (button) {
  button.addEventListener("click", function (e) {
    bulletsHideButton.forEach(function (button) {
      button.classList.remove("selected");
    });
    e.target.classList.add("selected");
    if (e.target.classList.contains("no")) {
      bullets.forEach(function (bullet) {
        bullet.style.visibility = "hidden";
      });
      localStorage.setItem("bulletsVisibility", "hidden");
    } else if (e.target.classList.contains("yes")) {
      bullets.forEach(function (bullet) {
        bullet.style.visibility = "visible";
      });
      localStorage.setItem("bulletsVisibility", "visible");
    }
  });
});
//reset button
let resetButton = document.querySelector("button");
resetButton.addEventListener("click", function (e) {
  localStorage.removeItem("bulletsVisibility");
  localStorage.removeItem("mainColor");
  localStorage.removeItem("selectedBackground");
  window.location.reload();
});
//menu button
let menuButton = document.querySelector(".landing .icon");
let navMenu = document.querySelector(".nav");
menuButton.addEventListener("click", function (e) {
  e.stopPropagation();
  menuButton.classList.toggle("menu-active");
  navMenu.classList.toggle("open");
});
document.addEventListener("click", function (e) {
  if (e.target !== menuButton && e.target !== navMenu) {
    if (navMenu.classList.contains("open")) {
      menuButton.classList.toggle("menu-active");
      navMenu.classList.toggle("open");
    }
  }
});
navMenu.onclick = function (e) {
  e.stopPropagation();
}