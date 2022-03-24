import { DarkLayer } from "../dark-layer/dark-layer";
import { ScrollControl } from "../../js/plugins/modules/scroll-control";

const darkLayer = new DarkLayer();
const scrollControl = new ScrollControl();

class AppPopup {
    constructor() {
        this.popupClass = "app-popup";
        this.popupActiveClass = `${this.popupClass}--active`;
        this.popupSelector = `.js-${this.popupClass}`;
        this.closeBtnSelector = `.${this.popupClass}__close-btn`;

        this.unlocked = true;
        this.lockTime = "400"; // === времени продолжительности анимации открытия popup
        this.activePopup = null;
        this.currentPopup = null;

        this.appPopup = null;
        this.appPopups = document.querySelectorAll(this.popupSelector);

        this._init();
    }

    _init() {
        this._findActivePopup();
        this._autoClose();
        this._closeByEsc();
    }

    popupOpen(item) {
        scrollControl.disableScroll();
        this._findActivePopup();
        if (this.activePopup) {
            this.popupСlose(this.activePopup);
        }

        this.currentPopup = document.querySelector(item);
        if (this.currentPopup && this.unlocked) {
            this.appPopup = this.currentPopup.closest(this.popupSelector);
            if (this.appPopup) {
                darkLayer.activate();
                this.appPopup.classList.add(this.popupActiveClass);
            }
        }

        this._freeze();
    }

    popupСlose(item) {
        setTimeout(() => {
            scrollControl.enableScroll();
        }, this.lockTime);

        if (this.unlocked) {
            if (!item) {
                for (const popup of this.appPopups) {
                    popup.classList.remove(this.popupActiveClass);
                    darkLayer.deactivate();
                }
            } else {
                item.classList.remove(this.popupActiveClass);
                darkLayer.deactivate();
            }
        }
    }

    _autoClose() {
        for (const popup of this.appPopups) {
            popup.addEventListener("click", (e) => {
                if (
                    (e.target.closest(this.closeBtnSelector) ||
                        e.target.classList.contains(this.popupSelector.slice(1))) &&
                    this.unlocked
                ) {
                    this.popupСlose(popup);
                }
            });
        }
    }

    _closeByEsc() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                this.popupСlose();
            }
        });
    }

    _findActivePopup() {
        this.activePopup = document.querySelector(`.${this.popupActiveClass}`);
    }

    _freeze() {
        this.unlocked = false;
        setTimeout(() => {
            this.unlocked = true;
        }, this.lockTime);
    }
}

const appPopup = new AppPopup();

const popupBtns = document.querySelectorAll(".js-popup-btn");
for (const popupbtn of popupBtns) {
    popupbtn.addEventListener("click", (e) => {
        const item = popupbtn.getAttribute("href");
        appPopup.popupOpen(item);

        e.preventDefault();
    });
}
