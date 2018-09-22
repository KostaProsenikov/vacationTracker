import {
    HttpResponse,
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
// tslint:disable-next-line:import-spacing
}
from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
        // .pipe(
        //     tap((res: any) => {
        //         if (res instanceof HttpResponse && res.body) {

        //         }
        //     })
        // );
    }
}
