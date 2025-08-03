// ✅ Preloader handler -------------------------------------------------------------------------------------------------------
// Fade out the preloader when the page loads (after all assets like images are loaded)
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preload-finish");
      console.log("✅ Preloader faded out.");
    }, 300); // Optional delay for smoother effect
  }
});


// ✅ DOM-Ready Scripts -------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM fully loaded");

  // 🔹 Sidepanel Functions
  window.openNav = function () {
    const panel = document.getElementById("mySidepanel");
    if (panel) {
      panel.style.width = "80%";
      console.log("✅ Sidepanel opened.");
    } else {
      console.warn("⚠️ Sidepanel not found.");
    }
  };

  window.closeNav = function () {
    const panel = document.getElementById("mySidepanel");
    if (panel) {
      panel.style.width = "0";
      console.log("✅ Sidepanel closed.");
    } else {
      console.warn("⚠️ Sidepanel not found.");
    }
  };

  // 🔹 Header Section Scroll Highlight
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let lastSectionId = null;

  function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove("active"));
  }

  function activateNavLink(sectionId) {
    if (sectionId === lastSectionId) return;
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
    { threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));

  const savedActive = localStorage.getItem("activeNav");
  if (savedActive) {
    activateNavLink(savedActive);
    console.log(`🔁 Restored nav state from localStorage: #${savedActive}`);
  }

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


  // 🔹 Timeline Scroll Animation
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
        dateText.style.transform = !isSmallScreen ? `translateY(${translateY}px)` : "none";
      } else {
        console.warn("⚠️ .timeline_date-text not found in an item.");
      }
    });

    requestAnimationFrame(updateScrollAnimations);
  }

  requestAnimationFrame(updateScrollAnimations);


  // 🔹 Fade-in Section on Scroll
  const faders = document.querySelectorAll(".fade-in-section");
  const appearOnScroll = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("fade-in-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );

  faders.forEach(el => appearOnScroll.observe(el));


  // 🔹 Overlay: Open
  const projectCards = document.querySelectorAll(".project-card");
  if (projectCards.length > 0) {
    projectCards.forEach(card => {
      card.addEventListener("click", () => {
        const overlayId = card.getAttribute("data-overlay");
        const overlay = document.getElementById(overlayId);

        const blurWrapper =
          card.closest(".bda-projects-blur-wrapper") || card.closest(".ml-projects-blur-wrapper");

        if (overlay) {
          overlay.classList.add("show");
          blurWrapper?.classList.add("blur");
          if (blurWrapper?.id) {
            overlay.setAttribute("data-blur-wrapper", blurWrapper.id);
          }
        } else {
          console.error("Overlay not found for:", overlayId);
        }
      });
    });
  }

  // 🔹 Overlay: Close
  const closeBtns = document.querySelectorAll(".close-overlay");
  if (closeBtns.length > 0) {
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const overlay = btn.closest(".project-overlay");
        const blurWrapperId = overlay?.getAttribute("data-blur-wrapper");
        const blurWrapper = blurWrapperId ? document.getElementById(blurWrapperId) : null;

        if (overlay) {
          overlay.classList.remove("show");
          blurWrapper?.classList.remove("blur");
        }
      });
    });
  }

  // 🔹 Carousel Digital Art
  const digArtBtn = document.querySelector(".dig-art");
  const closeArtModalBtn = document.querySelector(".close-art-modal");

  if (digArtBtn) {
    digArtBtn.addEventListener("click", () => {
      const modal = document.getElementById("artCarouselModal");
      if (modal) modal.classList.add("show");
    });
  }

  if (closeArtModalBtn) {
    closeArtModalBtn.addEventListener("click", () => {
      const modal = document.getElementById("artCarouselModal");
      if (modal) modal.classList.remove("show");
    });
  }

  // 🔹 Footer Year
  const yearSpan = document.querySelector(".footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
