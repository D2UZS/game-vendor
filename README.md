# Frontend

## Начало работы

-   Установить node.js <https://nodejs.org/en/>
-   Установить python <https://www.python.org/downloads/>
-   Для комфортной работы рекомендую установить расширения из вкладки @recommended вашего VsCode
-   Из командной строки установить глобально `npm i -g gulp-cli`
-   Заходим в папку где проект и там запускаем команду из командной строки `npm install`
-   Вводим в командную строку npm run prepare

---

После у нас есть три команды:

`npm run serve` - обычный режим разработки. Запускает сервер и watch,<br>
`npm run cross` - режим разработки с начальным запуском компиляторов,<br>
`npm run build` - режим production. Очищает dist и рекомпилирует все файлы.

---

**Перед началом работы нужно ознакомиться с документацией nunjucks <https://mozilla.github.io/nunjucks/>**

## Порядок объявления стилей

Придерживайтесь его, чтобы сохранить единообразие кода

```
/* Переменные и экстенды */
@extend .clean-list;
$padding-vertical: 40px;
--gap: 24px;

/* Свойства, без которых стили бесполезны */
content: ""; // Псевдоэлемент не появится без этого свойства

/* Позиционирование */
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 100;

/* Блочная модель */
display: block;
float: right;
width: 100px;
height: 100px;

/* Типографика */
color: #333;
font-size: 13px;
line-height: 1.5;
text-align: center;

/* Отображение */
background-color: #f5f5f5;
border: 1px solid #e5e5e5;
border-radius: 3px;
opacity: 1;

/* Прочее */
cursor: pointer;
```

## Модификаторы

Для создания классов-модификаторов используем nunjucks-переменные в макросе.

### Имена переменных

-   Для модификатора всего блока используется массив modifs.
-   Для модификаторов элементов блока используются переменные, имя которых состоит из двух частей: имя элемента + Мodifs.

При вызове макроса в эти переменные передается массив с именами модификаторов
(только той части, которая идет после `--`).
Макрос modifierGenerator принимает имя класса (для которого нужно добавить модификатор) и переменную. На выходе получается строка из классов-модификаторов.
Прежде чем создавать новый модификатор, нужно посмотреть список "Готовые модификаторы" в начале компонента или шаблона.
Если вы создали новый модификатор, то нужно занести его в "Готовые модификаторы".

Примеры:

1. Для блока с классом "block-link" нужно создать класс-модификатор, который на мобилке перестраивает вид блока с вертикального на горизонтальный.
   Будем использовать переменную modifs, в которую при вызове будем передавать имя модификатора ["mob-horizontal"], на выходе мы получим полное имя класса-модификатора "block-link--mob-horizontal".

2. Для элемента блока с классом "block-link**text" нужно создать класс-модификатор, который будет перекрашивать цвет фона.
   Будем использовать переменную textModifs, в которую при вызове будем передавать имя модификатора ["bg-secondary"], на выходе мы получим полное имя класса-модификатора "block-link**text--bg-secondary".

---

**?** Как выбрать, изменять элемент по вложенности или создавать для него отдельный класс-модификатор:

Если класс-модификатор элемента может быть использован вне контекста (например, перекраска фона не зависит от того, перестраивается блок или нет), то создаем его отдельно.

Если класс-модификатор зависимый (например, мы перестраиваем блок в горизонтальный, поэтому у элемента нужно уменьшить padding, иначе он не помещается), то изменяем элемент по вложенности в класс-модификатор блока.

---

## Работа с цветом

В файле colors.scss в переменных указаны цвета. При написании стилей, необходимо пользоваться этими переменными.

## Работа с изображениями

Для оптимизации изображений используется плагин gulp-imagemin и фремворк lazysizes, поэтому у картинок в разметке может не быть атрибута src. Вместо него будет указан атрибут data-src. Сам src будет добавлен позже скриптом.

Для того, чтобы изображение стало "ленивым", ему нужно добавить класс lazyload.
По-умолчанию изображения используются в .png или .jpg/.jpeg, в зависимости от условий, так как контент загружает этот формат. Далее на бэке с этих изображений генерируется webp. Использовать только webp нельзя, так как он не поддерживается Safari
Некоторые (если не все) изображения представлены сразу в двух или трех разрешениях, чтобы они одинаково хорошо выглядили на всех типов экранов

## Вертикальный ритм

## Файловая структура

Если блок или элемент реиспользуемый (элемент реиспользуемый в контексте этого блока. Например, повторяющийся элемент списка, который можно вывести циклом), он должен быть в отдельной папке или подпапке.

Нельзя копировать верстку из одного блока в другой или влиять на стили блока извне
Все подобные манипуляции происходят через import/macro nunjucks с добавлением класса элемента или глобальных переменных (в очень редких случаях)

## Работа с макросами

-   В макросе все переменные мы передаем через объект opts
-   Для указания динамических данных, создайте json-файл (например, вам нужно создать 10 элементов списка. Вы создаете json-файл с объектом, равным имени родительского файла. В нем создате вложенный объект, если он нужен, или указываете массив элементов прямо в объекте-родителе. В .njk-файле вы сможете перебрать этот json-объект и вывести каждый элемент массива или обратиться к вложенному свойству объекта)
-   Для получаемых элементов в цикле предпочитетльно использовать item. Вы можете указывать что-то более осознанное, если это название вам не подходит (хорошо: for item in data / for article in data, плохо: for variable in data / for someItem in data)
-   Какие-то данные ? "пояснение" + data. Пример: "inputsData". Если данные единственные и понятны из контекста, то просто data тоже уместно. Но лучше пояснять
-   Путь к изображению? imagePath Если изображений несколько, то imagesPath
-   Имя изображения ? imageName
-   Тип изображения ? imageType

## Концепция проекта

-   Весь проект состоит из реиспользуемых компонентов.
-   Компоненты собираются в секции (src/components/sections).
-   Секции выводятся на страницы (src/pages).
-   Ссылки на страницы собираются на индексовой странице (src/pages/index.html).

### index.html

В index.html указаны ссылки на все страницы макете.
Если страница состоит из нескольких вариаций, то эти страницы группируются с помощью тега details.
Самой последней идет страничка Витрина компонентов (showcase.html). На ней представлены все компоненты данного проекта.

### Страницы

Их структура формируется с помощью шаблонов, которые лежат в src/components/@templates/ .
Во внутрь всегда инклюдятся секции (пример - `{% include "../components/sections/bookkeeping/variations/bookkeeping-page--motivation-hd.html" %}`).
Секции идут друг под другом.

### Компоненты

-   Компоненты - это структурные блоки, из которых собирается проект, как из кирпичиков.
-   Kаждый компонент лежит в своей папке по пути src/components/ .
-   Компоненты бывают простые (пример - кнопка-крестик) и сложные, состоящие из множества элементов и других компонентов.
-   Компоненты можно поделить на два типа: nunjucks-компоненты, стилевые компоненты.

#### nunjucks-компоненты

Cостоит из файлов .njk, .js, .scss, .json.

-   В файле .njk лежит html разметка компонента, в виде настраиваемого макроса nunjucks.
-   В файле .js лежат скрипты относящиеся только к этому компоненту.
-   В файле .scss лежат стили для этого компонента.
-   В файле .json лежат данные, с помощью которых заполняется компонент.

Если компонент сложный, то внутри папки компонента создается папка elems, внутри которой создаются папки с элементами компонента (название папок имеют вид \_\_name-elem). В них так же содержатся файлы .njk, .js, .scss, .json, которые относятся к элементу компонента.

Иногда в папке компонента создается папка variations. В ней создаются файлы .html (название файлов имеет вид component-name--variations-name.html) с готовыми вариантами компонента.

Иногда в папке компонента создается папка json, где собраны все файлы .json, которые используются для вариантов компонента.

Пример структуры nunjucks-компонента можно посмотреть в папке src/components/@AAA/example . Если вы создаете новый компонент, то можно скопировать папку example.

Использовать такой компонент можно двумя способами:

1. Через макрос - в нужный файл в верху импортируем макрос (пример - `{% from "input/input.njk" import input %}` ), в нужном месте вызываем макрос и передаем в него настройки (пример - `{{ input({placeholder: "Поиск модели...."}) }}` ).
2. Через include - в папке компонента создаем папку с вариациями, в ней создаем вариацию компонента с помощью способа 1, и уже эту вариацию через include добавляем в нужное место (пример - `{% include "../example/elems/__elem-one/__elem-one.html" %}` ).
   ВАЖНО УКАЗЫВАТЬ ПРАВИЛЬНО ПУТИ.

#### Cтилевые компоненты

Это простые компоненты, в которых есть только файл .scss . Пример - стандартные ссылки, кнопки.
Что бы использовать такой компонент нужно добавить элементу класс компонента (пример - `<button class="btn">Белая кнопка</button>`).

#### Подключение стилей компонента

Стили компонента нужно подключать вручную в нужном месте в файле src\styles\style.scss
Если компонент простой, и внутри только один файл стилей, то подключить его можно напрямую (@import "../components/components-name/components-name.scss";).
Если компонент сложный, и внутри несколько файлов стилей, то их нужно подключать через транзитный файл style.sccs в корне папки компонента (@import "../components/components-name/style.scss";), в который уже импортируются все остальные файлы стилей.

#### Подключение скриптов компонента

Файлы .js которые находятся внутри компонентов подключаются автоматически.