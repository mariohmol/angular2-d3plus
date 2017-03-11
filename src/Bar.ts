
import {Component} from '@angular/core';
import {BaseChart} from './basechart';

@Component({
    selector: 'd3plusBar',
    styles: [`
       h1 {
            color: blue;
        }
    `],
    template: `<div>
                  <h1 (click)="onClick()">{{message}}</h1>
               </div>`
})
export class Bar extends BaseChart{

    message = "Click Me ...";

    onClick() {
        this.message = "Hello World!";
        console.log(this.message);

    }

}
