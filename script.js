document.addEventListener("DOMContentLoaded", function () {
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Check stored theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });

    // Smooth scrolling for project page links
    if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
            setTimeout(() => {
                section.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    }

    // Smooth transition when switching pages
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", function (e) {
            e.preventDefault();
            const projectId = this.getAttribute("data-project");

            // Fade out current page
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = `projects.html#${projectId}`;
            }, 300); // Delay to match fade-out transition
        });
    });

    // Smooth fade-in effect when arriving on a new page
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease-in-out";
        document.body.style.opacity = "1";
    }, 100);

    // Smooth scroll within projects.html
    if (window.location.pathname.includes("projects.html")) {
        document.querySelectorAll("section").forEach(section => {
            section.style.scrollMarginTop = "80px"; // Adds space to prevent hidden headers
        });

        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }, 500); // Give enough time for the page to fade in
            }
        }
    }

    // Scroll Animations: Sections fade in and out when scrolled into and out of view
    const sections = document.querySelectorAll("section");

    const fadeInOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            } else {
                entry.target.style.opacity = "0";
                entry.target.style.transform = "translateY(30px)";
            }
        });
    }, {
        threshold: 0.2 // Trigger animation when 20% of the section is visible
    });

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        fadeInOnScroll.observe(section);
    });
});
