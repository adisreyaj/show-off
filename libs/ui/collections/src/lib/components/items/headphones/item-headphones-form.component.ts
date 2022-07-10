import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { HeadphonesData, SupportedItemTypes } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-headphones-form',
  template: ` <div [formGroup]="this.form">
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="make" class="flex flex-col">
        <zz-form-group-label required>Make</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: Apple"
          variant="fill"
          zzInput
          id="make"
          formControlName="make"
        />
      </zz-form-group>
      <zz-form-group id="name" class="flex flex-col">
        <zz-form-group-label required>Name</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: Macbook Pro"
          variant="fill"
          zzInput
          id="name"
          formControlName="name"
        />
      </zz-form-group>
    </fieldset>
    <fieldset class="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      <zz-form-group id="price" class="flex flex-col">
        <zz-form-group-label required>Price ($)</zz-form-group-label>
        <input
          type="number"
          placeholder=""
          variant="fill"
          zzInput
          id="price"
          formControlName="price"
        />
      </zz-form-group>
    </fieldset>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    ...FORM_COMPONENTS,
    ReactiveFormsModule,
  ],
})
export class ItemHeadphonesFormComponent extends ItemFormBase<HeadphonesData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: [null, []],
      currency: ['$', []],
    });
  }

  override getValue(): HeadphonesData {
    const { make, name, price, currency } = this.form.value;
    return {
      make,
      name,
      price,
      currency,
      links: [],
      type: SupportedItemTypes.Headphones,
      metadata: {},
    };
  }
}
