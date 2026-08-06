fetch('./annunci.json')
.then((response) => response.json())
.then((data) => {
    console.log("Dati caricati correttamente:", data);

    let radiowrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#annunciContainer');
    let wordInput = document.querySelector('#wordInput');
    let priceAscBtn = document.querySelector('#priceAsc');
    let priceDescBtn = document.querySelector('#priceDesc');

    // 1. Funzione per creare i radio button delle categorie dinamicamente
    function radioCreate() {
        if (!radiowrapper) return;

        radiowrapper.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="categories" id="all" checked>
                <label class="form-check-label" for="all">
                    Tutti
                </label>
            </div>
        `;

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

        // Agganciamo subito gli event listener ai radio button appena creati
        let radioButtons = document.querySelectorAll('.form-check-input[name="categories"]');
        radioButtons.forEach((button) => {
            button.addEventListener('change', () => {
                globalFilter();
            });
        });
    }

    radioCreate();

    // 2. Funzione per mostrare le card nel DOM (con sfondo giallo e testo nero)
    function showCards(array) {
        if (!cardWrapper) return;
        cardWrapper.innerHTML = '';

        if (array.length === 0) {
            cardWrapper.innerHTML = `<p class="text-center h4 text-warning">Nessun annuncio trovato.</p>`;
            return;
        }

        array.forEach((annuncio) => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', 'mb-4');
            div.innerHTML = `
                <div class="card p-4 h-100 d-flex flex-column justify-content-between text-center">
                    <p class="h2 fw-bold">${annuncio.name}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead fw-bold">${annuncio.price} €</p>
                </div>
            `;
            cardWrapper.appendChild(div);
        });
    }

    // Mostra tutte le card all'avvio
    showCards(data);

    // --- FUNZIONI DI FILTRAGGIO E ORDINAMENTO ---

    // A. Filtro per Categoria
    function filterByCategory(array) {
        let radioButtons = document.querySelectorAll('.form-check-input[name="categories"]');
        let checkedRadio = Array.from(radioButtons).find((bottone) => bottone.checked);
        let categoria = checkedRadio ? checkedRadio.id.toLowerCase() : 'all';

        if (categoria !== 'all') {
            let filtered = array.filter((annuncio) => annuncio.category.toLowerCase() === categoria);
            return filtered;
        } else {
            return array;
        }
    }

    // B. Filtro per Parola Chiave
    function filterByWord(array) {
        if (wordInput && wordInput.value.trim() !== '') {
            let filtered = array.filter((annuncio) => 
                annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())
            );
            return filtered;
        } else {
            return array;
        }
    }

    // C. Ordinamento per Prezzo
    function sortByPrice(array) {
        let sortedArray = [...array];

        if (priceAscBtn && priceAscBtn.checked) {
            sortedArray.sort((a, b) => Number(a.price) - Number(b.price));
            return sortedArray;
        } else if (priceDescBtn && priceDescBtn.checked) {
            sortedArray.sort((a, b) => Number(b.price) - Number(a.price));
            return sortedArray;
        } else {
            return sortedArray;
        }
    }

    // D. Funzione Globale di Concatenazione
    function globalFilter() {
        let filteredByCategory = filterByCategory(data); 
        let filteredByWord = filterByWord(filteredByCategory); 
        let sortedByPrice = sortByPrice(filteredByWord); 

        showCards(sortedByPrice);
    }

    // 4. Attivazione degli Event Listener per Ricerca e Prezzi
    if (wordInput) {
        wordInput.addEventListener('input', () => {
            globalFilter();
        });
    }

    if (priceAscBtn) {
        priceAscBtn.addEventListener('change', () => {
            globalFilter();
        });
    }

    if (priceDescBtn) {
        priceDescBtn.addEventListener('change', () => {
            globalFilter();
        });
    }

})
.catch((error) => console.error("Errore nel caricamento del file JSON:", error));