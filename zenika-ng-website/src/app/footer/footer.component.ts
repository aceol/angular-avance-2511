import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected fullYear = new Date().getUTCFullYear();
  #apiService = inject(ApiService);
  #document = inject(DOCUMENT);

  protected __kaboom__() {
    this.#apiService
      .__kaboom__()
      .subscribe(() => this.#document.location.reload());
  }
}
