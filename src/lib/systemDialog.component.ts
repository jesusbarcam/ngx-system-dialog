import { Component, OnInit, Input, Output, OnDestroy, ViewContainerRef, ViewChild,
         ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SystemDialogService } from './systemDialog.service';



type StatesOfDialog =  'startShow' | 'startHide' | 'wait'  ;



@Component({
  selector: 'system-dialog',
  templateUrl: './systemDialog.component.html',
  styleUrls: ['./systemDialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})// Component




export class SystemDialogComponent implements OnInit, OnDestroy {


  private visible: boolean;
  private backmaskState: StatesOfDialog;
  private dialogState: StatesOfDialog;
  private subscription: Subscription;


  @ViewChild('dynamicContent', {read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;



  /**
   * @method
   * @constructor
   */
  constructor( private dialogService: SystemDialogService,
               private changeDetector: ChangeDetectorRef ) {

    this.visible = false;
    this.backmaskState = 'wait';
    this.dialogState = 'wait';

  }// Constructor





  /**
   * @method
   * @public
   * @lifecycle
   */
  ngOnInit() {
    this.dialogService.setRootViewContainerRef( this.viewContainerRef );
    this.inicializeSubscriptions();
  }// NgOnInit




  /**
   * @method
   * @public
   * @lifecycle
   */
  ngOnDestroy() {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }// If
  }// OnDestroy




  /**
   * @method
   * @private
   * @description
   */
  private inicializeSubscriptions() {
    this.subscription = this.dialogService.visible$
    .subscribe((newDialogState: boolean) => {
      // Manejamos la visibilidad según el
      // nuevo estado que se solicite que adopte
      // el componente.
      this.handlerForVisibility( newDialogState );

    }); // Observable
  }// InicializeSubscription






  /**
   * @method
   * @private
   * @param newState
   * @description
   *
   */
  private handlerForVisibility( newState: boolean ) {
    if ( newState ) {
      return this.initProgressOfShowComponent();
    }// If
    this.initProgressOfHideComponent();
  }// HandlerFOrVisibility





  /**
   * @method
   * @private
   * @description
   * Método que inicia el proceso para ocultar
   * el componente
   */
  private initProgressOfHideComponent() {
    if ( this.visible ) {

      this.dialogState = 'startHide';
      this.changeDetector.markForCheck();

      setTimeout(() => {
        this.backmaskState = 'startHide';
        this.changeDetector.markForCheck();
      }, 200);


      setTimeout(() => {
        this.visible = false;
        this.dialogState = 'wait';
        this.backmaskState = 'wait';
        this.changeDetector.markForCheck();
      }, 1000);

    }// If
  }// InitProgressOfHideComponent




  /**
   * @method
   * @private
   * @description
   * Método que inicia el proceso para mostrar el
   * componente en la vista donde este insertado.
   */
  private initProgressOfShowComponent() {

    if ( !this.visible ) {

      this.visible = true;
      this.backmaskState = 'startShow';
      this.changeDetector.markForCheck();

      setTimeout(() => {
        this.dialogState = 'startShow';
        this.changeDetector.markForCheck();
      }, 200);
    }// If

  }// InitProgressOfShowComponent





  /**
   * @method
   * @private
   * @description
   * Método que cierra el dialogo mediante
   * la llamada al servicio para que sea el
   * servicio el que reactive el estado de todos
   * los componentes que se relacionan con este componente.
   */
  private closeDialog() {
    this.dialogService.close( SystemDialogService.SYSTEM_DIALOG_CANCELED );
  }// CloseDialog



}// SystemDialgoComponent
