import './scss/styles.scss';
import { IApi, IContacts, IOrder } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate } from './utils/utils';

import { EventEmitter, IEvents } from './components/base/events';
import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { AppData } from './components/AppData';
import { Page } from './components/Page';
import { Section } from './components/Section';
import { Card } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket, ItemBasket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';
import { Form } from './components/common/Form';


const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi, CDN_URL);

// Модель данных

const appData = new AppData(events);

// Темплейты

const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const cardBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

// Компоненты

const cardsContainer = new Section(document.querySelector('.gallery'));
const page = new Page(document.querySelector('.page'), events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Form<IContacts>(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);


events.onAll((event => {
  console.log(event.eventName, event.data)
}))


// Получаем карточки с сервера

api.getCards()
  .then((initialCards) => {
    appData.cards = initialCards;
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });


// Инсталлирование каталога карточек

events.on('products:changed', () => {
  const cardsArray = appData.cards.map((card) => {
    const cardInstant = new Card(cloneTemplate(cardTemplate), events);
    return cardInstant.render({
      id: card.id,
      image: card.image,
      title: card.title,
      category: card.category,
      price: card.price,
    });
  })

  cardsContainer.render({ catalog: cardsArray });
})

// Открытие превью карточки

events.on('card:select', (data: { card: Card }) => {
  const { card } = data;
  const item = appData.getCard(card.id);
  const previewCard = new Card(cloneTemplate(cardPreviewTemplate), events);
  modal.render({
    content: previewCard.render({
      id: item.id,
      description: item.description,
      image: item.image,
      title: item.title,
      category: item.category,
      price: item.price,
      selected: item.selected
    }),
  });
});

// Добавление товара в корзину

events.on('card:add', (data: { card: Card }) => {
  const { card } = data;
  card.selected = true;
  appData.selectProduct(card.id);
  appData.updateProductsInBasket();
  modal.close();
  events.emit('productsBasket:changed');
})

// Удаление товара из корзины

events.on('card:delete', (data: { card: Card }) => {
  const { card } = data;
  card.selected = false;
  appData.selectProduct(card.id);
  appData.updateProductsInBasket();
  basket.updateIndex;
  if (!appData.productsInBasket.length) {
    basket.disableButton();
  }
  modal.close();
  events.emit('productsBasket:changed');
})

// Открытие корзины
events.on('basket:open', () => {
  appData.updateProductsInBasket();
  appData.setTotal();
  const itemsBasketArray = appData.productsInBasket.map((item, index) => {
    const itemBasket = new ItemBasket(cloneTemplate(cardBasketTemplate), events);
    return itemBasket.render({
      id: item.id,
      title: item.title,
      index: index + 1,
      price: item.price,
    });
  });
  modal.render({
    content: basket.render({
      list: itemsBasketArray,
      total: appData.total,
    }),
  });
});

// Изменение данных в корзине

events.on('basket:changed', () => {
  basket.list = appData.productsInBasket.map((item, index) => {
    const itemBasket = new ItemBasket(cloneTemplate(cardBasketTemplate), events);
    return itemBasket.render({
      id: item.id,
      title: item.title,
      index: index + 1,
      price: item.price,
    });
  });
  appData.setTotal();
  basket.total = appData.total;
})

// Изменение количества товаров в корзине

events.on('productsBasket:changed', () => {
  page.counter = appData.productsCounter;
})

// Открытие формы заказа

events.on('order:open', () => {
  modal.render({
    content: order.render(
      {
        address: '',
        valid: false,
        errors: []
      }
    ),
  });
  events.emit('order:validation');
})

// Изменились введённые данные заказа

events.on('order:input', (data: { field: keyof IOrder, value: string }) => {
  const { field } = data;
  const { value } = data;

  if (field === 'address') {
    appData.address = value;
  }
  
  if (field === 'payment') {
    appData.payment = value;
  }
});

// Изменилось состояние валидации формы с данными заказа

events.on('order:validation', () => {
  order.valid = appData.checkValidationOrderForm();
  order.errors = appData.validateOrderInputs();
})

// Открытие формы контакты

events.on('contacts:open', () => {
  modal.render({
    content: contacts.render(
      {
        phone: '',
        email: '',
        valid: false,
        errors: []
      }
    ),
  });
  events.emit('contacts:validation');
});

// Изменились введённые данные контактов

events.on('contacts:input', (data: { field: keyof IOrder, value: string }) => {
  const { field } = data;
  const { value } = data;

  if (field === 'email') {
    appData.email = value;
  }
  
  if (field === 'phone') {
    appData.phone = value;
  }
});

// Изменилось состояние валидации формы с контактными данными

events.on('contacts:validation', () => {
  contacts.valid = appData.checkValidationContactsForm();
  contacts.errors = appData.validateContactsInputs();
})

// Отправление данных заказа на сервер

events.on('contacts:submit', () => {
  api.postOrderInfo(appData.orderData)
  .then((res) => {
    events.emit('basket:cleaner');
    events.emit('form:cleaner');
    modal.render({
      content: success.render(
        {
          description: res.total
        }
      ),
    });
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  })
})

// Очищение данных корзины

events.on('basket:cleaner', () => {
  appData.resetSelectProducts();
  appData.updateProductsInBasket();
});

// Очищение данных заказа

events.on('form:cleaner', () => {
  appData.resetOrderData();
  order.resetForm();
  contacts.resetForm();
})

// Открытие модального окна
events.on('modal:open', () => {
  page.locked = true;
});

// Закрытие модального окна

events.on('modal:close', () => {
  page.locked = false;
});

// Закрытие окна успешного завершения покупки

events.on('success:close', () => {
  modal.close();
})
