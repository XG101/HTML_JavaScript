//This is from Max's Code for forms
function playdrums() {
    document.getElementById("badum").play();
}


function scrollToRSVP() {
    document.getElementById("RSVP").scrollIntoView({ behavior: 'smooth' });
}


function scrollToSection() {
    document.getElementById("YT").scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection() {
    document.getElementById("badum").scrollIntoView({ behavior: 'smooth' });
}
function toggleMute() {
    var video = document.getElementById("video");
    video.muted = !video.muted;
}

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = localStorage.getItem('currentIndex') ? parseInt(localStorage.getItem('currentIndex')) : 0;
    let videoElement = document.getElementById("video");
    let videoContainer = document.getElementById("videoContainer");
    let mediaContainer = document.getElementById("imageContainer");

    // Fetch the media.json file and load the images and videos
    fetch('media.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to check its structure

            if (!data.myDiffVideos || data.myDiffVideos.length === 0) {
                console.error("No images or videos found in media.json");
                return;
            }

            // Loop through the data and populate the media container
            data.myDiffVideos.forEach((item, index) => {
                let mediaElement;

                if (item.type === "image") {
                    mediaElement = document.createElement("img");
                    mediaElement.src = item.src;
                    mediaElement.alt = item.alt;
                    mediaElement.dataset.index = index;
                    mediaElement.classList.add("carousel-media");

                    // Event listener for clicking an image
                    mediaElement.addEventListener("click", () => {
                        showVideo(item.videoSrc, item.captions); // Correct function call with videoSrc and captions
                        localStorage.setItem('currentIndex', index); // Save the index of the image in localStorage
                    });

                    // Add 'active' class to the image that should be visible when the page loads
                    if (index === currentIndex) {
                        mediaElement.classList.add("active");
                    }

                    mediaContainer.appendChild(mediaElement);
                }
            });

            // Event listeners for navigation arrows
            document.getElementById("leftArrow").addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });

            document.getElementById("rightArrow").addEventListener("click", () => {
                if (currentIndex < data.myDiffVideos.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });

            // Function to show video based on the image clicked
            function showVideo(videoSrc, captions) {
                // Hide images
                const allImages = document.querySelectorAll("#imageContainer img");
                allImages.forEach(img => img.classList.remove("active"));

                // Show the clicked image
                const clickedImage = allImages[currentIndex]; // Use the correct currentIndex
                clickedImage.classList.add("active");

                // Set the video source and make sure the video plays in the background
                videoElement.src = videoSrc;
                videoElement.load();
                videoElement.play();

                // Show the video container
                videoContainer.style.display = "block";

                // Handle captions
                handleCaptions(videoElement, captions);
            }

            // Function to handle captions display based on video time
            function handleCaptions(videoElement, captions) {
                const captionContainer = document.getElementById("captionContainer");
                captionContainer.innerHTML = ''; // Clear previous captions

                // Track caption display based on video time
                videoElement.ontimeupdate = function () {
                    const currentTime = videoElement.currentTime;

                    // Find the caption that matches the current time
                    const activeCaption = captions.find(caption => currentTime >= caption.start && currentTime <= caption.end);

                    // Display the caption if there's an active one
                    if (activeCaption) {
                        captionContainer.textContent = activeCaption.text;
                    } else {
                        captionContainer.textContent = ''; // Clear if no caption is active
                    }
                };
            }

            // Function to update the carousel and show the correct image
            function updateCarousel() {
                // Hide all images
                const allImages = document.querySelectorAll("#imageContainer img");
                allImages.forEach(img => img.classList.remove("active"));

                // Show the current image
                const currentImage = allImages[currentIndex];
                currentImage.classList.add("active");

                // Stop and reset the video
                videoElement.pause();
                videoElement.currentTime = 0;
                videoContainer.style.display = "none"; // Hide the video container

                // Save the current index to localStorage
                localStorage.setItem('currentIndex', currentIndex);
            }

            // Initialize the carousel by showing the first image (or the saved one)
            updateCarousel();

            // Collapsible video block toggle functionality
            const toggleButton = document.getElementById("toggleVideoButton");
            toggleButton.addEventListener("click", function () {
                if (videoContainer.style.display === "none") {
                    videoContainer.style.display = "block"; // Show the video container
                    toggleButton.textContent = "Hide Video"; // Change button text
                } else {
                    videoContainer.style.display = "none"; // Hide the video container but keep the video playing
                    toggleButton.textContent = "Show Video"; // Change button text
                }
            });
        })
        .catch(error => {
            console.error('Error loading media.json:', error);
        });
});

//pause play button
const button = document.getElementById("PausePlay");
const video = document.getElementById("video");

button.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        button.textContent = "Pause";
    }
    else {
        video.pause();
        button.textContent = "Play";
    }
});

//video volume
const slider = document.getElementById("video_volume");

video_volume.addEventListener("input", () => {
    video.volume = slider.value;
})

//Anastasia'a code
function changeTitle() {
    document.getElementById("heading1").innerText = "Music";
}
function changeBack() {
    document.getElementById("heading1").innerText = "Musica";
}
function changeTitle2() {
    document.getElementById("heading2").innerText = "Click Me!";
}
function changeBack2() {
    document.getElementById("heading2").innerText = "Music can be used for many reasons";
}
function changeText() {
    document.getElementById("changer").innerText = "I love music!";
}
//hidden text toggle
let toggleCheck = false;
function toggleDropdown() {
    if (toggleCheck == false) {
        document.getElementById("dropdown1").innerHTML = "-To express the cultural standards of rythm, melody, and harmony";
        document.getElementById("dropdown2").innerHTML = "-To aid in a dancing experience";
        document.getElementById("dropdown3").innerHTML = "-To have shows or movies express emotion and feeling";
        document.getElementById("dropdown4").innerHTML = "-Something for people to listen for a feeling or emotion whenever they please";
        toggleCheck = true;
    }
    else if (toggleCheck == true) {
        document.getElementById("dropdown1").innerHTML = "";
        document.getElementById("dropdown2").innerHTML = "";
        document.getElementById("dropdown3").innerHTML = "";
        document.getElementById("dropdown4").innerHTML = "";
        toggleCheck = false;
    }
}
//scroll to top
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//nav link highlighting
  // Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.scrollY;
  
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
  
    const sectionTop = (current.getBoundingClientRect().top + window.scrollY) - 50;
    let sectionId = current.getAttribute("id");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navigation a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navigation a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}

//

//Maximilian Tiriobo's code
localStorage.setItem("username", "MaxTiriobo");
let username = localStorage.getItem("username");
console.log(username);
localStorage.removeItem("username");

let ignoreCount = localStorage.getItem('ignoreCount') ? parseInt(localStorage.getItem('ignoreCount')) : 0;
let messages = [];


fetch("media.JSON")
    .then(response => response.json())
    .then(data => {
        messages = data.stages;
    })
    .catch(error => console.error("error loading .JSON file", error));

function isEmpty(id) {
    let input = document.getElementById(id)
    if (input.value.trim() == "") {
        return true
    }
    else {
        return false
    }
}
function dispTxt() {
    if (isEmpty("name") || isEmpty("number") || isEmpty("email")) {
        if (messages.length > 0) {
            if (ignoreCount < messages.length) {
                document.getElementById("output").textContent = messages[ignoreCount].message;
                ignoreCount++
                localStorage.setItem('ignoreCount', ignoreCount)
            }
            else {
                ignoreCount = 0;
                document.getElementById("output").textContent = messages[ignoreCount].message
                ignoreCount++;
                localStorage.setItem('ignoreCount', ignoreCount);
            }
        }
        else {
            // ignoreCount++
            document.getElementById("output").textContent = "messages not loaded";
        }

    }
    else {
        document.getElementById("output").textContent = "Recieved, Thank You for filling out the form.";
        ignoreCount = 0;
        localStorage.setItem('ignoreCount', ignoreCount);
    }
}