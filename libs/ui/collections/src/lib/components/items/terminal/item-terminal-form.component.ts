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
import { SupportedItemTypes, TerminalData } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-terminal-form',
  template: ` <div [formGroup]="this.terminalForm">
    <fieldset class="grid grid-cols-2 gap-6">
      <zz-form-group id="name" class="flex flex-col">
        <zz-form-group-label required>Name</zz-form-group-label>
        <input
          type="text"
          placeholder="Eg: iTerm2"
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
export class ItemTerminalFormComponent extends ItemFormBase<TerminalData> {
  terminalForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();

    this.terminalForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getValue(): TerminalData {
    const { name } = this.terminalForm.value;
    return {
      name,
      type: SupportedItemTypes.Terminal,
      links: [],
    };
  }

  isValid(): boolean {
    return this.terminalForm.valid;
  }

  reset(): void {
    this.terminalForm.reset();
  }

  setValue(value: TerminalData): void {
    this.terminalForm.setValue(value);
  }
}
