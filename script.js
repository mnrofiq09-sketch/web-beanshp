/* =========================================
   BEAN SHOP - MULTI PAGE JAVASCRIPT
========================================= */
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");

    // Menu mobile
    if (header && navbar) {
        const menuButton = document.createElement("button");
        menuButton.className = "menu-toggle";
        menuButton.innerHTML = "&#9776;";
        menuButton.setAttribute("aria-label", "Buka menu");
        menuButton.setAttribute("aria-expanded", "false");
        header.appendChild(menuButton);

        menuButton.addEventListener("click", function () {
            navbar.classList.toggle("active");
            const menuOpen = navbar.classList.contains("active");
            menuButton.innerHTML = menuOpen ? "&times;" : "&#9776;";
            menuButton.setAttribute("aria-expanded", String(menuOpen));
            menuButton.setAttribute("aria-label", menuOpen ? "Tutup menu" : "Buka menu");
        });

        navbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
                menuButton.innerHTML = "&#9776;";
                menuButton.setAttribute("aria-expanded", "false");
            });
        });

        // Tandai halaman yang sedang dibuka
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        navbar.querySelectorAll("a[data-page]").forEach(function (link) {
            link.classList.toggle("active", link.dataset.page === currentPage);
        });

        window.addEventListener("scroll", function () {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // Filter kategori produk dan dukungan tautan langsung (produk.html#streaming)
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const categorySections = document.querySelectorAll(".product-category[data-category-section]");

    if (filterButtons.length && categorySections.length) {
        function applyProductFilter(category) {
            const validCategory = ["streaming", "editing", "lainnya"].includes(category)
                ? category
                : "semua";

            filterButtons.forEach(function (button) {
                button.classList.toggle("active", button.dataset.filter === validCategory);
            });

            categorySections.forEach(function (section) {
                const shouldShow = validCategory === "semua" ||
                    section.dataset.categorySection === validCategory;
                section.classList.toggle("hide", !shouldShow);
            });
        }

        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                applyProductFilter(button.dataset.filter);
            });
        });

        // Jika halaman dibuka dari tombol Layanan, aktifkan kategori sesuai URL hash.
        const requestedCategory = window.location.hash.replace("#", "").toLowerCase();
        if (["streaming", "editing", "lainnya"].includes(requestedCategory)) {
            applyProductFilter(requestedCategory);
            // Beri waktu browser menata ulang halaman setelah kategori lain disembunyikan.
            requestAnimationFrame(function () {
                const targetSection = document.getElementById(requestedCategory);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        } else {
            applyProductFilter("semua");
        }
    }

    // Tanya produk melalui WhatsApp
    document.querySelectorAll(".order-link").forEach(function (link) {
        const productName = link.dataset.product;
        const message = "Halo Bean Shop, saya ingin bertanya mengenai produk " +
            productName + ". Apakah produk tersebut masih tersedia?";
        link.href = "https://wa.me/6282298443455?text=" + encodeURIComponent(message);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    // Animasi saat elemen masuk layar
    const revealElements = document.querySelectorAll(
        ".hero-content, .hero-image, .section-title, .service-card, " +
        ".product-card, .advantage-container > div, .contact, footer"
    );

    revealElements.forEach(element => element.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("active"));
    }

    // Tombol kembali ke atas
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.innerHTML = "↑";
    topButton.setAttribute("aria-label", "Kembali ke atas");
    document.body.appendChild(topButton);

    window.addEventListener("scroll", function () {
        topButton.classList.toggle("show", window.scrollY > 400);
    });

    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Tahun copyright otomatis
    const footerText = document.querySelector("footer p");
    if (footerText) {
        footerText.textContent = "© " + new Date().getFullYear() +
            " Bean Shop. All Rights Reserved.";
    }
});
