import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemFormBase } from '../item-form-base.class';
import { SupportedItemTypes, TerminalData } from '@show-off/api-interfaces';
import { ItemFormLinksComponent } from '../item-form-links.component';
import { RecommendationMeterComponent } from '../../recommendation-meter/recommendation-meter.component';

@Component({
  selector: 'show-off-item-terminal-form',
  template: ` <div [formGroup]="this.form">
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
export class ItemTerminalFormComponent extends ItemFormBase<TerminalData> {
  override buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      links: [[]],
      recommendation: [0],
    });
  }

  override getValue(): TerminalData {
    const { name, links, recommendation } = this.form.value;
    return {
      name,
      recommendation,
      type: SupportedItemTypes.Terminal,
      links,
    };
  }
}
