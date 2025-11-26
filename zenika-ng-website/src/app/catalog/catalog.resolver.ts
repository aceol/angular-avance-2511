import { inject } from "@angular/core";
import { catchError, EMPTY, zip } from "rxjs";
import { BasketService } from "../basket/basket.service";
import { CatalogService } from "./catalog.service";
import { AlertService } from "../alert/alert.service";

export const catalogResolver = () => {
    return zip(
      [
      inject(CatalogService).fetch(),
      inject(BasketService).fetch()
    ]).pipe(
        catchError(() => {
          inject(AlertService).addDanger("😲 Désolé, impossible d'accéder au catalogue.");
          return EMPTY;
        }),
    )
}