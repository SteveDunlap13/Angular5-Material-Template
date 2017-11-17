
import { Component, Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { ComponentType, Portal, ComponentPortal, DomPortalHost } from '@angular/cdk/portal';



@Component({
    selector: 'loading-spinner',
    template: `
      <div class="wrapper">
      <mat-spinner></mat-spinner>
      </div>
    `,
    styles: [`
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        background: rgba(0,0,0,0.2);
        z-index: 9999;
      }
    `]
})
export class LoadingSpinnerComponent { }



@Injectable()
export class LoadingSpinnerService {

    // 1. Reference to our Portal.
    //    This is the portal we'll use to attach our LoadingSpinnerComponent.
    private loadingSpinnerPortal: ComponentPortal<LoadingSpinnerComponent>;

    // 2. Reference to our Portal Host.
    //    We use DOMPortalHost as we'll be using document.body as our anchor.
    private bodyPortalHost: DomPortalHost;


    // 3. Inject the dependencies needed by the DOMPortalHost constructor
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {

        // 4. Create a Portal based on the LoadingSpinnerComponent
        this.loadingSpinnerPortal = new ComponentPortal(LoadingSpinnerComponent);

        // 5. Create a PortalHost with document.body as its anchor element
        this.bodyPortalHost = new DomPortalHost(
            document.body,
            this.componentFactoryResolver,
            this.appRef,
            this.injector);
    }

    reveal() {

        // 6. Attach the Portal to the PortalHost.
        if (!this.bodyPortalHost.hasAttached()) {
            this.bodyPortalHost.attach(this.loadingSpinnerPortal);
        }
    }

    hide() {

        // 7. Detach the Portal from the PortalHost
        if (this.bodyPortalHost.hasAttached()) {
            this.bodyPortalHost.detach();
        }
    }
}
