// Magnus Archives GM Tool - Tab System

function initializeTabSystem() {
  console.log("Initializing tab system...");

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  console.log(`Found ${tabButtons.length} tab buttons`);
  console.log(`Found ${tabContents.length} tab contents`);

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");
      console.log(`Switching to tab: ${targetTab}`);

      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.style.display = "none";
      });

      // Show target tab content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
        targetContent.style.display = "block";
        console.log(`✓ Switched to ${targetTab} tab`);
      } else {
        console.error(`✗ Tab content not found: ${targetTab}`);
      }
    });
  });

  // Make sure first tab is active on load
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
    tabContents[0].style.display = "block";
    console.log("✓ Tab system initialized");
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeTabSystem();
});
