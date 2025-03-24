class BottomBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div>🔚 Barra Inferior</div>`;
    }
}
customElements.define('bottom-bar', BottomBar);
