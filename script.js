    // Filtering
    const buttons = document.querySelectorAll("[data-filter]");
    const images = document.querySelectorAll(".imageGallery img");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        buttons.forEach(b => b.classList.remove("active-button"));
        btn.classList.add("active-button");

        images.forEach(img => {
          const category = img.getAttribute("data-category");
          img.style.display = (filter === "all" || category === filter) ? "block" : "none";
        });
      });
    });

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    let currentIndex = 0;

    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
      });
    });

    function showImage() {
      lightbox.classList.add("active");
      const visibleImages = Array.from(images).filter(img => img.style.display !== "none");
      const actualImg = visibleImages[currentIndex];
      lightboxImg.src = actualImg.src;
    }

    function navigate(direction) {
      const visibleImages = Array.from(images).filter(img => img.style.display !== "none");
      currentIndex = (currentIndex + direction + visibleImages.length) % visibleImages.length;
      lightboxImg.src = visibleImages[currentIndex].src;
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
    }

    // Close on outside click
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });