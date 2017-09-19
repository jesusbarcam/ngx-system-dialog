import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemDialogComponent } from './systemDialog.component';
import { SystemDialogService } from './systemDialog.service';
import { DialogRef } from './dialogRef.service';




@NgModule({
  declarations: [ SystemDialogComponent],
  exports: [ SystemDialogComponent ],
  imports: [ CommonModule ]
})

export class SystemDialogModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SystemDialogModule,
      providers: [ SystemDialogService, DialogRef ]
    }; // Return
  } // ForRoot
}// SystemDialogModule
