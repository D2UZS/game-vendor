# Описание компонента

Это компонент добавления карты.

## Настройки

### "additionalClasses"

Принимает строку, где указаны дополнительные классы через пробел.

### "modifs"

Принимает массив с модификаторами компонента.
Пока модификаторов нет.

### "elems"

Принимает объект, в котором ключами являются названия элементов этого компонента, а значениями являются настройки этих элементов.

#### "elems.btn"

Элемент кнопки.
Принимает объект с настройками. Подробнее см. app-button.njk
По умолчанию:
{
"modifs": [],
"text": "Add card"
}