import { Carousel, Fancybox } from "@fancyapps/ui";
import { Navigation, MobileOverlay, TabsManager } from "./classes";
import { basicNavigationItems, footerNavigationItems, serviceItems } from "./utils";

function initHeaderNavigation() {
  const footerNavigation = document.getElementById("header-navigation");
  footerNavigation.appendChild(new Navigation(basicNavigationItems, "navigation-list"));
}

function initFooterNavigation() {
  const headerNavigation = document.getElementById("footer-navigation");
  headerNavigation.appendChild(new Navigation(footerNavigationItems, "navigation-list"));
}

function initMobileOverlay() {
  const mobileOverlay = new MobileOverlay("mobile-overlay");

  const mobileNavigation = document.getElementById("mobile-navigation");
  mobileNavigation.appendChild(new Navigation(basicNavigationItems, "navigation-list"));

  const mobileNavigationLinks = mobileNavigation.getElementsByClassName("navigation-list__link");
  Array.from(mobileNavigationLinks).forEach((link) => {
    link.addEventListener("click", () => {
      mobileOverlay.close();
    })
  })

  const headerBurger = document.getElementById("header-burger");
  headerBurger.addEventListener("click", () => {
    mobileOverlay.open();
  });
}

function initForm() {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const { name, number } = event.target;
    const dataToSend = {
      name: name.value,
      number: number.value,
    }

    console.log(dataToSend);
  })
}

function initCarousel() {
  const container = document.getElementById("myCarousel");
  const worksCarousel = new Carousel(
    container,
    {
      center: true,
      slidesPerPage: 1,
      Dots: false,
      Navigation: false,
    }
  );

  const arrowLeft = document.querySelector(".arrow-left")
  const arrowRight = document.querySelector(".arrow-right");

  arrowLeft.addEventListener("click", worksCarousel.slideNext);
  arrowRight.addEventListener("click", worksCarousel.slidePrev);

  Fancybox.bind('[data-fancybox="gallery"]', {});
}

function initServices() {
  const tabsManagerContainer = document.getElementById("tabs-manager-container");
  tabsManagerContainer.appendChild(new TabsManager(serviceItems, "tabs-manager"));
}



function main() {
  initHeaderNavigation();
  initFooterNavigation();

  initServices();

  initMobileOverlay();
  initCarousel();
  initForm();
}

main();