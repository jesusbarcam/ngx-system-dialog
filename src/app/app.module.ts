import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SystemDialogModule } from '../lib/systemDialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SystemDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
