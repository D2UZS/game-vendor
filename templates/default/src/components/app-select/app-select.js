// Документация на плагин http://slimselectjs.com/options
import SlimSelect from "slim-select";

const selects = document.querySelectorAll(".js-slim-select");

for (const select of selects) {
    if (select.hasAttribute("id")) {
        const selectId = select.id;
        if (select.hasAttribute("multiple")) {
            // инициализируем селекты с множественным выбором
            new SlimSelect({
                select: `#${selectId}`, // id элемента select
                closeOnSelect: false, // не закрывает селект при выборе элемента
                allowDeselectOption: true, // позволяет отменить выбор элемента
                // Дописал сам. Если выбранные элементы не убираются в контейнер, то они скрываются и появляется бейдж с колличеством скрытых элементов. Не работает, если при при инициализации много выбранных элементов((
                onChange() {
                    const values = this.slim.multiSelected.values;
                    const valuesChildren = values.children;

                    // После каждого изменения чистим, что сделали после предыдущего изменения
                    for (const value of valuesChildren) {
                        value.classList.remove("visually-hidden");
                        if (value.classList.contains("additional")) {
                            value.remove();
                        }
                    }

                    if (values.scrollWidth > values.clientWidth) {
                        // Создаем бейдж
                        const additionalEl = values.lastElementChild.cloneNode(true);
                        const additionalElText = additionalEl.querySelector(".ss-value-text");
                        additionalElText.textContent = "+99"; // +99 - заглушка, потом будем менять на колличество скрытых бейджев.
                        additionalEl.classList.add("additional");
                        values.append(additionalEl);

                        let hiddenEl = 0;
                        for (
                            let i = valuesChildren.length - 2;
                            values.scrollWidth > values.clientWidth;
                            i--
                        ) {
                            hiddenEl++;
                            const element = valuesChildren[i];
                            element.classList.add("visually-hidden");
                        }
                        additionalElText.textContent = `+${hiddenEl}`;
                    }
                },
            });
        } else {
            // инициализируем одиночные селекты
            new SlimSelect({
                select: `#${selectId}`, // id элемента select
                showSearch: false, // убирает поиск
                hideSelectedOption: true, // не показывает элемент, который уже выбран
            });
        }
    } else {
        console.log("Для элемента не указан id, slim-select не инициализирован.");
    }
}
