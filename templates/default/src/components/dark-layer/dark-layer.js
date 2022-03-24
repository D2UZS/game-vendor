export class DarkLayer {
    constructor() {
        this.elemClass = "dark-layer";
        this.elem = document.querySelector(`.${this.elemClass}`);
        if (!this.elem) {
            console.log(`ERROR: Не найден элемент ${this.elemClass}`);
        }

        this.classActive = `${this.elemClass}--active`;
    }

    activate() {
        this.elem.classList.add(this.classActive);
    }

    deactivate() {
        this.elem.classList.remove(this.classActive);
    }
}
