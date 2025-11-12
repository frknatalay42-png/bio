// Nowanest - Modern Interactive Gallery JavaScript

$(document).ready(function() {
    // Category filtering functionality
    const categoryTabs = $('.category-tab');
    const galleryItems = $('.gallery-item');
    
    categoryTabs.on('click', function() {
        const selectedCategory = $(this).data('category');
        
        // Update active tab
        categoryTabs.removeClass('active');
        $(this).addClass('active');
        
        // Filter gallery items with animation
        if (selectedCategory === 'all') {
            galleryItems.fadeOut(200, function() {
                $(this).fadeIn(400);
            });
        } else {
            galleryItems.each(function() {
                const itemCategory = $(this).data('category');
                if (itemCategory === selectedCategory) {
                    $(this).fadeOut(200, function() {
                        $(this).fadeIn(400);
                    });
                } else {
                    $(this).fadeOut(200);
                }
            });
        }
        
        // Update item count after animation
        setTimeout(updateItemCount, 300);
    });
    
    // Update item count
    function updateItemCount() {
        const visibleItems = galleryItems.filter(':visible').length;
        $('#itemCount').text(visibleItems + ' items');
    }
    
    // Search functionality
    const searchInput = $('.tm-search-input');
    const searchForm = $('.tm-search-form');
    
    searchForm.on('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.val().toLowerCase();
        
        if (searchTerm === '') {
            galleryItems.fadeIn(400);
            categoryTabs.removeClass('active');
            categoryTabs.first().addClass('active');
        } else {
            galleryItems.each(function() {
                const itemText = $(this).find('h2').text().toLowerCase();
                if (itemText.includes(searchTerm)) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(200);
                }
            });
            categoryTabs.removeClass('active');
        }
        
        setTimeout(updateItemCount, 300);
    });
    
    // Live search as you type
    searchInput.on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        if (searchTerm === '') {
            galleryItems.fadeIn(400);
            updateItemCount();
            return;
        }
        
        galleryItems.each(function() {
            const itemText = $(this).find('h2').text().toLowerCase();
            if (itemText.includes(searchTerm)) {
                $(this).fadeIn(400);
            } else {
                $(this).fadeOut(200);
            }
        });
        
        setTimeout(updateItemCount, 300);
    });
    
    // Smooth scroll for links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Add hover effect to gallery items
    $('.tm-video-item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css({
                'background': 'rgba(26, 26, 46, 0.98)',
                'box-shadow': '0 4px 30px rgba(0, 0, 0, 0.5)'
            });
        } else {
            $('.navbar').css({
                'background': 'rgba(26, 26, 46, 0.95)',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.3)'
            });
        }
    });
    
    // Initialize item count
    updateItemCount();
    
    // Add entrance animation to gallery items
    function animateGalleryItems() {
        galleryItems.each(function(index) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(30px)'
            });
            
            setTimeout(() => {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)',
                    'transition': 'all 0.6s ease'
                });
            }, index * 50);
        });
    }
    
    // Trigger animation on page load
    setTimeout(animateGalleryItems, 100);
    
    // Video banner control
    $('#tm-video-control-button').on('click', function() {
        const video = document.getElementById('heroBgVideo');
        if (video) {
            if (video.paused) {
                video.play();
                $(this).removeClass('fa-play').addClass('fa-pause');
            } else {
                video.pause();
                $(this).removeClass('fa-pause').addClass('fa-play');
            }
        }
    });
    
    // Mobile menu enhancement
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').toggleClass('show');
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').removeClass('show');
        }
    });
    
    // Add click sound effect (optional)
    categoryTabs.on('click', function() {
        // Visual feedback
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 100);
    });
    
    console.log('%c🏠 Nowanest Gallery Loaded Successfully! ', 
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px; border-radius: 5px; font-size: 14px; font-weight: bold;');
});
