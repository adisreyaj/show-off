import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { BrowserData, SupportedItemTypes } from '@show-off/api-interfaces';
import { ItemFormLinksComponent } from '../item-form-links.component';

@Component({
  selector: 'show-off-item-browser-form',
  template: ` <div [formGroup]="this.form">
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="make" class="flex flex-col">
        <zz-form-group-label required>Publisher</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: Google"
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
          placeholder="Eg: Chrome"
          variant="fill"
          zzInput
          id="name"
          formControlName="name"
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
export class ItemBrowserFormComponent extends ItemFormBase<BrowserData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      links: [[]],
    });
  }

  override getValue(): BrowserData {
    const { make, name, links } = this.form.value;
    return {
      make,
      name,
      type: SupportedItemTypes.Browser,
      links,
    };
  }
}
