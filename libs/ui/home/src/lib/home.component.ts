import { Component } from '@angular/core';

@Component({
  selector: 'show-off-home',
  template: ` <div class="box">
    <h1 class="page-header-text">Home</h1>
    <section></section>
    <section>
      <header>
        <h2>Inspirations</h2>
      </header>
    </section>
  </div>`,
  standalone: true,
})
export class HomeComponent {}
