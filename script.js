// ✅ Preloader handler
// Fade out the preloader when the page loads
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preload-finish");
      console.log("✅ Preloader faded out.");
    }, 300); // Optional delay for smoother effect
  }
});

// ✅ Sidepanel Functions -------------------------------------------------------------------------------------------------------
function openNav() {
    const panel = document.getElementById("mySidepanel");
    if (panel) {
        panel.style.width = "80%";
        console.log("✅ Sidepanel opened.");
    } else {
        console.warn("⚠️ Sidepanel not found.");
    }
}

function closeNav() {
    const panel = document.getElementById("mySidepanel");
    if (panel) {
        panel.style.width = "0";
        console.log("✅ Sidepanel closed.");
    } else {
        console.warn("⚠️ Sidepanel not found.");
    }
}

// HEADER ------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let lastSectionId = null;

  function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove("active"));
  }

  function activateNavLink(sectionId) {
    if (sectionId === lastSectionId) return; // ✅ Prevent redundant calls
    lastSectionId = sectionId;

    removeActiveClasses();
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
      localStorage.setItem("activeNav", sectionId);
      console.log(`✅ Activated nav link (via scroll): #${sectionId}`);
    }
  }

  const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            activateNavLink(id);
        }
        });
    },
    {
        threshold: 0.3, // Trigger earlier
    }
    );


  sections.forEach(section => {
    observer.observe(section);
  });

  // ✅ Restore saved nav on load (optional)
  const savedActive = localStorage.getItem("activeNav");
  if (savedActive) {
    activateNavLink(savedActive);
    console.log(`🔁 Restored nav state from localStorage: #${savedActive}`);
  }

  // ✅ Nav Click Highlight (manual)
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetId = this.getAttribute("href").substring(1);
      localStorage.setItem("activeNav", targetId);
      removeActiveClasses();
      this.classList.add("active");
      lastSectionId = targetId;
      console.log(`🔗 Nav link manually clicked: #${targetId}`);
    });
  });
});



// ✅ Timeline Scroll Animation -------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("🌀 Timeline animation script initialized.");

    const timelineItems = document.querySelectorAll(".timeline_item");
    console.log("🧩 Found timeline items:", timelineItems.length);

    function updateScrollAnimations() {
        const centerY = window.innerHeight / 2;
        const isSmallScreen = window.innerWidth < 768;

        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemHeight = rect.height;
            const itemTop = rect.top;

            const circle = item.querySelector(".timeline_circle");
            const dateText = item.querySelector(".timeline_date-text");

            let progress = (centerY - itemTop) / (itemHeight - 100);
            progress = Math.max(0, Math.min(progress, 1));

            const translateY = progress * (itemHeight - 60);

            if (circle) {
                circle.style.transform = `translateY(${translateY}px)`;
            } else {
                console.warn("⚠️ .timeline_circle not found in an item.");
            }

            if (dateText) {
                if (!isSmallScreen) {
                    dateText.style.transform = `translateY(${translateY}px)`;
                } else {
                    dateText.style.transform = "none";
                }
            } else {
                console.warn("⚠️ .timeline_date-text not found in an item.");
            }
        });

        requestAnimationFrame(updateScrollAnimations);
    }

    requestAnimationFrame(updateScrollAnimations);
});


// Section visibility only on scroll -------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in-section");

    const options = {
        threshold: 0.1,
    };

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
        } else {
            entry.target.classList.remove("fade-in-visible");
        }
        });
    }, options);

    faders.forEach(el => {
        appearOnScroll.observe(el);
    });
});


document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const overlayId = card.getAttribute('data-overlay');
    const overlay = document.getElementById(overlayId);

    const blurWrapper = card.closest('.bda-projects-blur-wrapper') || card.closest('.ml-projects-blur-wrapper');

    if (overlay) {
      overlay.classList.add('show');
      blurWrapper?.classList.add('blur');
    } else {
      console.error("Overlay not found for:", overlayId);
    }
  });
});

// CLOSE overlay Projects on close button click -------------------------------------------------------------------------------------------------------
document.querySelectorAll('.close-overlay').forEach(btn => {
  btn.addEventListener('click', () => {
    const overlay = btn.closest('.project-overlay');

    // Find the correct wrapper from the section containing the overlay
    const section = overlay.closest('section');
    const blurWrapper = section?.querySelector('.bda-projects-blur-wrapper, .ml-projects-blur-wrapper');

    if (overlay) {
      overlay.classList.remove('show');
      blurWrapper?.classList.remove('blur');
    }
  });
});

// Carousel Digital Art -------------------------------------------------------------------------------------------------------
// Open carousel modal on clicking .dig-art
document.querySelector('.dig-art').addEventListener('click', () => {
document.getElementById('artCarouselModal').classList.add('show');
});

// Close carousel modal
document.querySelector('.close-art-modal').addEventListener('click', () => {
document.getElementById('artCarouselModal').classList.remove('show');
});


// Footer Current Year -------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.querySelector(".footer-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

