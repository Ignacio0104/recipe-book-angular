import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipe';
  // onNavigate(fetaure: string) {
  //   this.loadedFeature = fetaure;
  // }
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkLogin();
  }
}
