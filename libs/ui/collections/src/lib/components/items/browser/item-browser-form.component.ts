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
import { BrowserData, SupportedItemTypes } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-browser-form',
  template: ` <div [formGroup]="this.browserForm">
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
export class ItemBrowserFormComponent extends ItemFormBase<BrowserData> {
  browserForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();

    this.browserForm = this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  getValue(): BrowserData {
    const { make, name } = this.browserForm.value;
    return {
      make,
      name,
      type: SupportedItemTypes.Browser,
      links: [],
    };
  }

  isValid(): boolean {
    return this.browserForm.valid;
  }

  reset(): void {
    this.browserForm.reset();
  }

  setValue(value: BrowserData): void {
    this.browserForm.setValue(value);
  }
}
