import { Injectable } from '@angular/core';

import { SystemDialogService } from './systemDialog.service'; 


@Injectable()
export class DialogRef {
  

  constructor(private systemDialogService: SystemDialogService) {
  }// Constructor


  public get payload() {
    return this.systemDialogService.payload;
  }// GetPayload


  public closeDialog(result?: any) {
    this.systemDialogService.close( result );
  }// CloseDialog


}// DialogRef