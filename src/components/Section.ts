import { Component } from "./base/component";

interface ISection {
  catalog: HTMLElement[];
}

export class Section extends Component<ISection>{
  protected _catalog: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container)
  }

  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren( ...items);
  }
  
}