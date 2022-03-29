import { SpollerAnimation } from "./spoller-animation";

export class Spoller extends SpollerAnimation {
    constructor(elem, selectorBtn, selectorContent, options) {
        super();
        this.elem = elem;
        this.btn = this.elem.querySelector(selectorBtn);
        this.content = this.elem.querySelector(selectorContent);

        if (!this.elem) {
            console.error(new Error("Элемент споллера не передан"));
            return;
        }
        if (!this.btn) {
            console.error(new Error("Селектор кнопки споллера не передан"));
            return;
        }
        if (!this.content) {
            console.error(new Error("Селектор контента споллера не передан"));
            return;
        }

        // Настройки по-умолчанию
        const _defaults = {
            duration: 500,
            valueDisplay: "block",
        };

        Object.assign(this, _defaults, options ?? {});

        this.unlocked = true;
        this._init();
    }

    _init() {
        if (!this.elem.classList.contains("js-open")) {
            this.slideUp(this.content, this.duration);
        }

        this._toggle();
    }

    _toggle() {
        this.btn.addEventListener("click", () => {
            if (this.unlocked) {
                this.slideToggle(this.content, this.duration, this.valueDisplay);
                this.elem.classList.toggle("js-open");
                this._freeze();
            }
        });
    }

    _freeze() {
        this.unlocked = false;
        setTimeout(() => {
            this.unlocked = true;
        }, this.duration);
    }
}
