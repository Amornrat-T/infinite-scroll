const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true

//Unsplash API
let initialCount = 5;
const apiKey = 'izXKvNnIHjYaZll2sC3SoACtTU2xRACwAPwOgoVHqhs';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }


//check if all imgs were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
};

//helper function to Set attribute on DOM Elements
function setAttributes(element, attribute) {
  for (const key in attribute) {
      element.setAttribute(key, attribute[key]);
      
  }  
};


//Create elements for link, photo and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
  

    //run function for each object in photosarray
    photosArray.forEach((photo) => {
    //create <a> to link unsplash
    const item = document.createElement('a');
    setAttributes (item, {
        href: photo.links.html,
        target: '_blank',
    });
    //create <img> for photo
    const img = document.createElement('img');
    setAttributes (img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
        
    });

    //check when each is finished loading
    img.addEventListener('load', imageLoaded);

    //put <img> inside <a>, then put both inside imgContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
 
    });
};
    

//get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30) 
            isInitialLoad = false 
          }; 

    } catch (err) {
    //check error
    };
};

//load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


//on load
getPhotos();