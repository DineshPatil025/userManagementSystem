import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iusers } from 'src/app/shared/models/users';
import { UserdataService } from 'src/app/shared/services/userdata.service';

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
    this._userService.deleteUser(deletid)
    this._toastService.error("User Deleted Succesfully", "Delete")

  }

}
