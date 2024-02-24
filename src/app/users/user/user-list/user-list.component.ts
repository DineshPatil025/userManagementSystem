import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iusers } from 'src/app/shared/models/users';
import { UserdataService } from 'src/app/shared/services/userdata.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userArr: Array<Iusers> = [];
  updateId !: string;

  constructor(
    private _userService: UserdataService,
    private _toastService: ToastrService,
  ) { }

  ngOnInit(): void {


    this._userService.getAllUsers()
    .subscribe(res => {
      this.userArr = res;
    })

    this._userService.newUserSubjectAsObs$
      .subscribe((res: any) => {
        this.userArr.push(res);
        

      })

      this._userService.deleteUserSubjectAsObs$
      .subscribe(res => {
        let deleteIndex = this.userArr.findIndex(user => user.userid === res)
        this.userArr.splice(deleteIndex,1)
                    
      })

      this._userService.updateUserSubjectAsObs$
      .subscribe((res:any) => {
        let updateIndex = this.userArr.findIndex(user => user.userid === res.userid)
        this.userArr[updateIndex] = res;
      })
  }

  onUserEdit(editUserObj: Iusers) {
    this._userService.editUser(editUserObj)

  }

  onUserDelete(deletid: string) {
    
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure You want to?",
      text: "You won't be able to revert this!",     
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(deletid)
        this._toastService.warning("User Deleted Succesfully", "Delete")
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this._toastService.success("User is not deleted", "Delete")
      }
    })
    console.log(this.userArr);


    // this._userService.deleteUser(deletid)
    // this._toastService.error("User Deleted Succesfully", "Delete")

  }

}
