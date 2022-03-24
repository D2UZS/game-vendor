// Этот класс позволяет убирать скролл у body, при этом нивелирует скачок контента, который происходит из-за скрытия полосы прокрутки.
// Используется, например при открытии попапа.
// Для работы необходимо, что бы весь контент был обернут в блок с классом "wrapper".
// Так же в стилях должен быть подготовленный класс "disable-scroll".
// Если на странице есть элементы с зафиксированным позиционированием, то таким элементам необходимо добавить класс "js-fix-el".

export class ScrollControl {
    constructor() {
        this.body = document.body;
        this.wrapper = document.querySelector(".wrapper");
        if (!this.wrapper) return;
        this.classDisableScroll = "disable-scroll";
        this.pagePosition = null;
        this.paddingRight = `${window.innerWidth - this.wrapper.offsetWidth}px`;
        this.fixedElements = document.querySelectorAll(".js-fix-el");
    }

    disableScroll() {
        this._paddingRightControl(this.paddingRight);

        this.pagePosition = window.scrollY;
        this.body.classList.add(this.classDisableScroll);
        this.body.dataset.position = this.pagePosition;
        this.body.style.top = `${-this.pagePosition}px`;
    }

    enableScroll() {
        this._paddingRightControl("");

        this.pagePosition = parseInt(this.body.dataset.position, 10);
        this.body.style.top = "auto";
        this.body.classList.remove(this.classDisableScroll);
        window.scroll({ top: this.pagePosition, left: 0 });
        this.body.removeAttribute("data-position");
    }

    _paddingRightControl(paddingRight) {
        if (this.fixedElements.length) {
            for (const el of this.fixedElements) {
                el.style.paddingRight = paddingRight;
            }
        }
        this.body.style.paddingRight = paddingRight;
    }
}
