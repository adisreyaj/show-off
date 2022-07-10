import { FormBuilder, FormGroup } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive()
export abstract class ItemFormBase<Data> {
  form: FormGroup = this.buildForm();

  constructor(protected readonly fb: FormBuilder) {}

  abstract buildForm(): FormGroup;

  public getValue(): Data {
    return this.form.value;
  }

  public reset() {
    this.form.reset();
  }

  public isValid() {
    return this.form.valid;
  }

  public setValue(value: Data) {
    this.form.setValue(value);
  }
}
