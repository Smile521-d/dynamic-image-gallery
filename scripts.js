// Array of image data (using JavaScript objects)
const images = [
    {
        large: 'images/flowers-pink-large.jpg',
        small: 'images/flowers-pink-small.jpg',
        caption: 'Pink Flowers',
        description: 'Beautiful pink flowers in full bloom.',
        interestingFact: 'Pink flowers symbolize admiration, gratitude, and appreciation.',
        isActive: true // New property to track active/inactive state
    },
    {
        large: 'images/flowers-purple-large.jpg',
        small: 'images/flowers-purple-small.jpg',
        caption: 'Purple Flowers',
        description: 'Vibrant purple flowers with green leaves.',
        interestingFact: 'Purple flowers often represent royalty, dignity, and success.',
        isActive: false
    },
    {
        large: 'images/flowers-red-large.jpg',
        small: 'images/flowers-red-small.jpg',
        caption: 'Red Flowers',
        description: 'Bright red flowers against a green background.',
        interestingFact: 'Red flowers are associated with passion, love, and courage.',
        isActive: false
    },
    {
        large: 'images/flowers-white-large.jpg',
        small: 'images/flowers-white-small.jpg',
        caption: 'White Flowers',
        description: 'Elegant white flowers in a garden setting.',
        interestingFact: 'White flowers symbolize purity, innocence, and spirituality.',
        isActive: false
    },
    {
        large: 'images/flowers-yellow-large.jpg',
        small: 'images/flowers-yellow-small.jpg',
        caption: 'Yellow Flowers',
        description: 'Sunshine yellow flowers with dew drops.',
        interestingFact: 'Yellow flowers represent joy, happiness, and friendship.',
        isActive: false
    }
];

let currentImageIndex = 0;
let slideshowInterval = null; // Variable to hold the interval ID for the slideshow

// Function to build the thumbnail list dynamically
function buildThumbnailList(imagesArray) {
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    // Clear existing thumbnails
    thumbnailsContainer.innerHTML = '';

    // Use imagesArray if provided, otherwise use default images array
    const imagesToUse = imagesArray || images;

    // Build thumbnails from images array
    imagesToUse.forEach((image, index) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        
        img.src = image.small;
        img.alt = image.caption;
        img.dataset.index = index; // Store index for easy reference
        
        // Apply grayscale filter for inactive thumbnails
        if (!image.isActive) {
            img.classList.add('inactive');
        }

        // Event listener for thumbnail click
        img.addEventListener('click', function() {
            showImage(index);
        });

        li.appendChild(img);
        thumbnailsContainer.appendChild(li);
    });
}

// Function to display selected image in the main view
function showImage(index) {
    const featuredImage = document.getElementById('featured');
    const caption = document.getElementById('caption');
    const interestingFact = document.getElementById('interesting-fact');

    featuredImage.src = images[index].large;
    featuredImage.alt = images[index].caption;
    caption.textContent = images[index].description;
    interestingFact.textContent = images[index].interestingFact;

    // Update active state in images array
    images.forEach((image, idx) => {
        image.isActive = (idx === index);
    });

    // Update thumbnails active/inactive styling
    const thumbnails = document.querySelectorAll('#thumbnails img');
    thumbnails.forEach((thumbnail, idx) => {
        if (idx === index) {
            thumbnail.classList.remove('inactive');
        } else {
            thumbnail.classList.add('inactive');
        }
    });

    // Update currentImageIndex
    currentImageIndex = index;

    // Restart slideshow if it was running
    if (slideshowInterval !== null) {
        clearInterval(slideshowInterval);
        startSlideshow();
    }
}

// Function to navigate to previous image
function prevImage() {
    let newIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(newIndex);
}

// Function to navigate to next image
function nextImage() {
    let newIndex = (currentImageIndex + 1) % images.length;
    showImage(newIndex);
}

// Function to start the slideshow
function startSlideshow() {
    slideshowInterval = setInterval(() => {
        nextImage();
    }, 3000); // Change image every 3 seconds
}

// Function to stop the slideshow
function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
}

// Function to handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Initial function calls
buildThumbnailList();
showImage(0); // Display the first image initially
startSlideshow(); // Start the slideshow when the page loads
