document.addEventListener('DOMContentLoaded', () => {
    const nameTag = document.querySelector('.tag');
    const aboutSection = document.querySelector('.about_me');
    
    // Select the elements to animate
    const hrLine = document.querySelector('.hr');
    const profileImg = document.querySelector('.per_img');
    const typingText = document.querySelector('.typing-text');

    // 1. Click to Scroll (remains the same)
    nameTag.addEventListener('click', () => {
        aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    // 2. Intersection Observer (The "Sensor")
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When entering the view: Play Animation
                hrLine.classList.add('active');
                profileImg.classList.add('active');
                if(typingText) typingText.classList.add('active');
            } else {
                // When leaving the view: Reset Animation
                // removing the class forces the elements back to opacity: 0 / width: 0
                hrLine.classList.remove('active');
                profileImg.classList.remove('active');
                if(typingText) typingText.classList.remove('active');
            }
        });
    }, {
        threshold: 0.2 // Triggers when 20% of the section is visible
    });

    // Start watching the about section
    observer.observe(aboutSection);
});