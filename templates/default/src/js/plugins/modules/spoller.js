import { SpollerAnimation } from "./spoller-animation";

//TODO: Аккордион работает не корректно. Нужно починить.
// Памятка: аккордион - система блоков, в которой открытие нового блока закрывает предыдущий открытый блок
// споллер - каждый блок открывается/закрывается независимо от других
export class Spoller extends SpollerAnimation {
    constructor(selector, options) {
        super();
        // Настройки по-умолчанию
        const _defaults = {
            duration: 500, // Продолжительность анимации.
            makeSpollerActive: true, // Добавляет блоку контейнеру класс active.
            makeToggleBtnActive: true, // Добавляет кнопке переключения класс active.
            makeContentActive: false, // Добавляет блоку с контентом (анимируемый блок) класс active.
            isAccordion: false, // Делает аккордион (при открытии одного споллера другой закрывается).
            displayProperty: "block", // Задает значения свойства display для блока с контентом после открытия.
            toggleTextBtn: "", // Меняет текст кнопки переключения на указанный.
            selectorToggleBtn: ".js-spoller-toggle-btn", // Можно передать свой класс кнопке переключения.
            selectorContent: ".js-spoller-content", // Можно передать свой класс блоку с контентом.
        };
        Object.assign(this, _defaults, options ?? {});

        this.selector = selector; // Блок контейнер, в котором лежит споллер. Используется для инициализации.
        if (!this.selector) {
            console.error(new Error("Элемент-контейнер не передан"));
            return;
        }
        this.fuse = true;
        this.spollerList = [];
        this._init();
    }
    _init() {
        this._findItems();
        for (const spoller of this.spollerList) {
            spoller.addEventListener("click", (e) => {
                if (e.target.closest(this.selectorToggleBtn) && this.fuse) {
                    this.fuse = false;

                    const toggleBtn = spoller.querySelector(this.selectorToggleBtn);
                    const content = spoller.querySelector(this.selectorContent);

                    if (this.isAccordion) {
                        this._makeAccordion(spoller);
                    }

                    if (this.toggleTextBtn) {
                        this._changeButtonText(toggleBtn);
                    }

                    const classToggleTargetsMap = new Map([
                        [this.makeSpollerActive, spoller],
                        [this.makeToggleBtnActive, toggleBtn],
                        [this.makeContentActive, content],
                    ]);

                    for (const [conditionProperty, elem] of classToggleTargetsMap) {
                        this._toggleClass(conditionProperty, elem);
                    }

                    this.slideToggle(content, this.duration, this.displayProperty);

                    this._timeout();
                }
            });
        }
    }

    _findItems() {
        this.spollerList = [...document.querySelectorAll(this.selector)];
    }

    _timeout() {
        setTimeout(() => {
            this.fuse = true;
        }, this.duration);
    }

    _toggleClass(condition, element, className = "active") {
        if (condition) {
            element.classList.toggle(className);
        }
    }

    _removeClass(element, className = "active") {
        element.classList.remove(className);
    }

    _makeAccordion(currentSpoller) {
        for (const spoller of this.spollerList) {
            if (currentSpoller != spoller) {
                const toggleBtn = spoller.querySelector(this.selectorToggleBtn);
                const content = spoller.querySelector(this.selectorContent);

                const removeClasesClip = [spoller, toggleBtn, content];
                for (const elem of removeClasesClip) {
                    this._removeClass(elem);
                }

                this.slideUp(content, this.duration);
            }
        }
    }

    _changeButtonText(element) {
        if (element.dataset.value) {
            const safe = element.textContent;
            element.textContent = element.dataset.value;
            element.dataset.value = safe;
        } else {
            element.dataset.value = element.textContent;
            element.textContent = this.toggleTextBtn;
        }
    }
}
