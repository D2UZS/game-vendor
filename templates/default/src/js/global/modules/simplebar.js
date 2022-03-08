import SimpleBar from "simplebar";

const simplebars = document.querySelectorAll(".js-simplebar");

if (simplebars.length) {
    for (const simplebar of simplebars) {
        const elemBar = new SimpleBar(simplebar, {});
        simplebar.addEventListener("columnResize", () => {
            elemBar.recalculate();
        });
    }
}
