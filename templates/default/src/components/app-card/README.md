# Описание компонента

Это компонент это компонент карты. У нее есть много настроек, о которых читай ниже.

## Настройки

### "additionalClasses"

Принимает строку, где указаны дополнительные классы через пробел.

### "modifs"

Принимает массив с модификаторами компонента.
Пока модификаторов нет.

### "elems"

Принимает объект, в котором ключами являются названия элементов этого компонента, а значениями являются настройки этих элементов.

#### "elems.simplePicture"

Принимает объект с настройками. Подробнее см. simple-picture.njk
По умолчанию:
{
"imagePath": "images/simple-picture/",
"imageName": "img",
"imageType": "jpg",
"hasMobileVersion": true
}

#### "elems.categoryBadge"

Принимает объект с настройками. Подробнее см. category-badge.njk
По умолчанию:
{
"modifs": ['shooter'],
"text": "Shooter"
}

#### "elems.title"

Принимает строку с названием.
По умолчанию:
"Call of Duty: Warzone"

#### "elems.appRating"

Принимает объект с настройками. Подробнее см. app-rating.njk
По умолчанию:
{
"amountStars": 4.5,
"votes": "9,199"
},

#### "elems.description"

Принимает строку с описанием.
По умолчанию:
"Get the Captain Price Operator included with purchase"

#### "elems.appPrice"

Принимает объект с настройками. Подробнее см. app-price.njk
По умолчанию:
{
"oldPrice": "1,299",
"actualPrice": "649"
}

#### "elems.saleBadge"

Принимает объект с настройками. Подробнее см. sale-badge.njk
По умолчанию:
{
"text": "-50%"
}
