// import { ICardsData, IProduct } from "../types";
// import { IEvents } from "./base/events";

// export class CardsData implements ICardsData {
//   protected _cards: IProduct[];
//   protected _preview: string | null;
//   protected events: IEvents;

//   constructor(events: IEvents){
//     this.events = events;
//   }

//   set cards(cards: IProduct[]){
//     this._cards = cards;
//     this.events.emit('products:changed');
//   }

//   get cards(){
//     return this._cards;
//   }

//   set preview(productId: string) {
//     if (!productId) {
//       this._preview = null;
//       return;
//     }
//     const selectedCard = this.getCard(productId);
//     if (selectedCard) {
//       this._preview = productId;
//       this.events.emit('card:selected')
//     }
//   }

//   get preview () {
//     return this._preview
//   }

//   getCard(productId: string) {
//     return this._cards.find((item) => item.id === productId)
//   }

// }