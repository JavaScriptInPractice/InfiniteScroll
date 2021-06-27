const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0;
let photosArray = [];


// Unsplash API
const count = 10;
const apikey = "oAzcnc5Pau7o4jrlltxxvhWIpOBLs-ZmNthIAC1gXGM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImagesLoaded) {
    ready = true;
    loader.hidden = true;
   
    count=30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
  }
}
// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  totalImagesLoaded = photosArray.length;
  imagesLoaded = 0;
  // Run function for each object in photoArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("Title", photo.alt_description);

    // Event Listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>. then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotosFromUnsplashAPI() {
  try {
    const reponse = await fetch(apiUrl);
    photosArray = await reponse.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, laod more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromUnsplashAPI();
  }
});
// On Page Load
getPhotosFromUnsplashAPI();
