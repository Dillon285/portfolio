// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

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
let slideIndexes = {}

function openModal(modalId, slideIndex = 0) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
  document.body.classList.add('modal-open');
  console.log(`Opening modal: ${modalId} at slide ${slideIndex}`);

  slideIndexes[modalId] = slideIndex;
  showSlide(modalId, slideIndex);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
  document.body.classList.remove('modal-open');
}


function changeSlide(modalId, n) {
  slideIndexes[modalId] += n;
  showSlide(modalId, slideIndexes[modalId]);
}

function showSlide(modalId, n) {
  const slides = document.getElementById(modalId).querySelectorAll(".slide");

  if (slides.length === 0) return;

  if (n >= slides.length) slideIndexes[modalId] = 0;
  if (n < 0) slideIndexes[modalId] = slides.length - 1;

  slides.forEach(slide => slide.style.display = "none");
  slides[slideIndexes[modalId]].style.display = "block";

  const prevBtn = document.getElementById(modalId).querySelector(".prev");
  const nextBtn = document.getElementById(modalId).querySelector(".next");
  if (prevBtn && nextBtn) {
    const show = slides.length > 1 ? "block" : "none";
    prevBtn.style.display = show;
    nextBtn.style.display = show;
  }
}


// Close when clicking outside modal-content
window.addEventListener("click", function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.classList.remove('modal-open');
  }
});

// Close on ESC key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => (modal.style.display = "none"));
    document.body.classList.remove('modal-open');
  }
});