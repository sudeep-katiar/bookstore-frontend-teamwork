import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/shared/service/user.service";
import { BookService } from "src/app/shared/service/book.service";
import { CartServiceService } from "src/app/shared/service/cart-service.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  name: any;
  id: any;
  isUser = false;
  isSeller = false;
  bookName: string;
  totalItem;
  isbudget = false;
  constructor(
    private userService: UserService,
    private cartService: CartServiceService,
    private bookService: BookService
  ) {
    this.name = sessionStorage.firstName + sessionStorage.lastName;
    this.userService.getQueryParam().subscribe((message) => {
      this.id = message.id;
      if (this.id === 1) {
        this.isSeller = false;
        this.isUser = true;
      } else if (this.id === 2) {
        this.isSeller = true;
      }
    });
  }

  ngOnInit() {
    this.getBudgetTotal();
  }

  onClickClear() {
    sessionStorage.clear();
    localStorage.clear();
  }
  bookSearch() {
    // console.log(this.bookName);
    this.bookService.setSearchBookData(this.bookName);
  }
  getBudgetTotal() {
    this.cartService.getBudgetTotal().subscribe((data) => {
      this.totalItem = data.total + 1;
      console.log("sghsghsgshgh" + this.totalItem);
      if (this.totalItem != null) {
        console.log("if condion");
        this.isbudget = true;
      }
    });
  }
}
