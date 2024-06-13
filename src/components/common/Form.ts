import { Component } from '../base/component';
import { IEvents } from '../base/events';


interface IFormState {
  valid: boolean;
  errors: string[];
}


export class Form<T> extends Component<IFormState> {
  protected _errors: HTMLElement;
  protected submitButton: HTMLButtonElement;
	protected form: HTMLFormElement;
  protected formName: string;
  protected inputs: NodeListOf<HTMLInputElement>;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._errors = this.container.querySelector('.form__errors');
    this.submitButton = this.container.querySelector('.button[type=submit]');
    this.formName = this.container.getAttribute('name');
    this.inputs = this.container.querySelectorAll('.form__input');

    this.container.addEventListener('input', (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.events.emit(`${this.formName}:input`, { field, value });
      this.events.emit(`${this.formName}:validation`);
    });

    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      if (this.formName === 'order') {
        this.events.emit('contacts:open');
      } else {
        this.events.emit('contacts:submit');
      }
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this._errors.textContent = value;
  }

  resetForm() {
    this.inputs.forEach((input) => {
      input.value = '';
    })
  }

  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}