import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from "gsap";
import { preloadFonts } from "./utils";

preloadFonts("lwc3axy").then(() => document.body.classList.remove("loading"));

Splitting();

let DOM = {
  content: {
    home: {
      section: document.querySelector(".content__item--home"),
      get chars() {
        return this.section.querySelectorAll(
          ".content__paragraph .word > .char, .whitespace"
        );
      },
      isVisible: true,
    },

    about: {
      section: document.querySelector(".content__item--about"),
      get chars() {
        return this.section.querySelectorAll(
          ".content__paragraph .word > .char, .whitespace"
        );
      },
      get picture() {
        return this.section.querySelector(".content__figure");
      },
      isVisible: false,
    },
  },
  links: {
    about: {
      anchor: document.querySelector("a.frame__about"),
      get stateElement() {
        return this.anchor.children;
      },
    },
  },
};

const timelineSettings = {
  staggerValue: 0.014,
  charsDuration: 0.5,
};

const timeline = gsap
  .timeline({ paused: true })
  .addLabel("start")
  .staggerTo(
    DOM.content.home.chars,
    timelineSettings.charsDuration,
    {
      ease: "Power3.easeIn",
      y: "-100%",
      opacity: 0,
    },
    timelineSettings.staggerValue,
    "start"
  )
  .addLabel("switchtime")
  .add(() => {
    DOM.content.home.section.classList.toggle("content__item--current");
    DOM.content.about.section.classList.toggle("content__item--current");
  })
  .to(
    document.body,
    {
      duration: 0.8,
      ease: "Power1.easeInOut",
      backgroundColor: "#c3b996",
    },
    "switchime-=timelineSettings.charsDuration/4"
  )
  .set(
    DOM.content.about.chars,
    {
      y: "100%",
    },
    "switchtime"
  )
  .set(
    DOM.content.about.picture,
    {
      y: "40%",
      rotation: -4,
      opacity: 0,
    },
    "switchime"
  )
  .staggerTo(
    DOM.content.about.chars,
    timelineSettings.charsDuration,
    {
      ease: "Power3.easeOut",
      y: "0%",
    },
    timelineSettings.staggerValue,
    "switchtime"
  )
  .to(
    DOM.content.about.picture,
    0.8,
    {
      ease: "Power3.easeOut",
      y: "0%",
      opacity: 1,
      rotation: 0,
    },
    "switchtime+=0.6"
  );

const switchContent = () => {
  DOM.links.about.stateElement[0].classList[DOM.content.about.isVisible ? "add" : "remove"]("content__item--current");
  DOM.links.about.stateElement[1].classList[DOM.content.about.isVisible ? "remove" : "add"]("content__item--current");
  timeline[DOM.content.about.isVisible ? "reverse" : "play"]();
  DOM.content.about.isVisible = !DOM.content.about.isVisible;
  DOM.content.home.isVisible = !DOM.content.home.isVisible;
};

DOM.links.about.anchor.addEventListener("click", () => switchContent());
