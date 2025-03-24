//This is from Max's Code for forms
    function dispTxt(){
        document.getElementById("output").textContent = "Recieved, Thank You for filling out the form."
    }

    function playdrums(){
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
    function toggleMute() 
    {
    var video = document.getElementById("video");
    video.muted = !video.muted;
    }

    document.addEventListener("DOMContentLoaded", function() {
      let currentIndex = 0;
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
                      mediaElement.addEventListener("click", () => {
                          showVideo(item.videoSrc, index); // Show the corresponding video
                      });
  
                      if (index === 0) {
                          mediaElement.classList.add("active");
                      }
  
                      mediaContainer.appendChild(mediaElement);
                  }
              });
  
              // Event listeners for navigation
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
  
              function showVideo(videoSrc, index) {
                  // Hide images
                  const allImages = document.querySelectorAll("#imageContainer img");
                  allImages.forEach(img => img.classList.remove("active"));
  
                  // Show the clicked image
                  const clickedImage = allImages[index];
                  clickedImage.classList.add("active");
  
                  // Show video container
                  videoContainer.style.display = "block";
  
                  // Set the video source
                  videoElement.src = videoSrc;
                  videoElement.load();
                  videoElement.play();
              }
  
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
                  videoContainer.style.display = "none";
              }
  
              // Initialize the carousel by showing the first image
              updateCarousel();
          })
          .catch(error => {
              console.error('Error loading media.json:', error);
          });
  });
  
