/**
 * ReBloom - Landing Page Application Logic (index.html)
 * Pure vanilla ES6+ JavaScript enforcing strict snake_case identifiers.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Language Switcher Controller (index.html)
  // ==========================================
  const lang_buttons = document.querySelectorAll(".lang_switch .lang_btn");
  if (lang_buttons.length > 0) {
    lang_buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        lang_buttons.forEach((other_btn) => other_btn.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // ==========================================
  // 2. Navbar Scroll Spy (index.html)
  // ==========================================
  const nav_sections = document.querySelectorAll("section[id]");
  const nav_links = document.querySelectorAll(".nav_link");

  if (nav_sections.length > 0 && nav_links.length > 0) {
    window.addEventListener("scroll", () => {
      let current_section_id = "";
      const scroll_position = window.scrollY + 200;

      nav_sections.forEach((section) => {
        const section_top = section.offsetTop;
        const section_height = section.offsetHeight;

        if (
          scroll_position >= section_top &&
          scroll_position < section_top + section_height
        ) {
          current_section_id = section.getAttribute("id");
        }
      });

      nav_links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current_section_id}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // ==========================================
  // 3. FAQ Accordion Controller (index.html)
  // ==========================================
  const faq_items = document.querySelectorAll(".faq_item");
  if (faq_items.length > 0) {
    faq_items.forEach((item) => {
      const q_header = item.querySelector(".faq_q");
      const q_icon = item.querySelector(".faq_icon");

      if (!q_header) return;

      q_header.addEventListener("click", () => {
        const is_active = item.classList.contains("active");

        // Close all open sibling items
        faq_items.forEach((other_item) => {
          other_item.classList.remove("active");
          const other_icon = other_item.querySelector(".faq_icon");
          if (other_icon) {
            other_icon.className = "fa-solid fa-chevron-right faq_icon";
          }
        });

        // Toggle selected item
        if (!is_active) {
          item.classList.add("active");
          if (q_icon) {
            q_icon.className = "fa-solid fa-chevron-up faq_icon";
          }
        }
      });
    });
  }

  // ==========================================
  // 4. Static Contact Form Handler (index.html)
  // ==========================================
  const contact_form = document.getElementById("contact_form");
  if (contact_form) {
    contact_form.addEventListener("submit", (submit_event) => {
      submit_event.preventDefault();
      alert("Thank you for contacting ReBloom! We will get back to you shortly.");
      contact_form.reset();
    });
  }
});
