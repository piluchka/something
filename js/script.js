"use strict"

document.addEventListener("click", clickHandler)
window.addEventListener("scroll", scrollHandler)

// Click handler(all click functions)
function clickHandler(e) {
  const target = e.target

  if (target.classList.contains("icon-menu")) {
    document.body.classList.toggle("menu-opened")
  }
  if (target.classList.contains("overlay")) {
    document.body.classList.remove("menu-opened")
  }
  if (target.classList.contains("hero__play-button")) {
    const videoContainer = document.querySelector(".hero__video")
    if (innerWidth > 768) {
      openVideo(videoContainer)
    } else {
      window.open("https://www.youtube.com/watch?v=0Puv0Pss33M&ab_channel=WWFInternational", "_blank")
    }
  }
  if (target.classList.contains("hero__close-button")) {
    const videoContainer = document.querySelector(".hero__video")
    closeVideo(videoContainer)
  }
  if (target.classList.contains("about__play-button")) {
    const videoContainer = document.querySelector(".about__video")
    if (window.innerWidth <= 425) {
      videoContainer.firstElementChild.setAttribute("controls", "")
    }
    openVideo(videoContainer)
  }
  if (target.classList.contains("about__close-button")) {
    const videoContainer = document.querySelector(".about__video")
    closeVideo(videoContainer)
  }
  if (target.classList.contains("about-us__play-button")) {
    const videoContainer = document.querySelector(".about-us__video")
    if (window.innerWidth <= 425) {
      videoContainer.firstElementChild.setAttribute("controls", "")
    }
    openVideo(videoContainer)
  }
  if (target.classList.contains("about-us__close-button")) {
    const videoContainer = document.querySelector(".about-us__video")
    closeVideo(videoContainer)
  }
  if (target.closest("[data-tabs-button]")) {
    const currEl = target.closest("[data-tabs-button]")
    setTab(currEl)
    // console.log(currEl)
  }
}
// scroll handler(all scroll functions)
function scrollHandler(e) {
  if (document.querySelector(".hero__video")) {
    mainVideoStopper()
  }
  if (window.scrollY >= 0) {
    const header = document.querySelector(".header")
    header.classList.add("_colored")
  }
  if (window.scrollY === 0) {
    const header = document.querySelector(".header")
    header.classList.remove("_colored")
  }
}

// ------------------------------------------------

// Video-functions
function openVideo(videoContainer) {
  videoContainer.classList.add("_play")
  const video = videoContainer.firstElementChild
  video.volume = 0.2
  video.play()
}
function closeVideo(videoContainer) {
  videoContainer.classList.remove("_play")
  const video = videoContainer.firstElementChild
  video.pause()
}

// Closure function that closes video when user scrolls down
function createVideoScrollStop(videoContainer) {
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop

  return function videoScrollStop() {
    const scrollTopPosition = window.scrollY || document.documentElement.scrollTop

    if (scrollTopPosition > lastScrollTop) {
      closeVideo(videoContainer)
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition
  }
}

const mainVideoContainer = document.querySelector(".hero__video")
let mainVideoStopper = createVideoScrollStop(mainVideoContainer)

// ----------------------------------

// Logos Swiper
if (document.querySelector(".logo-swiper")) {
  const logoSwiper = new Swiper(".logo-swiper", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,

    // animation
    speed: 3000,
    loop: true,
    autoplay: true,
    delay: 0,

    // breakpoints
    breakpoints: {
      539: {
        slidesPerView: 3,
      },
    },
  })
}

// ------------------------------------------
// Tabs
function setTab(tabElement) {
  const tab = tabElement.closest("[data-tabs]")

  const tabsButtons = Array.from(tab.querySelectorAll("[data-tabs-button]"))
  const currentButtonIndex = tabsButtons.indexOf(tabElement)

  const activeTabButton = tab.querySelector("[data-tabs-button]._active-tab")
  activeTabButton.classList.remove("_active-tab")
  tabElement.classList.add("_active-tab")

  const tabElements = Array.from(tab.querySelectorAll("[data-tabs-element]"))
  tabElements.forEach((tabEl) => {
    tabEl.hidden = true
  })

  tabElements[currentButtonIndex].hidden = false
}
