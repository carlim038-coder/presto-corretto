fetch('./annunci.json')
.then((response) => response.json())
.then((data) => {
    console.log(data);

    let radiowrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#annunciContainer');

    // Variabile per tenere traccia della categoria attualmente selezionata
    let selectedCategory = 'all';

    // 1. Funzione per creare i radio button delle categorie
    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        let uniqueCategories = new Set(categories);

        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.className = "form-check";
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            `;
            radiowrapper.appendChild(div);
        });
    }

    radioCreate();

    // 2. Funzione per mostrare le card nel DOM
    function showCards(array) {
        cardWrapper.innerHTML = '';

        array.forEach((annuncio) => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', 'mb-4');
            div.innerHTML = `
                <div class="card bg-black text-yellow border border-warning h-100 p-3">
                    <p class="h2">${annuncio.name}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead">Prezzo: € ${annuncio.price}</p>
                    <a href="#" class="btn btn-warning fw-bold mt-auto">Dettagli</a>
                </div>
            `;
            cardWrapper.appendChild(div);
        });
    }

    // Mostra tutte le card all'avvio
    showCards(data);

    // Funzione centrale che restituisce i dati filtrati per categoria e ordinati per prezzo
    function filterAndSort() {
        let currentData = [];

        // 1. Filtra per categoria
        if (selectedCategory === 'all') {
            currentData = [...data];
        } else {
            currentData = data.filter((annuncio) => annuncio.category === selectedCategory);
        }

        // 2. Controlla quale radio del prezzo è attivo e ordina di conseguenza
        let priceAscBtn = document.querySelector('#priceAsc');
        let priceDescBtn = document.querySelector('#priceDesc');

        if (priceAscBtn.checked) {
            currentData.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (priceDescBtn.checked) {
            currentData.sort((a, b) => Number(b.price) - Number(a.price));
        }

        // Mostra a schermo il risultato combinato
        showCards(currentData);
    }

    // 3. Gestione del cambio categoria tramite i radio button
    let radios = document.querySelectorAll('input[name="categories"]');

    radios.forEach((radio) => {
        radio.addEventListener('change', () => {
            if (radio.id === 'flexRadioDefault1') {
                selectedCategory = 'all';
            } else {
                selectedCategory = radio.id;
            }
            // Aggiorna la visualizzazione mantenendo attivo l'eventuale filtro prezzo
            filterAndSort();
        });
    });

    // 4. Gestione dei radio button del prezzo
    let priceAscBtn = document.querySelector('#priceAsc');
    let priceDescBtn = document.querySelector('#priceDesc');

    priceAscBtn.addEventListener('change', () => {
        if (priceAscBtn.checked) {
            filterAndSort();
        }
    });

    priceDescBtn.addEventListener('change', () => {
        if (priceDescBtn.checked) {
            filterAndSort();
        }
    });

});