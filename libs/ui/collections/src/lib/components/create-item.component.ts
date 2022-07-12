import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ItemData,
  ItemServerData,
  SupportedItemTypes,
} from '@show-off/api-interfaces';
import { TypeIconPipe } from '@show-off/ui/shared';
import { CommonModule } from '@angular/common';
import { ButtonComponent, FORM_COMPONENTS, ModalRef } from 'zigzag';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ItemLaptopFormComponent } from './items/laptop/item-laptop-form.component';
import { ItemFormBase } from './items/item-form-base.class';
import { isEmpty, isNil } from 'lodash-es';
import { ItemTabletFormComponent } from './items/tablet/item-tablet-form.component';
import { ItemIdeFormComponent } from './items/ide/item-ide-form.component';
import { ItemTerminalFormComponent } from './items/terminal/item-terminal-form.component';
import { ItemBrowserFormComponent } from './items/browser/item-browser-form.component';
import { ItemKeyboardFormComponent } from './items/keyboard/item-keyboard-form.component';
import { ItemHeadphonesFormComponent } from './items/headphones/item-headphones-form.component';
import { ItemMicrophoneFormComponent } from './items/microphone/item-microphone-form.component';
import { ItemWebcamFormComponent } from './items/webcam/item-webcam-form.component';
import { ItemMouseFormComponent } from './items/mouse/item-mouse-form.component';
import { ItemMonitorFormComponent } from './items/monitor/item-monitor-form.component';
import { ItemPhoneFormComponent } from './items/phone/item-phone-form.component';
import { ItemSoftwareFormComponent } from './items/software/item-software-form.component';

@Component({
  selector: 'show-off-item-type-chooser',
  template: `
    <div class="">
      <header class="modal-header t-0 sticky mb-2 bg-white p-4 text-center">
        <p>{{ this.modalTitle }}</p>
      </header>
      <section
        *ngIf="!this.itemType"
        class="flex flex-wrap justify-center gap-4 px-4 pb-8"
      >
        <button
          *ngFor="let type of this.availableTypes"
          class="w-full"
          [style.max-width.px]="120"
          size="sm"
          variant="neutral"
          zzButton
          (click)="this.setItemType(type)"
        >
          <div class="flex items-center">
            <div class="grid h-10 w-10 place-items-center rounded-full">
              <img class="block h-5 w-5" [src]="type | typeIcon" [alt]="type" />
            </div>
            <p>{{ type }}</p>
          </div>
        </button>
      </section>
      <section *ngIf="this.itemType" class="px-4 pb-8">
        <form>
          <ng-container #formContainer></ng-container>
          <footer class="flex items-center gap-4">
            <button
              type="button"
              zzButton
              variant="primary"
              [disabled]="this.formComponentRef?.instance?.isInValid$ | async"
              (click)="this.addOrUpdateItem()"
            >
              {{ this.isEditMode ? 'Update' : 'Add' }} Item
            </button>
            <button
              type="button"
              zzButton
              variant="link"
              (click)="this.itemType = undefined"
            >
              Back
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
export class CreateItemComponent implements AfterViewInit {
  availableTypes = Object.values(SupportedItemTypes);
  itemType?: SupportedItemTypes;
  modalTitle = 'Choose Item Type';
  formComponentRef?: ComponentRef<ItemFormBase<ItemData>>;
  isEditMode = false;

  @ViewChild('formContainer', { read: ViewContainerRef })
  private formContainer?: ViewContainerRef;
  private readonly formComponents: Record<
    SupportedItemTypes,
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
    [SupportedItemTypes.Webcam]: ItemWebcamFormComponent,
    [SupportedItemTypes.Mouse]: ItemMouseFormComponent,
    [SupportedItemTypes.Monitor]: ItemMonitorFormComponent,
    [SupportedItemTypes.Software]: ItemSoftwareFormComponent,
  };

  constructor(
    public readonly modalRef: ModalRef<ItemServerData>,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef
  ) {}

  get modalData(): ItemServerData | undefined {
    return this.modalRef.data;
  }

  ngAfterViewInit() {
    if (!isEmpty(this.modalData) && !isNil(this.modalData)) {
      this.isEditMode = true;
      this.setItemType(this.modalData.type);
      this.formComponentRef?.instance.patchValue(this.modalData);
    }
  }

  setItemType(type: string) {
    this.itemType = type as SupportedItemTypes;
    this.modalTitle = `Add ${type}`;
    this.cd.detectChanges();
    this.attachCorrespondingForm(this.itemType);
  }

  addOrUpdateItem() {
    if (!this.formComponentRef) {
      return;
    }
    const isValid = this.formComponentRef.instance.isValid();
    const value = this.formComponentRef.instance.getValue();
    if (isValid && !isEmpty(value) && this.itemType) {
      const data = {
        ...value,
        ...(!isNil(this.modalData?.id) && { id: this.modalData?.id }),
        type: this.itemType,
      };
      this.modalRef.close(data);
    }
  }

  private attachCorrespondingForm(type: SupportedItemTypes) {
    if (this.formContainer) {
      const component = this.formComponents[type];
      this.formComponentRef = this.formContainer.createComponent(component);
      this.cd.detectChanges();
    }
  }
}
