import {NativeDateAdapter} from '@angular/material';
import {Injectable}        from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {

    constructor(matDateLocale: string) {
        super(matDateLocale, new Platform());
    }
    
    getFirstDayOfWeek(): number {
        return 1;
    }

}