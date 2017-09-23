import { Injectable, ComponentFactoryResolver, ViewContainerRef, TemplateRef, ComponentRef } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { SystemDialogSetup } from './models/systemDialogSetup.model';


export * from './models/SystemDialogSetup.model';




@Injectable()
export class SystemDialogService {


  public static readonly SYSTEM_DIALOG_CANCELED: string = 'cancel-dialog';


  private visible: BehaviorSubject<boolean>;
  public visible$: Observable<boolean>;

  private closeAndSendResult: Subject<any>;
  private dialogResult$: Observable<any>;

  private dialogCanceled: Subject<any>;
  private dialogCanceled$: Observable<any>;

  private rootViewContainer: ViewContainerRef;
  private _payload: any;





  /**
   * @method
   * @constructor
   * @param factoryResolver
   */
  constructor( private factoryResolver: ComponentFactoryResolver) {

    this.visible = new BehaviorSubject<boolean>( false );
    this.visible$ = this.visible.asObservable();

    this.closeAndSendResult = new Subject<any>();
    this.dialogResult$ = this.closeAndSendResult.asObservable();

    this.dialogCanceled = new Subject<any>();
    this.dialogCanceled$ = this.dialogCanceled.asObservable();

  }// Constructor





  /**
   * @method
   * @public
   * @param viewContainerRef
   * @description
   */
  public setRootViewContainerRef( viewContainerRef: ViewContainerRef ) {
    this.rootViewContainer = viewContainerRef;
  }// SetRootViewContainerRef






  /**
   * @method
   * @public
   * @param viewContainerRef
   * @description
   */
  public createDialog<T>( templateOrComponentRef: any, payload?: any, setup?: SystemDialogSetup) {
    console.log("CREATE DIALOG IN SYSTEM DIALOG SERVICE!");
    // Chequeamos que el contenedor donde vamos a
    // añadir la modal que vamos a crear este correctamente formada.
    this.checkModalContainer();
    // Eliminamos el contenido actual del contenedor
    this.rootViewContainer.clear();
    // Y por ultimo introducimos el nuevo componente que queremos
    // mostrar dentro de nuestro modal.
    const factory = this.factoryResolver.resolveComponentFactory( templateOrComponentRef );
    const component = factory.create( this.rootViewContainer.parentInjector );
    this.rootViewContainer.insert( component.hostView );

    this._payload = payload;
    this.open();

    return { result: this.dialogResult$, canceled: this.dialogCanceled$ };

  }// CreateDialog








  /**
   * @method
   * @private
   * @description
   */
  private checkModalContainer() {
    if ( !this.rootViewContainer ) {
      return console.error(
        '[ERROR][SystemDialogService] The RootViewContainer is undefined, we need these container for that it can make a nice work.'); 
    }// If
  }// CheckModalContainer




  /**
   * @method
   * @private
   * @description
   */
  private isCanceledDialog(result: any) {
    return ( result === SystemDialogService.SYSTEM_DIALOG_CANCELED );
  }// IsCanceledDialog




  /**
   * @method
   * @private
   * @description
   */
  private  executeCanceledDialogProcess() {
    this.dialogCanceled.next();
    this.visible.next( false );
  }// executeCanceledDialogProcess



  private executeResultProcess(result: any) {

    if ( result === undefined || result === null ) {
      result = this._payload;
    }// If

    this.closeAndSendResult.next( result );
    this.visible.next( false );

  }// ExecuteResultProcess



  /**
   * @method
   * @public
   * @description
   */
  public open() {
    if ( !this.visible.getValue() ) {
      this.visible.next( true );
    }// If
  }// Open




  /**
   * @method
   * @public
   * @description
   */
  public close(result?: any ) {

    if ( this.visible.getValue() ) {
      if ( this.isCanceledDialog( result ) ) {
        return this.executeCanceledDialogProcess();
      }// If
      this.executeResultProcess( result );
    }// If

  }// Close






  public get payload() {
    return this._payload;
  }// Payload


}// SystemDialogService
