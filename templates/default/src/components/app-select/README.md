# Описание компонента

Это компонент кастомного селекта. Плагин slim-select. Сайт http://slimselectjs.com .
Можно добавлять селект как с одиночным выбором, так и с мультивыбором.
По умолчанию в библиотеке slim-select в мультиселекте выбранные значения при недостатке места переносились на новую строчку, из-за этого селект увеличивался по высоте.
Я его доработал, что бы значения, которые не убераются, скрывались и вместо них показывалась надпись, сколько их скрыто.
Если при инициализации у селекта будет много выбранных значений, то эта функция не сработает. Не убравшиеся значения будут обрезаться. При первом изменении значений все заработает.

## Настройки

### "additionalClasses"

Принимает строку, где указаны дополнительные классы через пробел.

### "modifs"

Принимает массив с модификаторами компонента.
Модификаторов пока нет.

### id

Принимает строку. Это id селекта. Является обязательным, т.к. по нему инициализируется селект.

### optionData

Принимает массив с объектами. Каждый объект это набор настроект для option.
По умолчанию:
[
{
"value": "value 1"
}, {
"value": "value 2"
}, {
"value": "value 3"
}
]
Помимо "value" - текст для option, есть настройка "isSelected" - этому option добавиться атрибут "selected".

### placeholder

Принимает строку. Если установить, то появится "placeholder".

### isMultiple

Принимает true или false.
true - селект с множественным выбором.
false - по умолчанию обычный селект.
