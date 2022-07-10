import { FormBuilder, FormGroup } from '@angular/forms';
import { Directive } from '@angular/core';
import { map, Observable } from 'rxjs';

@Directive()
export abstract class ItemFormBase<Data> {
  form: FormGroup = this.buildForm();

  constructor(protected readonly fb: FormBuilder) {}

  public get isValid$(): Observable<boolean> {
    return this.form.statusChanges.pipe(map(() => this.form.valid));
  }

  public get isInValid$(): Observable<boolean> {
    return this.form.statusChanges.pipe(map(() => this.form.invalid));
  }

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

  public patchValue(value: Data) {
    this.form.patchValue(value);
  }
}
