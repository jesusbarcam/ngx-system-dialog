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



  public openDialog() {

    this.systemDialog.createDialog( DynamicDialogComponent )
    .subscribe((result) => {
      console.log( 'CLOSE AND RESULT OF SYSTEM DIALOG! ' );
    });

  }// OpenDialog


} // AppComponent
