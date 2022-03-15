import Choices from "choices.js";

// Стандартный селект
const baseSelects = document.querySelectorAll(".js-choices");
for (const select of baseSelects) {
    new Choices(select, {
        searchEnabled: false, // поле для поиска. включено по дефолту
        searchPlaceholderValue: "Поиск", // плейсхолдер для поля поиска
        // placeholder: true,
        // removeItemButton: true,
        // itemSelectText: "", // Текст, который отображается, когда пользователь наводит курсор на выбранный вариант. При включении этой настройки нужно добавить padding-right у селектора .choices__list--dropdown .choices__item--selectable в файле select.scss
    });
}
