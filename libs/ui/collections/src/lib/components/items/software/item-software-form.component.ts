import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { SoftwareData, SupportedItemTypes } from '@show-off/api-interfaces';
import { ItemFormLinksComponent } from '../item-form-links.component';
import { RecommendationMeterComponent } from '../../recommendation-meter/recommendation-meter.component';

@Component({
  selector: 'show-off-item-ide-form',
  template: ` <div [formGroup]="this.form">
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="make" class="flex flex-col">
        <zz-form-group-label required>Publisher</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: Adobe"
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
          placeholder="Eg: Photoshop"
          variant="fill"
          zzInput
          id="name"
          formControlName="name"
        />
      </zz-form-group>
    </fieldset>
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="type" class="flex flex-col">
        <zz-form-group-label required>Type</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: Photo Editing"
          variant="fill"
          zzInput
          id="type"
          formControlName="type"
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
export class ItemSoftwareFormComponent extends ItemFormBase<SoftwareData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      links: [[]],
      recommendation: [0],
    });
  }

  override getValue(): SoftwareData {
    const { make, name, links, type, recommendation } = this.form.value;
    return {
      make,
      name,
      metadata: {
        type,
      },
      recommendation,
      type: SupportedItemTypes.Software,
      links,
    };
  }

  override patchValue(value: SoftwareData) {
    const { type, metadata, ...rest } = value;
    this.form.patchValue({ ...rest, type: metadata?.['type'] });
  }
}
