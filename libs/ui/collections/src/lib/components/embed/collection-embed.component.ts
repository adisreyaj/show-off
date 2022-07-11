import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection, SupportedItemTypes } from '@show-off/api-interfaces';
import { CollectionsService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CollectionDetailHeaderComponent } from '../detail/collection-detail-header.component';
import { CommonModule } from '@angular/common';
import {
  MasonryGridComponent,
  MasonryGridItemDirective,
  UserInfoComponent,
} from '@show-off/ui/shared';
import { ItemLaptopComponent } from '@show-off/ui/collections';
import { ItemTabletComponent } from '../items/tablet/item-tablet.component';
import { ItemIdeComponent } from '../items/ide/item-ide.component';
import { ItemTerminalComponent } from '../items/terminal/item-terminal.component';
import { ItemBrowserComponent } from '../items/browser/item-browser.component';
import { ItemKeyboardComponent } from '../items/keyboard/item-keyboard.component';
import { ItemPhoneComponent } from '../items/phone/item-phone.component';
import { ItemHeadphonesComponent } from '../items/headphones/item-headphones.component';
import { ItemMicrophoneComponent } from '../items/microphone/item-microphone.component';
import { ItemWebcamComponent } from '../items/webcam/item-webcam.component';
import { ItemMouseComponent } from '../items/mouse/item-mouse.component';
import { ItemMonitorComponent } from '../items/monitor/item-monitor.component';

@Component({
  selector: 'show-off-collection-embed',
  template: `
    <div
      [style.padding.px]="this.embedOptions.padding"
      *ngIf="this.collection$ | async as collection"
    >
      <header
        class="page-header mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <section>
          <div class="mb-2" *ngIf="this.embedOptions.showTitle">
            <h1 class="page-header-text">{{ collection.name }}</h1>
            <p>{{ collection?.description }}</p>
          </div>
          <show-off-user-info
            *ngIf="this.embedOptions.showOwner"
            [user]="collection.user"
          ></show-off-user-info>
        </section>
      </header>
      <div class="flex-1">
        <div class="flex">
          <show-off-masonry-grid>
            <article
              class="min-w-[200px]"
              masonryGridItem
              *ngFor="let item of collection.items"
            >
              <ng-container
                *ngTemplateOutlet="
                  itemViewTpl;
                  context: {
                    $implicit: item,
                    collection: collection,
                    ownerId: collection.user.id
                  }
                "
              ></ng-container>
            </article>
          </show-off-masonry-grid>
          <section #grid class="grid"></section>
        </div>
      </div>
    </div>
    <ng-template
      #itemViewTpl
      let-data
      let-ownerId="ownerId"
      let-collection="collection"
    >
      <ng-container [ngSwitch]="data.type">
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Laptop}'">
          <show-off-item-laptop [data]="data"></show-off-item-laptop>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Tablet}'">
          <show-off-item-tablet [data]="data"></show-off-item-tablet>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Ide}'">
          <show-off-item-ide [data]="data"></show-off-item-ide>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Terminal}'">
          <show-off-item-terminal [data]="data"></show-off-item-terminal>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Browser}'">
          <show-off-item-browser [data]="data"></show-off-item-browser>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Keyboard}'">
          <show-off-item-keyboard [data]="data"></show-off-item-keyboard>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Phone}'">
          <show-off-item-phone [data]="data"></show-off-item-phone>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Headphones}'">
          <show-off-item-headphones [data]="data"></show-off-item-headphones>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Microphone}'">
          <show-off-item-microphone [data]="data"></show-off-item-microphone>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Webcam}'">
          <show-off-item-webcam [data]="data"></show-off-item-webcam>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Mouse}'">
          <show-off-item-mouse [data]="data"></show-off-item-mouse>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Monitor}'">
          <show-off-item-monitor [data]="data"></show-off-item-monitor>
        </ng-container>
      </ng-container>
    </ng-template>
  `,
  standalone: true,
  imports: [
    CommonModule,
    CollectionDetailHeaderComponent,
    MasonryGridComponent,
    ItemLaptopComponent,
    ItemTabletComponent,
    ItemIdeComponent,
    ItemTerminalComponent,
    ItemBrowserComponent,
    ItemKeyboardComponent,
    ItemPhoneComponent,
    ItemHeadphonesComponent,
    ItemMicrophoneComponent,
    ItemWebcamComponent,
    ItemMouseComponent,
    ItemMonitorComponent,
    MasonryGridItemDirective,
    UserInfoComponent,
  ],
})
export class CollectionEmbedComponent {
  readonly collection$: Observable<Collection>;
  public embedOptions: EmbedOptions;
  private readonly collectionId: string;

  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.collectionId = this.activatedRoute.snapshot.params['id'];
    this.embedOptions = {
      padding: Number(
        this.activatedRoute.snapshot.queryParams['padding'] ?? '16'
      ),
      showTitle:
        this.activatedRoute.snapshot.queryParams['showTitle'] !== 'false',
      showDescription:
        this.activatedRoute.snapshot.queryParams['showDescription'] !== 'false',
      showOwner:
        this.activatedRoute.snapshot.queryParams['showOwner'] !== 'false',
    };
    this.collection$ = this.collectionsService.getCollection(
      this.collectionId,
      true
    );
  }
}

interface EmbedOptions {
  showTitle: boolean;
  showDescription: boolean;
  showOwner: boolean;
  padding: number;
}
