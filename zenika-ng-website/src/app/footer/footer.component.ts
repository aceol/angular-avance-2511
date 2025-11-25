import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: false,
})
export class FooterComponent {
  protected fullYear = new Date().getUTCFullYear();

  constructor(
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  protected __kaboom__() {
    this.apiService.__kaboom__().subscribe(() => this.document.location.reload());
  }
}
