import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HelloWorld } from 'angular2-d3plus';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, HelloWorld ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
