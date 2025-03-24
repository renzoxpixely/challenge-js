class PageFooter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div>🔻 Pie de Página</div>`;
    }
}
customElements.define('page-footer', PageFooter);
