import { Component } from '@angular/core';
import {
  ButtonComponent,
  DROPDOWN_COMPONENTS,
  FORM_COMPONENTS,
  ModalService,
} from 'zigzag';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeIconPipe } from '@show-off/ui/shared';
import { ItemTypeChooserComponent } from './item-type-chooser.component';

@Component({
  selector: 'show-off-create-collection',
  template: `
    <div class="box">
      <h1 class="page-header">Create Collection</h1>
      <section>
        <form class="max-w-md" [formGroup]="this.collectionForm">
          <zz-form-group id="name" class="flex flex-col">
            <zz-form-group-label required>Name</zz-form-group-label>
            <input
              type="text"
              placeholder="Give a name for your collection"
              variant="fill"
              zzInput
              id="name"
              formControlName="name"
            />
          </zz-form-group>
          <zz-form-group id="description" class="flex flex-col">
            <zz-form-group-label required>Description</zz-form-group-label>
            <textarea
              type="text"
              placeholder="Add a short description"
              variant="fill"
              zzInput
              id="name"
              formControlName="description"
            ></textarea>
          </zz-form-group>
          <section>
            <button
              variant="link"
              zzButton
              (click)="this.openItemTypeChooser()"
            >
              <p>Choose Type</p>
            </button>
          </section>
          <footer>
            <button zzButton variant="primary">Create</button>
          </footer>
        </form>
      </section>
    </div>
  `,
  standalone: true,
  imports: [
    ...FORM_COMPONENTS,
    ...DROPDOWN_COMPONENTS,
    ReactiveFormsModule,
    ButtonComponent,
    TypeIconPipe,
    CommonModule,
  ],
})
export class CreateCollectionComponent {
  collectionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modal: ModalService
  ) {
    this.collectionForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      description: ['', [Validators.minLength(5), Validators.maxLength(255)]],
    });
  }

  openItemTypeChooser() {
    this.modal.open(ItemTypeChooserComponent, {
      size: 'md',
    });
  }
}
