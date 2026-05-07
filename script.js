document.addEventListener('DOMContentLoaded', () => {
    // 0. Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Toggles the hamburger-to-X animation
        });
    }

    // 1. Scroll Fade-in Animation Logic
    const hiddenElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 
    });

    hiddenElements.forEach((el) => observer.observe(el));

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if it's open when a link is clicked
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active'); // Reset the hamburger icon
            }
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Typing Effect Logic for the Tagline
    const textArray = [
        "Aspiring Full-Stack Developer", 
        "AI/ML Enthusiast",
        "Robotics Hobbyist", 
        "Tech Enthusiast"
    ];
    let textIndex = 0;
    let charIndex = 0;
    const typingElement = document.querySelector('.typing-text');

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typingElement.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 80); // Speed of typing
        } else {
            setTimeout(erase, 2000); // Pause at the end of the word
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 40); // Speed of erasing
        } else {
            textIndex++;
            if (textIndex >= textArray.length) textIndex = 0;
            setTimeout(type, 500); // Pause before typing next word
        }
    }

    // Start the typing effect after a short delay
    if (typingElement) {
        setTimeout(type, 1000);
    }
});

// --- 4. Certificate Image Modal Logic ---
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const expandedImg = document.getElementById("expandedImg");
    
    expandedImg.src = imageSrc;
    modal.style.display = "block";
}

function closeModal(event) {
    const modal = document.getElementById("imageModal");
    const expandedImg = document.getElementById("expandedImg");
    const closeBtn = document.querySelector(".close-modal");
    
    // Close if the user clicks the background overlay OR the close button
    if (event.target === modal || event.target === closeBtn) {
        modal.style.display = "none";
        expandedImg.src = ""; 
    }
}

// --- 5. Contact Form Logic ---
function sendEmail(event) {
    event.preventDefault(); // Prevents the page from refreshing
    
    // Grabbing the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // IMPORTANT: Replace this string with your actual email address
    const targetEmail = "kulanakawal@gmail.com"; 
    
    // Constructing the mailto link with encoded URI components for safety
    const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
    
    // Opening the user's default email client
    window.location.href = mailtoLink;
    
    // Resetting the form fields after generating the email
    document.getElementById('contactForm').reset();
}