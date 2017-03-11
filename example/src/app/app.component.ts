import { Component } from '@angular/core';
import { HelloWorld } from 'angular2-d3plus';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}} </h1>`,
})
export class AppComponent  { name = 'Angular';
  constructor(){

  }
}
