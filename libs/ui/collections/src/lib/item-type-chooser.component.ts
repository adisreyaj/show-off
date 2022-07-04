import { Component } from '@angular/core';
import { SupportedItemTypes } from '@show-off/api-interfaces';
import { TypeIconPipe } from '@show-off/ui/shared';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ModalRef } from 'zigzag';

@Component({
  selector: 'show-off-item-type-chooser',
  template: `
    <div class="">
      <div class="modal-header mb-2 sticky p-4 bg-white t-0">
        <p>Choose Item Type</p>
      </div>
      <section class="flex flex-wrap gap-6 px-4 pb-8">
        <button
          *ngFor="let type of this.availableTypes"
          class="w-full"
          [style.max-width.px]="150"
          size="sm"
          variant="link"
          zzButton
          (click)="this.modalRef.close(type)"
        >
          <div class="rounded-md flex items-center gap-2">
            <div class="grid place-items-center w-10 h-10 rounded-full">
              <img class="block h-6 w-6" [src]="type | typeIcon" [alt]="type" />
            </div>
            <p>{{ type }}</p>
          </div>
        </button>
      </section>
    </div>
  `,
  standalone: true,
  imports: [TypeIconPipe, CommonModule, ButtonComponent],
})
export class ItemTypeChooserComponent {
  availableTypes = Object.values(SupportedItemTypes);

  constructor(public readonly modalRef: ModalRef) {}
}
