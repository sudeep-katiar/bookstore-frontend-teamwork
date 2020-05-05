import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UserService } from "src/app/shared/service/user.service";

@Component({
  selector: "app-activate-user",
  templateUrl: "./activate-user.component.html",
  styleUrls: ["./activate-user.component.scss"],
})
export class ActivateUserComponent implements OnInit {
  activeForm: FormGroup;
  token: string;
  showSpinner = false;

  constructor(
    private userservice: UserService,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private route2: Router,
    private spinner: NgxSpinnerService
  ) {}
  onActiveSubmit() {
    console.log("---------------------------------------");
    this.showSpinner = true;
    this.token = this.route.snapshot.paramMap.get("token");
    this.userservice.activateUser(this.activeForm, this.token).subscribe(
      (user) => {
        this.route2.navigate([""]);
        this.matSnackBar.open("Your Account Verified SuccessFully", "ok", {
          duration: 4000,
        });
        this.showSpinner = false;
      },
      (error: any) => {
        this.showSpinner = false;
        this.matSnackBar.open("Bad Creaditial", "ok", { duration: 4000 });
        console.log(error);
      }
    );
    // alert(this.user.firstName + ' ' + this.user.email + ' ' + this.user.password);
  }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get("token");
    });
  }
}
