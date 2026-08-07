// ---Gestione Navbar allo Scroll ---
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

// --- Numeri incrementali e Intersection Observer ---
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

// --- Gestione Recensioni, Stelline Dinamiche e Swiper Orizzontale ---
let reviews = [
    { user: 'Matteo', description: 'Il piu` bel sito di annunci del mondo', rank: 5 },
    { user: 'Alin', description: 'Veramente non mi da di niente', rank: 1 },
    { user: 'Michael', description: 'Mi piace tranne per Star Trek', rank: 3 },
    { user: 'Arina', description: 'Star Wars e` meglio!', rank: 5 }
];

let swiperWrapper = document.querySelector('.swiper-wrapper');

if (swiperWrapper) {
    reviews.forEach((recensione) => {
        let div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <div class="card-review">
                <p class="lead text-center">${recensione.description}</p>
                <p class="h4 text-center">${recensione.user}</p>
                <div class="d-flex justify-content-center star"></div>
            </div>
        `;
        swiperWrapper.appendChild(div);
    });
}

// ---Generazione dinamica delle stelline in base al rank
let stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
    for (let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }
});

// ---Inizializzazione Swiper Orizzontale (1 alla volta)
let swiperContainer = document.querySelector('.swiper');
if (swiperContainer) {
    var swiper = new Swiper('.swiper', {
        // Rimosso 'direction: vertical' per farlo andare in orizzontale
        effect: 'slide', // Effetto di scorrimento orizzontale standard (o 'fade' / 'cube' se preferisci)
        grabCursor: true,
        slidesPerView: 1, // Mostra una sola recensione alla volta
        spaceBetween: 30, // Spazio tra le slide
        loop: true,       // Fa ricominciare il giro delle recensioni all'infinito
        
        //  (autoplay)
        
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        
    });

    // ---Effetto hover per passare alla slide successiva al passaggio del mouse
    let allSlides = document.querySelectorAll('.swiper-slide');
    allSlides.forEach((slide) => {
        slide.addEventListener('mouseenter', () => {
            swiper.slideNext();
        });
    });
}

// --- Effetto apertura cerchi Chi Siamo e generazione Docenti ---

let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');


let teachers = [
    { name: 'Matteo', description: 'Curriculum Vitae di Matteo:\nDocente Frontend con 5 anni di esperienza nello sviluppo di interfacce web avanzate e SPA.', url: './media/Matteo.png' },
    { name: 'Angela', description: 'Curriculum Vitae di Angela:\nEsperta di Project Management e Agile methodologies, coordina i team di sviluppo.', url: './media/Angela.png' },
    { name: 'Marco', description: 'Curriculum Vitae di Marco:\nLead Developer e responsabile didattico dell\'Hackademy, specializzato in JavaScript e React.', url: './media/Marco.jpg' },
    { name: 'Giancarlo', description: 'Curriculum Vitae di Giancarlo:\nArchitetto Backend e Database Administrator, appassionato di sicurezza informatica.', url: './media/Giancarlo.png' }
];

if (circle && opener) {
    teachers.forEach((docente) => {
        let div = document.createElement('div');
        div.classList.add('moved');
        div.style.backgroundImage = `url(${docente.url})`;
        
        // Al click sul singolo docente, aggiorna la flip card e forza la rotazione della card
        div.addEventListener('click', () => {
            let backName = document.querySelector('#backName');
            let backDescription = document.querySelector('#backDescription');
            let innerBack = document.querySelector('#cardBack');
            let flipCardInner = document.querySelector('#flipCardInner');

            if (backName && backDescription && innerBack) {
                backName.innerHTML = docente.name;
                backDescription.innerHTML = docente.description;
                // Imposta la foto come sfondo completo del retro
                innerBack.style.backgroundImage = `url(${docente.url})`;
            }

            // Attiva l'effetto di rotazione della flip card via JS per mostrarla subito
            if (flipCardInner) {
                flipCardInner.style.transform = 'rotateY(180deg)';
            }
        });

        circle.appendChild(div);
    });

    let movedDivs = document.querySelectorAll('.moved');
    let check = false;

    opener.addEventListener('click', () => {
        let flipCardInner = document.querySelector('#flipCardInner');
        
        if (check == false) {
            opener.style.transform = 'rotate(45deg)';
            movedDivs.forEach((moved, i) => {
                let angle = (360 * i) / movedDivs.length;
                moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
            });
            check = true;
        } else {
            check = false;
            opener.style.transform = '';
            movedDivs.forEach((moved, i) => {
                moved.style.transform = '';
            });
            // Riporta la card sul fronte se chiudi i cerchi
            if (flipCardInner) {
                flipCardInner.style.transform = 'rotateY(0deg)';
            }
        }
    });
}