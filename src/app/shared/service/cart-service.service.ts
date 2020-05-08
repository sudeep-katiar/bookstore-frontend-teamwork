import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  private _autoRefresh$ = new Subject();
  private customerDetails = new Subject<any>();
  private setbugetTotal = new Subject<any>();

  get autoRefresh$() {
    return this._autoRefresh$;
  }
  constructor(private http: HttpClient, private httpservice: HttpService) {}

  addToBag(id, quantity): Observable<any> {
    return this.httpservice
      .postWithoutHeader(
        `${environment.cartApiUrl}/${environment.addToBag}?bookId=${id}&qty=${quantity}`,
        {}
      )
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }
  removeFromeBag(id): Observable<any> {
    return this.httpservice
      .deleteWithoutToken(
        `${environment.cartApiUrl}/${environment.deleteOrder}?bookId=${id}`
      )
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  getCartList(): Observable<any> {
    return this.httpservice.getWithoutHeader(
      `${environment.cartApiUrl}/${environment.cartList}`
    );
  }
  updateOrderQuantity(order): Observable<any> {
    return this.httpservice
      .putWithOutToken(
        `${environment.cartApiUrl}/${environment.updateQuantity}`,
        order
      )
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }
  confirmOrder(order): Observable<any> {
    console.log(order);
    return this.httpservice
      .putWithOutToken(
        `${environment.cartApiUrl}/${environment.confirmOrder}`,
        order
      )
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }
  setCustomerDetails(message: any) {
    this.customerDetails.next({ customer: message });
  }
  getCustomerDetails(): Observable<any> {
    return this.customerDetails.asObservable();
  }
  setBudgetTotal(message: any) {
    return this.setbugetTotal.next({ total: message });
  }
  getBudgetTotal(): Observable<any> {
    return this.setbugetTotal.asObservable();
  }
}
