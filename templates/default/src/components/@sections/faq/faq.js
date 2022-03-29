import { Spoller } from "../../../js/spoller";

class FaqAccordions {
    constructor() {
        this.elem = document.querySelector(".js-faq-accordions");
        if (!this.elem) {
            console.error(new Error("Элемент '.js-faq-accordions' не найден"));
            return;
        }
        this.spollers = [];
        this.selectorSpoller = ".faq__accordion";
        this.selectorSpollerBtn = ".faq__accordion-title";
        this.selectorSpollerContent = ".faq__accordion-content";
        this._init();
    }

    _init() {
        this.spollers = this.elem.querySelectorAll(this.selectorSpoller);
        if (this.spollers.length) {
            this.spollers.forEach((spoller) => {
                new Spoller(spoller, this.selectorSpollerBtn, this.selectorSpollerContent);
            });
        }
    }
}

new FaqAccordions();
