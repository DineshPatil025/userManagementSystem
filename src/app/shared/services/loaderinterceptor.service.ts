import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, delay, finalize, takeUntil } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderinterceptorService implements HttpInterceptor {



  private unSubscribeAll$: Subject<void> = new Subject();
  unSubscribeAllAsObs = this.unSubscribeAll$.asObservable();

  constructor(private _loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.loaderbehaviourSubject$.next(true);
    return next.handle(req)
      .pipe(
        takeUntil(this.unSubscribeAll$),
        delay(1500),
        finalize(() => {
          this._loaderService.loaderbehaviourSubject$.next(false)
        })
      )
  }

  unSubscribeAll() {
    this.unSubscribeAll$.next()
    this.unSubscribeAll$.complete()
  }
}
