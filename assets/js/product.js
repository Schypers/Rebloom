// --- Product Gallery Thumbnail Image Swapper ---
const main_img = document.getElementById("prod_main_img");
const thumb_items = document.querySelectorAll(".prod_thumb");

if (main_img && thumb_items.length > 0) {
  thumb_items.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const thumb_img = thumb.querySelector(".prod_thumb_img");
      if (!thumb_img) return;

      const current_main_src = main_img.getAttribute("src");
      const current_thumb_src = thumb_img.getAttribute("src");
      const current_main_alt = main_img.getAttribute("alt");
      const current_thumb_alt = thumb_img.getAttribute("alt");

      // Smooth fade transition
      main_img.style.opacity = "0.3";
      setTimeout(() => {
        main_img.setAttribute("src", current_thumb_src);
        main_img.setAttribute("alt", current_thumb_alt);
        thumb_img.setAttribute("src", current_main_src);
        thumb_img.setAttribute("alt", current_main_alt);
        main_img.style.opacity = "1";
      }, 150);
    });
  });
}
