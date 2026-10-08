// Theme initialization script - runs before React hydration
(function () {
  try {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Set default theme on first visit
    if (theme === null) {
      localStorage.setItem("theme", "light");
    }
  } catch {
    // Silently fail if localStorage is not available
  }
})();
