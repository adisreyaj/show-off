import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { LaptopData, SupportedItemTypes } from '@show-off/api-interfaces';
import { ItemFormLinksComponent } from '../item-form-links.component';
import { RecommendationMeterComponent } from '../../recommendation-meter/recommendation-meter.component';

@Component({
  selector: 'show-off-item-laptop-form',
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
    <show-off-item-form-links
      formControlName="links"
    ></show-off-item-form-links>
    <show-off-recommendation-meter
      formControlName="recommendation"
    ></show-off-recommendation-meter>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    ...FORM_COMPONENTS,
    ReactiveFormsModule,
    ItemFormLinksComponent,
    RecommendationMeterComponent,
  ],
})
export class ItemLaptopFormComponent extends ItemFormBase<LaptopData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      size: [null, [Validators.required]],
      ram: [null, [Validators.required]],
      storage: [null, [Validators.required]],
      links: [[]],
      recommendation: [0],
      price: [null, []],
      currency: ['$', []],
    });
  }

  override getValue(): LaptopData {
    const {
      make,
      name,
      price,
      currency,
      ram,
      storage,
      size,
      links,
      recommendation,
    } = this.form.value;
    return {
      make,
      name,
      price,
      currency,
      links,
      recommendation,
      type: SupportedItemTypes.Laptop,
      metadata: {
        ram,
        storage,
        size,
      },
    };
  }

  override patchValue(value: LaptopData) {
    this.form.patchValue({
      make: value.make,
      name: value.name,
      price: value.price,
      currency: value.currency,
      ram: value.metadata?.['ram'],
      storage: value.metadata?.['storage'],
      size: value.metadata?.['size'],
      links: value.links,
    });
  }
}
