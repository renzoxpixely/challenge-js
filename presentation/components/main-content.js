import { fetchCountries } from "../../data/datasource/fetch-countries.js";

class MainContent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div>📄 Contenido Principal</div>`;
    }

    async connectedCallback() {
        const countries = await fetchCountries();
        this.renderCountries(countries);
    }

    renderCountries(countries) {
        this.innerHTML = `
            <div>
                <h2>Lista de Países</h2>
                <ul>
                    ${countries.map(country => `<li>${country.name.common}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

customElements.define('main-content', MainContent);