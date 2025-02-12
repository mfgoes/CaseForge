// Update active class on carousel thumbnail click
document.querySelectorAll('.carousel-thumbnail').forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
        // Remove the active class from all thumbnails
        document.querySelectorAll('.carousel-thumbnail').forEach(function(item) {
            item.classList.remove('active');
        });
        // Add active class to the clicked thumbnail
        this.classList.add('active');
    });
});

// Ensure the correct thumbnail gets the active class when carousel slides
document.querySelector('#carouselExample').addEventListener('slid.bs.carousel', function (event) {
    // Get the index of the active slide
    var activeIndex = event.to;
    // Remove active class from all thumbnails
    document.querySelectorAll('.carousel-thumbnail').forEach(function(item) {
        item.classList.remove('active');
    });
    // Add active class to the thumbnail corresponding to the active slide
    document.querySelector('.carousel-thumbnail[data-bs-slide-to="'+activeIndex+'"]').classList.add('active');
});
