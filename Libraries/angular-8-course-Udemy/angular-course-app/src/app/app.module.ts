import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [ // all the components we use (unless auto-scanning)
    AppComponent,
    ServerComponent
  ],
  imports: [ // add other modules to our module
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent] // the components angular should know when bootstrapping the app.
})
export class AppModule { }
