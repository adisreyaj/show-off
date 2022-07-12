import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ButtonComponent, ModalRef } from 'zigzag';
import { Collection } from '@show-off/api-interfaces';
import * as shiki from 'shiki';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'show-off-embed-script-generator',
  template: `
    <div>
      <header class="modal-header t-0 sticky mb-2 bg-white p-4 text-center">
        <p>Embed Collection</p>
      </header>
      <div class="px-4 pb-4">
        <section class="mb-4">
          <header class="mb-1">
            <p class="text-md m-0 font-semibold text-slate-500">Options:</p>
          </header>
          <div
            class="flex items-center gap-4"
            [formGroup]="this.embedOptionsForm"
          >
            <label
              class="flex cursor-pointer items-center gap-2"
              for="showTitle"
            >
              <input
                type="checkbox"
                name="showTitle"
                id="showTitle"
                formControlName="showTitle"
              />
              <p>Show Title</p>
            </label>
            <label
              class="flex cursor-pointer items-center gap-2"
              for="showDescription"
            >
              <input
                type="checkbox"
                name="showDescription"
                id="showDescription"
                formControlName="showDescription"
              />
              <p>Show Description</p>
            </label>
            <label
              class="flex cursor-pointer items-center gap-2"
              for="showOwner"
            >
              <input
                type="checkbox"
                name="showOwner"
                id="showOwner"
                formControlName="showOwner"
              />
              <p>Show Owner</p>
            </label>
          </div>
        </section>
        <section>
          <header class="mb-1">
            <p class="text-md m-0 font-semibold text-slate-500">Script:</p>
          </header>
          <div #code></div>
        </section>
        <section class="mt-2">
          <p class="text-sm text-slate-500">
            Copy the embed code and insert the snippet in your HTML file. Feel
            free to place the <strong>div</strong>
            anywhere you want the collection to be displayed.
          </p>
        </section>
        <footer class="mt-4 flex items-center gap-4">
          <button zzButton variant="primary" (click)="this.copy()">
            Copy Embed Code
          </button>
          <button zzButton variant="neutral" (click)="this.modalRef.close()">
            Close
          </button>
        </footer>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ReactiveFormsModule],
})
export class CollectionEmbedScriptGeneratorComponent implements AfterViewInit {
  embedScript = '';
  embedOptionsForm: FormGroup;
  highlighter?: shiki.Highlighter;
  attached = false;
  @ViewChild('code', { static: true }) code!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly clipboard: Clipboard,
    public readonly modalRef: ModalRef<Collection>,
    private readonly fb: FormBuilder
  ) {
    this.embedOptionsForm = this.fb.group<{
      showTitle: [boolean];
      showDescription: [boolean];
      showOwner: [boolean];
    }>({
      showTitle: [true],
      showDescription: [true],
      showOwner: [true],
    });
  }

  get modalData(): Collection {
    return this.modalRef.data;
  }

  async ngAfterViewInit() {
    shiki.setCDN('https://unpkg.com/shiki/');
    this.highlighter = await shiki.getHighlighter({
      theme: 'material-palenight',
      langs: ['html'],
    });
    const formValueChanges$: Observable<{
      showTitle: boolean;
      showDescription: boolean;
      showOwner: boolean;
    }> = this.embedOptionsForm.valueChanges.pipe(
      startWith({
        showTitle: true,
        showDescription: true,
        showOwner: true,
      })
    );
    formValueChanges$
      .pipe(
        map((options) => {
          const mainFunction = `showOff('${this.modalData.id}', {
    'showTitle': ${options.showTitle},
    'showDescription': ${options.showDescription},
    'showOwner': ${options.showOwner},
    'padding': 16
  })`;

          return `<div id="show-off-embed"></div>
<script src="https://show-off.adi.so/assets/scripts/embed.js" type="text/javascript"></script>
<script>
  ${mainFunction}
</script>`;
        })
      )
      .subscribe((script) => {
        this.updateEmbedScript(script);
      });
  }

  updateEmbedScript(script?: string) {
    this.embedScript = script ?? '';
    this.attachFormattedCodeToDOM(script);
    if (!this.attached) {
      const el = this.code.nativeElement.querySelector(
        '.shiki'
      ) as HTMLPreElement;
      el.style.padding = '16px';
      el.style.overflowX = 'auto';
    }
  }

  attachFormattedCodeToDOM(script?: string) {
    this.code.nativeElement.innerHTML =
      this.highlighter?.codeToHtml(script ?? '', {
        lang: 'html',
      }) ?? '';
  }

  copy() {
    this.clipboard.copy(this.embedScript);
  }
}
