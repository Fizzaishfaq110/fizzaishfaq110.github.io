// Get navbar and back to top button elements
const navbar = document.querySelector('#navsec');
const backToTop = document.querySelector("#backTop");

// toggle the back to top button visibility
function toggleBackToTop() {
    backToTop.style.visibility = window.scrollY >= 500 ? "visible" : "hidden";
}

// Event listener for scrolling to change navbar style
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('blur');
    } else {
        navbar.classList.remove('blur');
    }

    toggleBackToTop();
});

// Smooth scrolling for navigation links
document.querySelectorAll('#navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId.startsWith('#')) {
            e.preventDefault(); // Prevent default action
            const targetElement = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Back to top 
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// READ MORE 
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', function () {
        const additionalInfo = this.previousElementSibling;
        if (additionalInfo.style.display === 'none' || additionalInfo.style.display === '') {
            additionalInfo.style.display = 'inline';
            this.textContent = 'Read Less';
        } else {
            additionalInfo.style.display = 'none';
            this.textContent = 'Read More..';
        }
    });
});

//media query  nav button
const mobButton = document.querySelector(".mobile");
const navList = document.querySelector("#navbar ul");

const toggleMenu = () => {
    navList.classList.toggle("responsive");
}
mobButton.addEventListener("click", toggleMenu)

const navItems = navList.querySelectorAll("li a");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navList.classList.remove("responsive");
    });
});