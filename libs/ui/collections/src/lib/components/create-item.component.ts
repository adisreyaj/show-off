import { Component } from '@angular/core';
import { SupportedItemTypes } from '@show-off/api-interfaces';
import { TypeIconPipe } from '@show-off/ui/shared';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS, ModalRef } from 'zigzag';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'show-off-item-type-chooser',
  template: `
    <div class="">
      <header class="modal-header t-0 sticky mb-2 bg-white p-4 text-center">
        <p>{{ this.modalTitle }}</p>
      </header>
      <section
        *ngIf="!this.itemType"
        class="flex flex-wrap justify-center gap-6 px-4 pb-8"
      >
        <button
          *ngFor="let type of this.availableTypes"
          class="w-full"
          [style.max-width.px]="150"
          size="sm"
          variant="link"
          zzButton
          (click)="this.setItemType(type)"
        >
          <div class="flex items-center gap-2 rounded-md">
            <div class="grid h-10 w-10 place-items-center rounded-full">
              <img class="block h-6 w-6" [src]="type | typeIcon" [alt]="type" />
            </div>
            <p>{{ type }}</p>
          </div>
        </button>
      </section>
      <section *ngIf="this.itemType" class="px-4 pb-8">
        <form class="" [formGroup]="this.itemForm">
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
          <fieldset class="grid grid-cols-3 gap-6">
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
          </fieldset>
          <footer>
            <button zzButton variant="primary">Add Item</button>
          </footer>
        </form>
      </section>
    </div>
  `,
  standalone: true,
  imports: [
    TypeIconPipe,
    CommonModule,
    ButtonComponent,
    ...FORM_COMPONENTS,
    ReactiveFormsModule,
  ],
})
export class CreateItemComponent {
  availableTypes = Object.values(SupportedItemTypes);
  itemType?: SupportedItemTypes;
  itemForm: FormGroup;
  modalTitle = 'Choose Item Type';

  constructor(
    public readonly modalRef: ModalRef,
    private readonly fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      make: ['', [Validators.required]],
      name: ['', [Validators.required]],
      size: ['', [Validators.required]],
      ram: ['', [Validators.required]],
      storage: ['', [Validators.required]],
    });
  }

  setItemType(type: string) {
    this.itemType = type as SupportedItemTypes;
    this.modalTitle = `Add ${type}`;
  }
}
