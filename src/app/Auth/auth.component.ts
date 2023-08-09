import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlacerHolderDirective } from '../shared/placerholder/placerholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  loginMode: boolean = true;
  isLoading = false;
  isError: string = null;
  @ViewChild(PlacerHolderDirective) alertHost: PlacerHolderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onHandleClose() {
    this.isError = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = form.value;
    let authObservable: Observable<AuthResponseData>;
    if (this.loginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.isError = error;
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
