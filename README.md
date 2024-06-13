# Проектная работа "Веб-ларёк"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами


## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```


## Сборка

```
npm run build
```

или

```
yarn build
```


## Данные и типы данных

Данные карточки товара

```
interface IProduct {
  id: string;
  description?: string;
  image?: string;
  title?: string;
  category?: string;
  price: number;
  selected?: boolean;
}
```

Данные заказа пользователя

```
interface IOrder {
  payment: 'online' | 'upon receipt';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
```


## Архитектура проекта

Код приложения разделён на слои согласно парадигме MVP:

- Model - слой данных, отвечает за хранение и изменение данных
- View - слой представления, отвечает за отображения данных на странице
- Presentor - презентор, отвечает за связь представления и данных


### Базовый код

#### Класс <span style="color:#993131">Api</span>

Содержит базовую логику отправки запросов. В конструктор передаётся базовый адрес сервера и опциональный объект с заголовками запросов.

Методы класса:
- `get` - выполняет `GET` запрос на переданный в параметрах эндпоинт и возвращает промис с объектом (ответ сервера)
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на эндпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределён через третий параметр при вызове.


#### Класс <span style="color:#993131">EventEmitter</span>

Брокер событий позволяет подписываться на события и отправлять события. Класс используется в презенторе для обработки событий и генерации событий.

Основные методы класса, реализуемые интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от
класса  EventEmitter.

Дополнительно реализованы методы:
- `off` - отписка от события
- `onAll` - подписка на все события
- `offAll` - сброс подписки от всех событий


#### Класс <span style="color:#993131">Component</span>

Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте. В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента и экземпляр брокера событий.

Метод класса:
- `render(data?: Partial<T>): HTMLElement` - отвечает за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновлённый контейнер компонента


### Слой данных (Model)

#### Класс <span style="color:#993131">AppData</span>

Класс отвечает за хранение и передачу данных приложения.
Конструктор класса принимает экземпляр брокера событий.

В полях класса хранятся следующие данные:
- `_cards: IProduct[]` - массив объектов карточек товаров
- `_payment: 'online' | 'upon receipt'` - способ оплаты
- `_email: string` - почта пользователя
- `_phone: string` - номер телефона пользователя
- `_address: string` - адрес пользователя
- `_total: number` - сумма товаров
- `_items: string[]` - массив из id заказанных товаров
- `_productsInBasket: IProduct[]` - массив товаров добавленных в корзину
- `_productsCounter: number | null` - количество товаров в корзине

Класс предоставляет набор методов для взаимодействия с данными:

- `resetOrderData(): void` - сбрасывает данные заказа
- `getCard(productId: string): IProduct` - возвращает карточку товара по её id
- `selectProduct(productId: string): void` - меняет состояние товара на выбран или не выбран пользователем
- `resetSelectProducts(): void` - сбрасывает состояние всех товаров на - не выбран
- `updateProductsInBasket(): void` - обновляет массив товаров добавленных в корзину и массив с их id
- `setTotal(): void` - считает общую сумму заказанных товаров
- `countProducts(): number | null` - счётчик товаров в корзине
- `checkValidationOrderForm(): boolean` - проверяет заполнены ли все поля формы заказа
- `checkValidationContactsForm(): boolean` - проверяет заполнены ли все поля формы контакты
- `validateOrderInputs()`: string - валидирует поля формы заказа
- `validateContactsInputs()`: string - валидирует поля формы контакты
- Геттеры и сеттеры для получения и сохранения данных из полей класса


### Слой представления (View)

#### 1. Класс <span style="color:#993131">Page</span>

Отвечает за отображение контента на главной странице. Устанавливает слушатель на кнопку с иконкой корзины для открытия корзины. В конструктор принимает контейнер и экземпляр брокера событий.

Поля класса:

- `_counter: HTMLElement` - элемент разметки с количеством товара в корзине
- `wrapper: HTMLElement` - элемент разметки с контейнером страницы
- `basket: HTMLElement` - кнопка открытия корзины

Методы класса:

- Сеттеры для установки данных в поля класса


#### 2. Класс <span style="color:#993131">Section</span>

Отвечает за отображение блока с карточками на главной странице. Через сеттер и родительский метод render рендерит каталог карточек на странице. В конструктор принимает контейнер, в котором размещаются карточки товара.


#### 3. Класс <span style="color:#993131">Card</span>
Отвечает за отображение карточки товара. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов вёрстки. Так же в конструктор принимает экземпляр брокера событий.

Поля класса:

- `cardId: string` - id товара
- `descriptionCardElement?: HTMLElement` - элемент разметки с описанием товара
- `imageCardElement?: HTMLImageElement` - элемент разметки с изображением товара
- `titleCardElement: HTMLElement` - элемент разметки с названием товара
- `categoryCardElement?: HTMLElement` - элемент разметки с категорией товара
- `priceCardElement: HTMLElement` - элемент разметки с ценой товара
- `button?: HTMLButtonElement` - кнопка добавления товара в корзину. Если в корзине выбранный товар уже есть, вместо кнопки добавления - кнопка удаления товара из корзины

Методы:

- Геттер `id` возвращает уникальный id карточки
- Сеттеры для установки данных в поля класса


#### 4. Класс <span style="color:#993131">Modal</span>

Класс реализует модальное окно. Предоставляет методы open и close для управления отображением модального окна. Устанавливает слушатели на клик в оверлей и кнопку-крестик для закрытия попапа.

- `constructor(templateElement: string, events: IEvents)` Конструктор принимает темплейт-элемент, которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса:
- `modal: HTMLElement` - элемент модального окна
- `events: IEvents` - брокер событий


#### 5. Класс <span style="color:#993131">Success</span>

Расширяет класс Modal. Предназначен для реализации модального окна успешно оформленного заказа. Устанавливает слушатель на дополнительную кнопку («За новыми покупками!») для закрытия окна. В конструктор принимает контейнер и экземпляр брокера событий.

Поля класса :

- `_description: HTMLElement` - элемент разметки с описанием списанной суммы заказа
- `button: HTMLButtonElement` - дополнительная кнопка закрытия

Методы:

- `сеттер description(value: number): number` - устанавливает сумму заказа в элементе разметки


#### 6. Класс <span style="color:#993131">Basket</span>

Расширяет класс Modal. Предназначен для реализации модального окна корзины. При оформлении заказа инициирует событие передавая в него объект с массивом товаров и суммой заказа. При изменении данных в полях ввода инициирует событие изменения данных. Устанавливает слушатель на кнопку продолжения («Оформить») для инициации события перехода. В конструктор принимает контейнер, в котором размещаются карточки товара и экземпляр брокера событий.

Поля класса:
 
- `_list: HTMLElement` - элемент разметки контейнер для товаров
- `_total: HTMLElement` - элемент разметки с суммой заказанных товаров
- `_button: HTMLButtonElement` - кнопка «Оформить» перехода в модальное окно с выбором способа оплаты и адреса доставки.

Методы класса:

- `updateIndex(): void` - обновляет номера товаров в списке
- `disableButton(): void` - делает кнопку «Оформить» не активной
- Сеттеры для установки данных в поля класса


#### 7. Класс <span style="color:#993131">ItemBasket</span>

Отвечает за отображение товара в корзине, задавая в товаре его номер в списке, названия и цены. В конструктор класса передаётся DOM элемент темплейта, что позволяет при необходимости формировать элемент товара в разных вариантов вёрстки. В конструктор принимает контейнер и экземпляр брокера событий.

Поля класса:
 
- `cardId: string` - id товара
- `_title: HTMLElement` - элемент разметки с названием товара
- `_index: HTMLElement` - элемент разметки с номером товара в списке корзины
- `_price: HTMLElement` - элемент разметки с ценой товара
- `_button: HTMLButtonElement` - кнопка удаления товара из корзины

Методы класса:

- Геттер `id` возвращает уникальный id карточки
- Сеттеры для установки данных в поля класса


#### 8. Класс <span style="color:#993131">Form</span>

Расширяет класс Modal. Является родительским классом для реализации модального окна с формой содержащей поля ввода. При сабмите инициирует событие передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки продолжения («Далее» или «Оплатить»). В конструктор принимает контейнер и экземпляр брокера событий.

Поля класса :

- `_errors: HTMLElement` - элемент разметки с ошибками валидации.
- `submitButton: HTMLButtonElement` - кнопка продолжения
- `form: HTMLFormElement` - элемент формы
- `formName: string` - значение атрибута name формы
- `inputs: NodeListOf<HTMLInputElement>` - коллекция всех полей ввода формы

Методы:

- `resetForm(): void` - сбрасывает значения полей формы
- `render(state: Partial<T> & IFormState): HTMLElement` - расширяет родительский метод для возможности передачи данных полей из дочерних классов вместе с данными формы
- Сеттеры для установки данных в поля класса


#### 9. Класс <span style="color:#993131">Order</span>

Расширяет класс Form. Реализует интерфейс IOrder. Устанавливает слушатели событий на кнопки в выборе оплаты. Есть метод  `resetForm(): void`, который сбрасывает состояния кнопок оплаты на не выбрано. В конструктор принимает контейнер и экземпляр брокера событий.


#### 10. Класс <span style="color:#993131">Contacts</span>

Расширяет класс Form. Реализует интерфейс IContacts. В конструктор принимает контейнер и экземпляр брокера событий.


### Презентор (Presenter)

#### Класс <span style="color:#993131">AppApi</span>

Принимает в конструктор экземпляр класса `Api` и предоставляет методы реализующие взаимодействие с бэкендом сервиса.


## Взаимодействие компонентов

Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентора.\
Взаимодействие осуществляется за счёт событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `products:changed` - изменение массива карточек товаров
- `productsBasket:changed` - изменение количества товаров в корзине

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `card:select` - выбор карточки товара для отображения в модальном окне
- `card:add` - добавление выбранной карточки товара в корзину
- `card:delete` - удаления выбранной карточки товара из корзины

- `basket:open` - открытие корзины
- `basket:changed` - изменение данных в корзине

- `order:open` - открытие формы заказа
- `order:input` - изменение данных в форме заказа
- `order:validation` - событие, сообщающее о необходимости валидации формы заказа

- `contacts:open` - открытие формы контакты
- `contacts:input` - изменение данных в форме контакты
- `contacts:validation` - событие, сообщающее о необходимости валидации формы контакты

- `contacts:submit` - отправление данных заказа на сервер. При успешном завершении происходит переход на модальное окно подтверждающее оформление заказа

- `basket:cleaner` - очищает данные корзины
- `form:cleaner` - очищает данные пользователя в формах

- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна

- `success:close` - закрытие модального окна успешно завершённого заказа на дополнительную кнопку