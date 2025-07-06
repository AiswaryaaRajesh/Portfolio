// ✅ Preloader
// window.addEventListener('load', () => {
//     const preload = document.getElementById("preloader");
//     if (preload) {
//         preload.classList.add('preload-finish');
//         console.log("✅ Preloader finished.");
//     } else {
//         console.warn("⚠️ Preloader element not found.");
//     }
// });

// ✅ Sidepanel Functions
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

// ✅ Navbar 'active' class toggle on click
document.querySelectorAll(".nav-link").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".nav-link").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        console.log(`✅ Activated nav link: ${this.textContent}`);
    });
});

// ✅ Auto-Update Nav-links on Scroll
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    function activateNavLink(sectionId) {
        removeActiveClasses();
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
            localStorage.setItem("activeNav", sectionId);
            console.log(`📌 Section in view: #${sectionId}`);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateNavLink(entry.target.getAttribute("id"));
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

    const savedActive = localStorage.getItem("activeNav");
    if (savedActive) {
        activateNavLink(savedActive);
        console.log(`🔁 Restored nav state from localStorage: ${savedActive}`);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            localStorage.setItem("activeNav", this.getAttribute("href").substring(1));
            removeActiveClasses();
            this.classList.add("active");
            console.log(`🔗 Nav link manually clicked: ${this.textContent}`);
        });
    });
});

// ✅ Timeline Scroll Animation
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


// Section visibility only on scroll

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


// Overlay for data analytics projects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const overlayId = card.getAttribute('data-overlay');
    const overlay = document.getElementById(overlayId);

    if (overlay) {
      overlay.classList.add('show');
    //   document.body.classList.add('no-scroll');
      document.querySelector('.bda-projects-blur-wrapper')?.classList.add('blur');
    }
  });
});

document.querySelectorAll('.close-overlay').forEach(btn => {
  btn.addEventListener('click', () => {
    const overlay = btn.closest('.project-overlay');
    if (overlay) {
      overlay.classList.remove('show');
    //   document.body.classList.remove('no-scroll');
      document.querySelector('.bda-projects-blur-wrapper')?.classList.remove('blur');
    }
  });
});


// Debug
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const overlayId = card.getAttribute('data-overlay');
    const overlay = document.getElementById(overlayId);

    if (overlay) {
      overlay.classList.add('show');
    //   document.body.classList.add('no-scroll');
    } else {
      console.error("Overlay not found for:", overlayId);
    }
  });
});
