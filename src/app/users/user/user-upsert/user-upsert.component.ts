import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Iusers } from 'src/app/shared/models/users';
import { UserdataService } from 'src/app/shared/services/userdata.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss']
})
export class UserUpsertComponent implements OnInit {

  userArr !: Array<Iusers>;
  userUpsertForm !: FormGroup;
  isFormSubmitted: boolean = false;
  updateId !: string;
  isInEditMode: boolean = false;



  constructor(

    private _fb: FormBuilder,
    private _userService: UserdataService,
    private _toastService: ToastrService,


  ) {
    this.createUserUpsert()
  }

  ngOnInit(): void {

    this._userService.editUserSubjectAsObs$
        .subscribe((res:any) => {
          if(res){
            this.isInEditMode = true;
            this.userUpsertForm.patchValue(res)
            this.updateId = res.userid;
            
          }
        })
  }


  // ### CREATE FORM
  createUserUpsert() {
    this.userUpsertForm = this._fb.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      mobnumber: [null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      address: this._fb.group({
        street: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: [null, [Validators.required]],
        pincode: [null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]],
      })
    })
  }

  // ### ADD NEW USER

  onUserAdd() {
    this.isFormSubmitted = true;

    if (this.userUpsertForm.valid) {
      let newUserObj = this.userUpsertForm.value;
      this._userService.addNewUser(newUserObj);
      this.userUpsertForm.reset()
      this.isFormSubmitted = false;
      this._toastService.success("New User Added Succesfully", "User Added");


    } else {
      this._toastService.error("enter Missing Details", "Error")
    }

  }

  onUserUpdate() {
    console.log("update clicked");
    let updateUserObj = this.userUpsertForm.value;
    this._userService.updateuser(updateUserObj,this.updateId)
    this._toastService.success("User Updated Succesfully", "User Update")
    this.isInEditMode = false;
    this.userUpsertForm.reset();
  }

  get f() {
    return this.userUpsertForm.controls;
  }
  get addrsControl() {
    return (this.userUpsertForm.controls['address'] as FormGroup).controls
  }

}
