class PageHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div>📌 Encabezado de la Página</div>`;
    }
}
customElements.define('page-header', PageHeader);
