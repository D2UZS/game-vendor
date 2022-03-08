import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import rangePlugin from "flatpickr/dist/plugins/rangePlugin.js";

// ========== инициализация простых дат ==========
flatpickr(".js-flatpickr", {
    dateFormat: "d-m-Y",
    locale: Russian, // locale for this instance only
});

// ========== инициализация диапазонов дат ==========
const dateRanges = document.querySelectorAll(".date-range");
if (dateRanges.length > 0) {
    for (const dateRange of dateRanges) {
        const fromDate = dateRange.querySelector("[data-from]");
        const toDate = dateRange.querySelector("[data-to]");

        flatpickr(fromDate, {
            plugins: [new rangePlugin({ input: toDate })],
            dateFormat: "d-m-Y",
            locale: Russian, // locale for this instance only
        });
    }
}
