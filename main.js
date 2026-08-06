// --- 1. Gestione Navbar allo Scroll ---
let navbar = document.querySelector('.navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');

if (navbar && logoNavbar) {
    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;

        if (scrolled > 0) {
            navbar.classList.add('navbar-scrolled');
            logoNavbar.src = './media/logo nero.png';
        } else {
            navbar.classList.remove('navbar-scrolled');
            logoNavbar.src = './media/logo giallo.png';
        }
    });
}

// --- 2. Numeri incrementali e Intersection Observer ---
let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");

let confirmCheck = false;

setTimeout(() => {
    confirmCheck = true;
}, 1000);

function createInterval(n, element, time) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < n) {
            counter++;
            if(element) {
                element.innerHTML = counter;
            }
        } else {
            clearInterval(interval);
        }
    }, time);
}

let triggerElement = document.querySelector("#firstNumber");
if (triggerElement) {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && confirmCheck) {
                createInterval(100, firstNumber, 100);
                createInterval(200, secondNumber, 50);
                createInterval(300, thirdNumber, 30);
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(triggerElement);
}

// --- 3. Inizializzazione Swiper ---
let swiperContainer = document.querySelector('.swiper');
if (swiperContainer) {
    var swiper = new Swiper('.swiper', {
        effect: 'flip',
        grabCursor: true,
    });
}

// --- 4. Gestione Recensioni e Stelline Dinamiche ---
let reviews = [
    { name: "Recensione 1", text: "il più bel sito del mondo!", stars: 5 },
    { name: "Recensione 2", text: "Lorem ipsum dolor sit amet.", stars: 4 },
    { name: "Recensione 3", text: "Lorem ipsum dolor sit amet.", stars: 3 }
];

let allReviewsCards = document.querySelectorAll('.card-review');
if (allReviewsCards.length > 0) {
    allReviewsCards.forEach((card, index) => {
        let starsContainer = card.querySelector('.stars');
        
        if (starsContainer) {
            starsContainer.innerHTML = ''; 
            let reviewData = reviews[index];
            if (reviewData) {
                for (let i = 1; i <= reviewData.stars; i++) {
                    let icon = document.createElement("i");
                    icon.className = "fa-solid fa-star text-warning";
                    starsContainer.appendChild(icon);
                }
            }
        }
    });
}

// --- 5. Effetto apertura cerchi Chi Siamo ---
let opener = document.querySelector('.opener');
let movedDivs = document.querySelectorAll('.moved');

let check = false;

opener.addEventListener('click', ()=> {
    if(check == false) {
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((moved, i)=> {
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px)`;
        });
        check = true;
    } else {
        opener.style.transform = 'rotate(0deg)';
        movedDivs.forEach((moved)=> {
            moved.style.transform = `rotate(0deg) translate(0px)`;
        });
        check = false;
    }
});