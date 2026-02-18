import { ApplicationRef, DOCUMENT, Injectable, Type, createComponent, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttachComponentService {
  applicationRef = inject(ApplicationRef);
  document = inject(DOCUMENT);

  attachComponent(component: Type<unknown>): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const componentName = (component as any).name.slice(1);

    const hostElement = this.document.getElementById(componentName) as Element;

    const environmentInjector = this.applicationRef.injector;
    const componentRef = createComponent(component, { hostElement, environmentInjector });

    this.applicationRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
  }
}
