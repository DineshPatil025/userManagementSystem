import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  isLoading !: boolean;
  constructor(
    private _loaderSrvice: LoaderService

  ) { }

  ngOnInit(): void {

    this._loaderSrvice.loaderbehaviourSubject$
    .subscribe(res => {
      this.isLoading = res;
    })
  }

}
