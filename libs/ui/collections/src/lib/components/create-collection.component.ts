import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Collection } from '@show-off/api-interfaces';
import { TypeIconPipe } from '@show-off/ui/shared';
import { isEmpty } from 'lodash-es';
import {
  ButtonComponent,
  DROPDOWN_COMPONENTS,
  FORM_COMPONENTS,
  ModalRef,
} from 'zigzag';

@Component({
  selector: 'show-off-create-collection',
  template: `
    <div>
      <header class="modal-header t-0 sticky mb-2 bg-white p-4 text-center">
        <p>Create Collection</p>
      </header>
      <section class="px-4 pb-8">
        <form
          class="max-w-md"
          [formGroup]="this.collectionForm"
          (ngSubmit)="this.createOrUpdate()"
        >
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
              id="description"
              formControlName="description"
            ></textarea>
          </zz-form-group>
          <footer>
            <button zzButton variant="primary">
              {{ this.isEditMode ? 'Update' : 'Create' }}
            </button>
          </footer>
        </form>
      </section>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...FORM_COMPONENTS,
    ...DROPDOWN_COMPONENTS,
    ReactiveFormsModule,
    ButtonComponent,
    TypeIconPipe,
    CommonModule,
  ],
})
export class CreateCollectionComponent implements OnInit {
  collectionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalRef: ModalRef<Collection>
  ) {
    this.collectionForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.minLength(5), Validators.maxLength(255)]],
    });
  }

  get modalData() {
    return this.modalRef.data;
  }

  get isEditMode() {
    return !isEmpty(this.modalData);
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.collectionForm.patchValue({
        name: this.modalData.name,
        description: this.modalData.description,
      });
    }
  }

  createOrUpdate() {
    if (this.collectionForm.valid) {
      this.modalRef.close(this.collectionForm.value);
    }
  }
}
