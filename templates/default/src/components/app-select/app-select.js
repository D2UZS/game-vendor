import SlimSelect from "slim-select";

const selects = document.querySelectorAll(".js-slim-select");
for (const select of selects) {
    if (select.hasAttribute("id")) {
        const selectId = select.id;
        new SlimSelect({
            select: `#${selectId}`,
            closeOnSelect: false,
        });
    } else {
        console.log("Для элемента не указан id, slim-select не инициализирован.");
    }
}

// const el = document.querySelector("#select-category");
// el.slim.selected() // Will return a string or an array of string values
