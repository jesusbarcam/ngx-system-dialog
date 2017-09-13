import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemDialogComponent } from './systemDialog.component';
import { SystemDialogService } from './systemDialog.service';
import { DialogRef } from './dialogRef.service';



@NgModule({
  declarations: [
    SystemDialogComponent
  ],
  exports: [
    SystemDialogComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SystemDialogService,
    DialogRef
  ],
  entryComponents: [
    // ConfirmationDialogComponent
  ],
})// NgModule
export class SystemDialogModule {
}// SystemDialogModule
