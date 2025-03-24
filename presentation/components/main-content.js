import { fetchCountries } from "../../data/datasource/fetch-countries.js";

class MainContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.countries = [];
    }

    async connectedCallback() {
        this.countries = await fetchCountries();
        this.renderCountries();
        this.setupModal();
    }

    renderCountries() {
        this.shadowRoot.innerHTML = `
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    padding: 20px;
                }
                .country-card {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                    background: white;
                    cursor: pointer;
                    transition: transform 0.3s ease-in-out;
                }
                .country-card:hover {
                    transform: scale(1.05);
                }
                .flag {
                    width: 100px;
                    height: auto;
                    border-radius: 5px;
                }
                /* Estilos del modal */
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 300px;
                    text-align: center;
                    position: relative;
                }
                .close {
                    cursor: pointer;
                    font-size: 20px;
                    position: absolute;
                    right: 10px;
                    top: 5px;
                }
            </style>
            <div class="grid-container">
                ${this.countries.map((country, index) => `
                    <div class="country-card" data-index="${index}">
                        <img class="flag" src="${country.flags.png}" alt="Flag of ${country.name.common}">
                        <h3>${country.name.common}</h3>
                    </div>
                `).join('')}
            </div>
            <div class="modal" id="countryModal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2 id="modal-title"></h2>
                    <p><strong>Continente:</strong> <span id="modal-continent"></span></p>
                </div>
            </div>
        `;

        this.shadowRoot.querySelectorAll('.country-card').forEach(card => {
            card.addEventListener('click', (event) => this.openModal(event));
        });
    }

    setupModal() {
        const modal = this.shadowRoot.getElementById('countryModal');
        const closeModal = this.shadowRoot.querySelector('.close');

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    openModal(event) {
        const index = event.currentTarget.getAttribute('data-index');
        const country = this.countries[index];

        const modal = this.shadowRoot.getElementById('countryModal');
        this.shadowRoot.getElementById('modal-title').textContent = country.name.common;
        this.shadowRoot.getElementById('modal-continent').textContent = country.continents[0];

        modal.style.display = 'flex';
    }
}

customElements.define("main-content", MainContent);
