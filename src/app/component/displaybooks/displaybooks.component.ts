import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MatSnackBar, TooltipPosition } from "@angular/material";
import { FormBuilder, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BookService } from "src/app/shared/service/book.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/shared/service/user.service";
import { AddbookComponent } from "../addbook/addbook.component";
import { CartServiceService } from "src/app/shared/service/cart-service.service";
import { UpdateBookComponent } from "../update-book/update-book.component";
import { UploadBookimageComponent } from "../addbook/upload-bookimage/upload-bookimage.component";

@Component({
  selector: "app-displaybooks",
  templateUrl: "./displaybooks.component.html",
  styleUrls: ["./displaybooks.component.scss"],
})
export class DisplaybooksComponent implements OnInit {
  books: any;
  size: number;
  id: any;
  isUser = false;
  isSeller = false;
  toggle = true;
  bookSearch: any;
  selectedOption: any;
  sortbyprice = "none";
  page: number = 1;
  budgetTotal;
  constructor(
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private bookService: BookService,
    private userService: UserService,
    private cartService: CartServiceService
  ) {
    this.userService.getQueryParam().subscribe((message) => {
      this.id = message.id;
      if (this.id === "user") {
        this.isSeller = false;
        this.isUser = true;
        this.getAllBookList();
      } else if (this.id === "seller") {
        this.isSeller = true;
        this.getSellerBook();
      }
    });
    this.bookService.autoRefresh$.subscribe(() => {
      this.getAllBookList();
      this.getSellerBook();
    });

    this.setBudgetTotal();
    this.getCartItems();
  }

  ngOnInit() {}

  getAllBookList() {
    this.bookService.getBookList().subscribe((message) => {
      console.log(message);
      this.books = message.bookList;
      this.size = message.bookList.length;
    });

    this.getSearchBookData();
  }

  getSellerBook() {
    this.bookService.getSellerBookList().subscribe((message) => {
      console.log(message);
      this.books = message.bookList;
      this.size = message.bookList.length;
    });
    this.getSearchBookData();
  }
  addBook() {}

  deleteBook(bookId) {
    this.bookService.deleteBook(bookId).subscribe((meassage) => {
      this.matSnackBar.open("Book Deleted Successfully", "OK", {
        duration: 4000,
      });
    });
    // this.matSnackBar.open("Error in Book Deletion", "ok", { duration: 4000 });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddbookComponent, {
      width: "auto",
      panelClass: "custom-dialog-container",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openImageDialog(bookId): void {
    // this.bookid = this.bookForm.controls["bookCode"].value;
    const dialogRef = this.dialog.open(UploadBookimageComponent, {
      width: "auto",
      panelClass: "custom-dialog-container",
      data: { bookId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      width: "auto",
      panelClass: "custom-dialog-container",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  addToBag(bookId, quantity) {
    // this.toggle = !this.toggle;
    this.cartService.addToBag(bookId, 1).subscribe((message) => {
      console.log(message);
      this.matSnackBar.open("Book Added to Bag SuccessFully", "OK", {
        duration: 4000,
      });
      this.setBudgetTotal();
    });
  }

  getSearchBookData() {
    this.bookService.getSearchBookData().subscribe((message) => {
      console.log("search data", message.books);
      this.bookSearch = message.books;
    });
  }
  onclicksort() {
    if (this.selectedOption === "none") {
      this.ngOnInit();
    }
    this.sortbyprice = this.selectedOption;
    console.log(this.sortbyprice);
  }

  getCartItems() {
    this.cartService.getCartList().subscribe((message) => {
      console.log("sss");
      this.budgetTotal = message.orders.length;
    });
  }
  setBudgetTotal() {
    this.getCartItems();
    this.cartService.setBudgetTotal(this.budgetTotal);
  }
}
