import { Injectable } from '@angular/core';
import { Iusers } from '../models/users';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  userUrl: string = `${environment.baseUrl}/users.json`
  
  userArr !:Array<Iusers>


  private newUserSubject$ = new Subject();
  newUserSubjectAsObs$ = this.newUserSubject$.asObservable();

  private deleteUserSubject$ = new Subject();
  deleteUserSubjectAsObs$ = this.deleteUserSubject$.asObservable();

  private editUserSubject$ = new Subject();
  editUserSubjectAsObs$ = this.editUserSubject$.asObservable();

  constructor(private _http: HttpClient) {
  
  }


  getAllUsers() {
   return this._http.get(this.userUrl)
      .pipe(
        map((res:any) => {
          this.userArr = []
          for (const key in res) {
            this.userArr.push({...res[key],userid:key})

          }
          return this.userArr

        })


      )
  }


  addNewUser(newUserObj: Iusers) {
    this._http.post(this.userUrl, newUserObj).subscribe((res: any) => {
      this.newUserSubject$.next({ ...newUserObj, userid: res['name'] })

    });
  }


  deleteUser(deleteid: string) {
    let deleteUrl = `${environment.baseUrl}/users/${deleteid}.json`
    this._http.delete(deleteUrl).subscribe();
    this.deleteUserSubject$.next(deleteid);
  }

  editUser(editUserObj:Iusers){
    this.editUserSubject$.next(editUserObj)
  }

}
