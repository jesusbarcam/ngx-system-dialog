import { Component } from '@angular/core';
import { SystemDialogService } from '../lib/systemDialog.service';

import { DynamicDialogComponent } from './components/dynamicDialog/dynamicDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  constructor(private systemDialog: SystemDialogService) {}// Constructor



  /**
   * @method
   * @public
   * @description
   */
  public openDialog(event: Event) {
    console.log("LLEGA EL EVENTO DE INICIO A CREATE DIALOG!");
    this.systemDialog.createDialog( DynamicDialogComponent, null, null ).result
    .subscribe(( result ) => {
      console.log( 'CLOSE AND RESULT OF SYSTEM DIALOG! ' );
    }); // CreateDialog

  }// OpenDialog


} // AppComponent
