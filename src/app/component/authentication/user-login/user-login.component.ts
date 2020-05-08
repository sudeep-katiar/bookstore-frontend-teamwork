import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/model/user.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "src/app/shared/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"],
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  showSpinner = false;
  loginForm: FormGroup;
  hide = true;
  userPage = "user";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log("ngoninit---------------------------------------");
    this.spinner.show();
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9.%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required]],
    });
  }
  onloginSubmit() {
    this.showSpinner = true;
    console.log("---------------------------------------");
    this.userservice.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        this.matSnackBar.open("Successfully Loged In Wellcome", "ok", {
          duration: 5000,
        });

        sessionStorage.setItem("token", response.token);
        localStorage.setItem("lastName", response.lastName);
        localStorage.setItem("firstName", response.firstName);
        this.router.navigate(["dashboard/user"]);
        this.showSpinner = false;
      },
      (error: any) => {
        this.showSpinner = false;
        this.matSnackBar.open(error.error.error, "ok", {
          duration: 3000,
        });
      }
    );
  }
  onAdminLoginSubmit() {
    this.showSpinner = true;
    console.log("---------------------------------------");
    this.userservice.loginAdmin(this.loginForm.value).subscribe(
      (response) => {
        this.matSnackBar.open("Successfully Loged In Wellcome", "ok", {
          duration: 5000,
        });
        sessionStorage.setItem("token", response.token);
        localStorage.setItem("lastName", response.lastName);
        localStorage.setItem("firstName", response.firstName);
        localStorage.setItem("isLogin", "true");
        this.router.navigate(["dashboard/seller"]);
        this.showSpinner = false;
      },
      (error: any) => {
        this.showSpinner = false;
        this.matSnackBar.open(error.error.error, "ok", {
          duration: 3000,
        });
      }
    );
  }
  get f() {
    return this.loginForm.controls;
  }
}
