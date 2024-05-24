import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';


interface IFormState {
  valid: boolean;
  errors: string[];
}

export class Form<T> extends Component<IFormState> {
  protected _errors: HTMLElement;
  protected _submitButton: HTMLButtonElement;
	protected form: HTMLFormElement;
  protected formName: string;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._errors = this.container.querySelector('.form__errors');
    this._submitButton = this.container.querySelector('.button[type=submit]');
    this.form = this.container.querySelector('.form');
    console.log(this.form);
    this.formName = this.form.getAttribute('name');
    console.log(this.formName);
    
    this.container.addEventListener('input', (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.events.emit(`${this.formName}:input`, { field, value });
    });

    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this.events.emit(`${this.formName}:submit`);
    });
  }

  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(value: string) {
    this._errors.textContent = value;
  }

  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}