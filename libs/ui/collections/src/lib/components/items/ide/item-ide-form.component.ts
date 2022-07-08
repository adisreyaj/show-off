import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { IdeData, SupportedItemTypes } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-ide-form',
  template: ` <div [formGroup]="this.form">
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="make" class="flex flex-col">
        <zz-form-group-label required>Publisher</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: Microsoft"
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
          placeholder="Eg: Visual Studio Code"
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
export class ItemIdeFormComponent extends ItemFormBase<IdeData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  override getValue(): IdeData {
    const { make, name } = this.form.value;
    return {
      make,
      name,
      type: SupportedItemTypes.Ide,
      links: [],
    };
  }
}
