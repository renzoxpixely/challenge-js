class MainContent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div>📄 Contenido Principal</div>`;
    }
}
customElements.define('main-content', MainContent);
