import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ItemData, SupportedItemTypes } from '@show-off/api-interfaces';
import { TypeIconPipe } from '@show-off/ui/shared';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS, ModalRef } from 'zigzag';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ItemLaptopFormComponent } from './items/laptop/item-laptop-form.component';
import { ItemFormBase } from './items/item-form-base.class';
import { isEmpty } from 'lodash-es';
import { ItemTabletFormComponent } from './items/tablet/item-tablet-form.component';
import { ItemIdeFormComponent } from './items/ide/item-ide-form.component';
import { ItemTerminalFormComponent } from './items/terminal/item-terminal-form.component';
import { ItemBrowserFormComponent } from './items/browser/item-browser-form.component';
import { ItemKeyboardFormComponent } from './items/keyboard/item-keyboard-form.component';
import { ItemPhoneFormComponent } from './items/phone/item-phone-form.component';
import { ItemHeadphonesFormComponent } from './items/headphones/item-headphones-form.component';
import { ItemMicrophoneFormComponent } from './items/microphone/item-microphone-form.component';

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
          variant="neutral"
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
        <form>
          <ng-container #formContainer></ng-container>
          <footer>
            <button
              type="button"
              zzButton
              variant="primary"
              [disabled]="!this.formComponentRef?.instance?.isValid?.()"
              (click)="this.addItem()"
            >
              Add Item
            </button>
          </footer>
        </form>
      </section>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TypeIconPipe,
    CommonModule,
    ButtonComponent,
    ...FORM_COMPONENTS,
    ReactiveFormsModule,
    ItemLaptopFormComponent,
  ],
})
export class CreateItemComponent {
  availableTypes = Object.values(SupportedItemTypes);
  itemType?: SupportedItemTypes;
  modalTitle = 'Choose Item Type';
  formComponentRef?: ComponentRef<ItemFormBase<ItemData>>;

  @ViewChild('formContainer', { read: ViewContainerRef })
  private formContainer?: ViewContainerRef;
  private readonly formComponents: Record<
    string,
    Type<ItemFormBase<ItemData>>
  > = {
    [SupportedItemTypes.Laptop]: ItemLaptopFormComponent,
    [SupportedItemTypes.Tablet]: ItemTabletFormComponent,
    [SupportedItemTypes.Ide]: ItemIdeFormComponent,
    [SupportedItemTypes.Terminal]: ItemTerminalFormComponent,
    [SupportedItemTypes.Browser]: ItemBrowserFormComponent,
    [SupportedItemTypes.Keyboard]: ItemKeyboardFormComponent,
    [SupportedItemTypes.Phone]: ItemPhoneFormComponent,
    [SupportedItemTypes.Headphones]: ItemHeadphonesFormComponent,
    [SupportedItemTypes.Microphone]: ItemMicrophoneFormComponent,
  };

  constructor(
    public readonly modalRef: ModalRef,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef
  ) {}

  setItemType(type: string) {
    this.itemType = type as SupportedItemTypes;
    this.modalTitle = `Add ${type}`;
    this.cd.detectChanges();
    this.attachCorrespondingForm(this.itemType);
  }

  addItem() {
    if (!this.formComponentRef) {
      return;
    }
    const isValid = this.formComponentRef.instance.isValid();
    const value = this.formComponentRef.instance.getValue();
    if (isValid && !isEmpty(value) && this.itemType) {
      const data = {
        ...value,
        type: this.itemType,
      };
      this.modalRef.close(data);
    }
  }

  private attachCorrespondingForm(type: SupportedItemTypes) {
    const component = this.formComponents[type];
    this.formComponentRef = this.formContainer?.createComponent(component);
    this.cd.detectChanges();
  }
}
