
// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Gallery item click handling
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // CUSTOMIZE: Add your image modal or navigation logic here
        console.log('Gallery item clicked:', this.textContent);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality

let currentSlide = 0;
modalSlides = document.getElementById("modalSlides");

function openModal(slideIndex = 0) {
  document.getElementById("designModal").style.display = "block";
  showSlide(slideIndex);
    console.log("Modal opened");
}

function closeModal() {
  document.getElementById("designModal").style.display = "none";
  console.log("Modal closed");
}

function openMultiModal(slideIndex = 0) {
  document.getElementById("multiModal").style.display = "block";
  showSlide(slideIndex);
    console.log("Multi Modal opened");
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

function showSlide(n) {
  let slides = document.querySelectorAll(".scroll-container");
  if (n >= slides.length) { n = 1; } 
  if (n < 0) { n = slides.length - 1; }
  slides.forEach(slide => slide.style.display = "none");
  slides[n].style.display = "block";
  currentSlide = n;
}


function closeMultiModal() {
  document.getElementById("multiModal").style.display = "none";
  console.log("Multi Modal closed");
}

// Close when clicking outside modal-content
const modal = document.getElementById("designModal");
const multimodal = document.getElementById("multiModal");
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
  if (event.target === multimodal) {
    closeMultiModal();
  }
});

// Close on ESC key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
    closeMultiModal();
  }
});