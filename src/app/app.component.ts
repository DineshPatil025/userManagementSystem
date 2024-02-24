import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'userManagementSystem';


  isLoading !: boolean;


  constructor(private _loaderSrvice: LoaderService) {

  }
  ngOnInit(): void {
    this._loaderSrvice.loaderbehaviourSubject$
      .subscribe(res => {
        this.isLoading = res;
      })
  }

}
