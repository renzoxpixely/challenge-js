class TopBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div>🔝 Barra Superior</div>`;
    }
}
customElements.define('top-bar', TopBar);
