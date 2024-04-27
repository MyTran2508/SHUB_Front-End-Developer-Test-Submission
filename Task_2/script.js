// Description: Script for the carousel section
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 6,
  spaceBetween: 32,
  navigation: {
    nextEl: ".next-button",
    prevEl: ".prev-button",
  },
  loop: true,
});

// Generate Swiper Slides
var swiperWrapper = document.querySelector(".swiper-wrapper");

for (var i = 1; i <= 12; i++) {
  var slide = document.createElement("div");
  slide.className = "swiper-slide";

  // set top position for every 2nd slide
  slide.style.top = i % 2 !== 1 ? "-30px" : "0px";
  const number_img = i > 6 ? i - 6 : i;

  //create inner div
  var innerDiv = document.createElement("div");
  innerDiv.style.position = "relative";
  innerDiv.style.top = "0px";
  innerDiv.style.width = "fit-content";

  //create img
  var img = document.createElement("img");
  img.src = "assets/carousel" + number_img + ".png";
  img.height = "396";
  img.alt = "ImageSection-Item";
  img.style.width = "100%";
  img.style.objectFit = "cover";
  img.style.borderRadius = "16px";

  //append img to inner div
  innerDiv.appendChild(img);
  slide.appendChild(innerDiv);
  swiperWrapper.appendChild(slide);
}
