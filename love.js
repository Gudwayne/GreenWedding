// Countdown date
// const weddingDate = new Date("Nov 30, 2024 00:00:00").getTime();

// // Update the countdown every 1 second
// const countdownInterval = setInterval(function () {
//     // Get today's date and time
//     const now = new Date().getTime();

//     // difference between now and the wedding date
//     const timeLeft = weddingDate - now;

//     // calculations for days, hours, minutes, and seconds
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     // Display the result in the countdown element
//     document.getElementById("countdown").innerHTML =
//         days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";

//     // some text when countdown is finished
//     if (timeLeft < 0) {
//         clearInterval(countdownInterval);
//         document.getElementById("countdown").innerHTML = "The wedding day is here!";
//     }
// }, 1000);

function startCountdown(endDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        flip('days', days);
        flip('hours', hours);
        flip('minutes', minutes);
        flip('seconds', seconds);
    }

    function flip(id, newValue) {
        const card = document.getElementById(id);
        const currentValue = parseInt(card.querySelector('.flip-card-front').textContent, 10);

        if (newValue !== currentValue) {
            const flipInner = card.querySelector('.flip-card-inner');
            card.querySelector('.flip-card-back').textContent = newValue < 10 ? '0' + newValue : newValue;
            flipInner.classList.add('flipped');
            setTimeout(() => {
                card.querySelector('.flip-card-front').textContent = newValue < 10 ? '0' + newValue : newValue;
                flipInner.classList.remove('flipped');
            }, 1000);
        }
    }

    const interval = setInterval(updateCountdown, 1000);
}

const weddingDate = new Date('2024-11-30T00:00:00').getTime();
startCountdown(weddingDate);



// Slide Show Functions
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

// Automatic slide
function showSlides() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlidePosition();
    setTimeout(showSlides, 10000); // Change slide every 3 seconds
}

// Manual slide navigation
function moveSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlidePosition();
}

// Update the slide position
function updateSlidePosition() {
    slides.style.transform = 'translateX(' + (-slideIndex * 100) + '%)';
    updateDots();
}

// Update dot indicators
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === slideIndex) {
            dot.classList.add('active');
        }
    });
}

// Set the current slide
function currentSlide(n) {
    slideIndex = n - 1;
    updateSlidePosition();
}

// Start the slideshow
showSlides();