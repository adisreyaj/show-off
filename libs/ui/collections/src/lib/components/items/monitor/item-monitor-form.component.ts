import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { MonitorData, SupportedItemTypes } from '@show-off/api-interfaces';
import { ItemFormLinksComponent } from '../item-form-links.component';

@Component({
  selector: 'show-off-item-monitor-form',
  template: ` <div [formGroup]="this.form">
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="make" class="flex flex-col">
        <zz-form-group-label required>Make</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: LG"
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
          placeholder="Eg: Ultrawide"
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
        <zz-form-group-label required>Resolution</zz-form-group-label>
        <input
          type="text"
          variant="fill"
          zzInput
          id="resolution"
          formControlName="resolution"
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
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    ...FORM_COMPONENTS,
    ReactiveFormsModule,
    ItemFormLinksComponent,
  ],
})
export class ItemMonitorFormComponent extends ItemFormBase<MonitorData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      size: [null, [Validators.required]],
      resolution: [null, [Validators.required]],
      links: [[]],
      price: [null, []],
      currency: ['$', []],
    });
  }

  override getValue(): MonitorData {
    const { make, name, price, currency, resolution, size, links } =
      this.form.value;
    return {
      make,
      name,
      price,
      currency,
      links,
      type: SupportedItemTypes.Monitor,
      metadata: {
        resolution,
        size,
      },
    };
  }
}