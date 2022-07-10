import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Link, LinkType } from '@show-off/api-interfaces';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RemixIconModule } from 'angular-remix-icon';

@Component({
  selector: 'show-off-item-form-links',
  template: `
    <header class="mb-2">
      <p class="text-lg font-semibold">Links</p>
    </header>
    <ng-container [formGroup]="this.form">
      <ng-container formArrayName="links">
        <ng-container
          *ngFor="let control of this.linksFormControls; index as i"
        >
          <fieldset
            [formGroupName]="i"
            class="grid grid-cols-[100px_1fr_50px] gap-6"
          >
            <zz-form-group id="type" class="flex flex-col">
              <zz-form-group-label>Type</zz-form-group-label>
              <select zzSelect variant="fill" formControlName="type">
                <option *ngFor="let type of linkTypes" [value]="type">
                  {{ type | titlecase }}
                </option>
              </select>
            </zz-form-group>
            <zz-form-group id="url" class="flex flex-col">
              <zz-form-group-label>Url</zz-form-group-label>
              <input type="url" variant="fill" zzInput formControlName="url" />
            </zz-form-group>
            <button
              [disabled]="linksFormControls.length === 1"
              zzButton
              variant="outline"
              type="button"
              class="mb-8 self-end"
              (click)="this.deleteLink(i)"
            >
              <rmx-icon
                name="delete-bin-4-line"
                class="text-red-500"
              ></rmx-icon>
            </button>
          </fieldset>
        </ng-container>
        <footer class="mb-6">
          <button
            zzButton
            size="sm"
            variant="outline"
            type="button"
            (click)="this.addNewLink()"
          >
            {{
              this.linksFormArray.length === 0 ? 'Add Link' : 'Add Another Link'
            }}
          </button>
        </footer>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ...FORM_COMPONENTS,
    ButtonComponent,
    ReactiveFormsModule,
    RemixIconModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemFormLinksComponent),
      multi: true,
    },
  ],
})
export class ItemFormLinksComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  linkTypes = Object.values(LinkType);
  private onTouched!: () => void;
  private onChanged!: (link: Link) => void;
  private sub: Subscription;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      links: this.fb.array([]),
    });

    this.sub = this.form.valueChanges.subscribe(() => {
      this.onChanged(this.form.value.links ?? []);
    });
  }

  get linksFormArray(): FormArray {
    return this.form.get('links') as FormArray;
  }

  get linksFormControls() {
    return (this.form.get('links') as FormArray).controls;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  registerOnChange(fn: never): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  writeValue(value: Link[]): void {
    value.forEach((link) => {
      this.linksFormArray.push(this.getLinkFormGroup(link));
    });
    this.cdr.detectChanges();
  }

  addNewLink() {
    this.linksFormArray.push(
      this.getLinkFormGroup({ url: '', type: LinkType.Link })
    );
  }

  deleteLink(index: number) {
    this.linksFormArray.removeAt(index);
  }

  private getLinkFormGroup(initValue?: Link): FormGroup {
    return this.fb.group({
      url: [initValue?.url ?? '', [Validators.pattern(/^https?:\/\//)]],
      type: [initValue?.type ?? ''],
    });
  }
}
