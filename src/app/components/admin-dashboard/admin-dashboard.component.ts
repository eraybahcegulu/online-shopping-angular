import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  userInfo: any;
  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout()
  }

    ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        console.log(userInfo);
        this.userInfo = userInfo;
      }
    );
  }
}
