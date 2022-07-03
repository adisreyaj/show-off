import { Component } from '@angular/core';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'show-off-create-collection',
  template: `
    <div class="box">
      <h1 class="page-header">Create Collection</h1>
      <section>
        <form
          class="max-w-md"
          [formGroup]="this.collectionForm"
          (ngSubmit)="this.create()"
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
              id="name"
              formControlName="description"
            ></textarea>
          </zz-form-group>
          <footer>
            <button zzButton variant="primary">Create</button>
          </footer>
        </form>
      </section>
    </div>
  `,
  standalone: true,
  imports: [...FORM_COMPONENTS, ReactiveFormsModule, ButtonComponent],
})
export class CreateCollectionComponent {
  collectionForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.collectionForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      description: ['', [Validators.minLength(5), Validators.maxLength(255)]],
    });
  }

  create() {}
}
