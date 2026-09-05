function initWayfarerPromo() {
  // Replace this array with your own image URLs.
  const images = [
    "https://picsum.photos/id/1015/900/600",
    "https://picsum.photos/id/1025/900/600",
    "https://picsum.photos/id/1035/900/600",
    "https://picsum.photos/id/1045/900/600",
    "https://picsum.photos/id/1055/900/600"
  ];

  let currentIndex = 0;

  const promoDialog = document.getElementById("promoDialog");
  const promoCloseBtn = document.getElementById("promoCloseBtn");
  const mainImage = document.getElementById("galleryMainImage");
  const dotsWrap = document.getElementById("galleryDots");
  const prevBtn = document.getElementById("galleryPrevBtn");
  const nextBtn = document.getElementById("galleryNextBtn");

  // Bail out quietly if the dialog markup isn't on this page (or not yet rendered)
  if (!promoDialog || !dotsWrap || !mainImage || !prevBtn || !nextBtn || !promoCloseBtn) {
    console.warn("Wayfarer promo: expected elements not found in the DOM.");
    return;
  }

  // Build the dot navigation once
  images.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Go to image " + (i + 1));
    dot.addEventListener("click", () => showImage(i));
    dotsWrap.appendChild(dot);
  });

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    mainImage.src = images[currentIndex];
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  promoCloseBtn.addEventListener("click", () => promoDialog.close());
  promoDialog.addEventListener("click", (e) => {
    if (e.target === promoDialog) promoDialog.close();
  });
  promoDialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  // Open the dialog automatically once everything above is wired up
  showImage(0);
  promoDialog.showModal();
  promoCloseBtn.blur();
}

// Wait for the DOM to be ready before touching it. If this script is loaded
// with `defer` (recommended) the DOM is already parsed and this fires
// immediately; if it's loaded in <head> without defer/async, this waits
// for the rest of the page — including the dialog markup — to be ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWayfarerPromo);
} else {
  initWayfarerPromo();
}