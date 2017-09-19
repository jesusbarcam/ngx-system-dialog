import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SystemDialogModule } from '../lib/systemDialog.module';
import { DynamicDialogComponent } from './components/dynamicDialog/dynamicDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicDialogComponent
  ],
  imports: [
    BrowserModule,
    SystemDialogModule.forRoot(),
  ],
  entryComponents: [
    DynamicDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
