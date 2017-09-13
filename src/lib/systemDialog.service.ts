import{ Injectable, ComponentFactoryResolver, ViewContainerRef, TemplateRef, ComponentRef } from '@angular/core';
import{ Observable, BehaviorSubject, Subject } from 'rxjs';




@Injectable()
export class SystemDialogService {



  private visible: BehaviorSubject<boolean>;
  public visible$: Observable<boolean>;

  private closeAndSendResult:Subject<any>;
  private dialogResult$: Observable<any>;

  private rootViewContainer: ViewContainerRef;
  private _payload: any;





  constructor( private factoryResolver: ComponentFactoryResolver) {
    
    this.visible = new BehaviorSubject<boolean>(false);
    this.visible$ = this.visible.asObservable();

    this.closeAndSendResult = new Subject<any>();
    this.dialogResult$ = this.closeAndSendResult.asObservable();

  }// Constructor




  /**
   * @method
   * @public
   * @param viewContainerRef 
   * @description
   */
  public setRootViewContainerRef( viewContainerRef:ViewContainerRef ) {
    this.rootViewContainer = viewContainerRef;
  }// SetRootViewContainerRef




  /**
   * @method
   * @public
   * @param viewContainerRef
   * @description 
   */
  public createDialog<T>( templateOrComponentRef: any, payload?:any) {
    //Chequeamos que el contenedor donde vamos a 
    //añadir la modal que vamos a crear este correctamente formada.
    this.checkModalContainer();
    //Eliminamos el contenido actual del contenedor
    this.rootViewContainer.clear();
    // Y por ultimo introducimos el nuevo componente que queremos 
    // mostrar dentro de nuestro modal.
    const factory = this.factoryResolver.resolveComponentFactory( templateOrComponentRef );
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert( component.hostView );

    this._payload = payload;

    return this.dialogResult$;

  }// CreateDialog








  /**
   * @method
   * @private
   * @description
   */
  private checkModalContainer() {
    if( !this.rootViewContainer ) {
      return console.error('[ERROR][SystemDialogService] The RootViewContainer is undefined, we need these container for that it can make a nice work.'); 
    }//if
  }// CheckModalContainer






  /**
   * @method
   * @public
   * @description
   */
  public open() {
    if( !this.visible.getValue() ) {
      this.visible.next( true );
    }// If
  }// Open


  


  /**
   * @method
   * @public
   * @description
   */
  public close(result?: any ) {
    if( this.visible.getValue() ) {
      
      if( result === undefined || result === null ) {
        result = this._payload;
      }// if
      
      this.visible.next( false );
      this.closeAndSendResult.next( result );
    
    }// If
  }// Close




  
  public get payload() {
    return this._payload;
  }// Payload


}// SystemDialogService