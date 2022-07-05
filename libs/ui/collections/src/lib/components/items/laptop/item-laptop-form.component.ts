import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { LaptopData, SupportedItemTypes } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-laptop-form',
  template: ` <div [formGroup]="this.laptopForm">
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
    <fieldset class="grid grid-cols-4 gap-6">
      <zz-form-group id="size" class="flex flex-col">
        <zz-form-group-label required>Size (Inch)</zz-form-group-label>
        <input
          type="number"
          variant="fill"
          zzInput
          id="size"
          formControlName="size"
        />
      </zz-form-group>
      <zz-form-group id="ram" class="flex flex-col">
        <zz-form-group-label required>RAM (GB)</zz-form-group-label>
        <input
          type="number"
          variant="fill"
          zzInput
          id="ram"
          formControlName="ram"
        />
      </zz-form-group>
      <zz-form-group id="storage" class="flex flex-col">
        <zz-form-group-label required>Storage (GB)</zz-form-group-label>
        <input
          type="number"
          placeholder=""
          variant="fill"
          zzInput
          id="storage"
          formControlName="storage"
        />
      </zz-form-group>
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
export class ItemLaptopFormComponent extends ItemFormBase<LaptopData> {
  laptopForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();

    this.laptopForm = this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      size: [null, [Validators.required]],
      ram: [null, [Validators.required]],
      storage: [null, [Validators.required]],
      price: [null, []],
      currency: ['$', []],
    });
  }

  getValue(): LaptopData {
    const { make, name, price, currency, ram, storage, size } =
      this.laptopForm.value;
    return {
      make,
      name,
      price,
      currency,
      links: [],
      type: SupportedItemTypes.Laptop,
      metadata: {
        ram,
        storage,
        size,
      },
    };
  }

  isValid(): boolean {
    return this.laptopForm.valid;
  }

  reset(): void {
    this.laptopForm.reset();
  }

  setValue(value: LaptopData): void {
    this.laptopForm.setValue(value);
  }
}