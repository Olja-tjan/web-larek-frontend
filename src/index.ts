import './scss/styles.scss';
import { IApi } from './types';
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
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';


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
const successTemplate: HTMLTemplateElement = document.querySelector('#sucess');

// Компоненты

const cardsContainer = new Section(document.querySelector('.gallery'));
const page = new Page(document.querySelector('.page'), events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
//const order = new Order(cloneTemplate(orderTemplate), events);
//const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
//const success = new Success(cloneTemplate(successTemplate), events);


events.onAll((event => {
    console.log(event.eventName, event.data)
}))


// Получаем карточки с сервера

Promise.all([api.getCards()])
	.then(([initialCards]) => {
		appData.cards = initialCards;
        events.emit('products:changed');
	})
	.catch((err) => {
		console.error(`Ошибка: ${err}`);
	});


// Инcталирование каталога карточек

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
    page.locked = true;
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

  // Открытие корзины
events.on('basket:open', () => {
    page.locked = true
    appData.updateProductsInBasket();
    appData.setTotal();
    const itemsBasketArray = appData.productsInBasket.map((item, index) => {
      const itemBusket = new ItemBasket(cloneTemplate(cardBasketTemplate), events);
      return itemBusket.render({
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

  // Изменение колличества товаров в корзине

  events.on('productsBasket:changed', () => {
    page.counter = appData.сountProducts();
  })

  // Изменение данных в корзине

  events.on('basket:changed', () => {
    basket.list = appData.productsInBasket.map((item, index) => {
      const itemBusket = new ItemBasket(cloneTemplate(cardBasketTemplate), events);
      return itemBusket.render({
        id: item.id,
        title: item.title,
        index: index + 1,
        price: item.price,
      });
    });
    appData.setTotal();
    basket.total = appData.total;
  })
  
  // Добавление товара в корзину
  
events.on('card:add', (data: { card: Card }) => {
    const { card } = data;
    card.selected = true;
    appData.selectProduct(card.id);
    appData.updateProductsInBasket();
    modal.close();
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
  })
  
// Закрытие модального окна

events.on('modal:close', () => {
    page.locked = false;
  });