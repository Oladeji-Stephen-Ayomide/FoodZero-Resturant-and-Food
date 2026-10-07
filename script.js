// JavaScript Core Logic
// Key name used for browser storage
const STORAGE_KEY = "countdown_target_timestamp";

// 1. Check if a deadline was already saved in this browser
let savedTimestamp = localStorage.getItem(STORAGE_KEY);
let targetTimestamp;

if (savedTimestamp) {
    // Use the existing deadline
    targetTimestamp = parseInt(savedTimestamp, 10);
} else {
    // Create a brand new deadline: 2 months, 3 days, 21 hours, 35 minutes, 60 seconds from right now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 64);
    targetDate.setHours(targetDate.getHours() + 21);
    targetDate.setMinutes(targetDate.getMinutes() + 35);
    targetDate.setSeconds(targetDate.getSeconds() + 60);

    targetTimestamp = targetDate.getTime();

    // Save it to localStorage so it persists across refreshes
    localStorage.setItem(STORAGE_KEY, targetTimestamp)
}

// 2. Initialize and loop the timer interval
const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = targetTimestamp - now;

    // 3. Time calculation metrics
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Pad numbers with leading zeroes (e.g. 7 becomes "07")
    const formatTime = (num) => String(num).padStart(2, '0');

    // Helper function to cleanly inject values into HTML
    const updateElement = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = formatTime(val >= 0 ? val : 0);
    };

    // Update the Bootstrap template elements
    updateElement("bs-days", days);
    updateElement("bs-hours", hours);
    updateElement("bs-minutes", minutes);
    updateElement("bs-seconds", seconds);

    // 4. Handle countdown expiration
    if (timeDifference < 0) {
        clearInterval(countdownTimer);

        // Remove the stored timestamp so a new one generates if they reload after finishing
        localStorage.removeItem(STORAGE_KEY);

        alert("The countdown has ended!");
    }
}, 1000);



/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}




let currentPage = 1;
const totalPages = 3; // Total number of custom content blocks you created

function changePage(target) {
    // Determine target page index value
    if (target === 'prev') {
        if (currentPage > 1) currentPage--;
    } else if (target === 'next') {
        if (currentPage < totalPages) currentPage++;
    } else {
        currentPage = target;
    }

    // 1. Hide all blog page elements and show only the target page
    document.querySelectorAll('.blog-page-group').forEach(group => {
        group.classList.add('d-none');
    });
    document.getElementById(`blog-page-${currentPage}`).classList.remove('d-none');

    // 2. Clear old 'active' states on the numerical buttons and highlight the target element
    document.querySelectorAll('.page-num').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('.page-link');
        if (link) link.className = "page-link text-dark border-dark px-3 py-2 rounded-0";
    });

    const activeItem = document.querySelector(`.page-num[data-page="${currentPage}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        const activeLink = activeItem.querySelector('.page-link');
        if (activeLink) activeLink.className = "page-link bg-dark text-white border-dark px-3 py-2 rounded-0";
    }

    // 3. Disable/Enable visibility flags on your Edge Navigation elements
    document.getElementById('prev-btn').classList.toggle('disabled', currentPage === 1);
    document.getElementById('next-btn').classList.toggle('disabled', currentPage === totalPages);
}

// Run pagination logic on start to establish structural edge buttons layout tracking state
document.addEventListener("DOMContentLoaded", () => {
    changePage(1);
});
