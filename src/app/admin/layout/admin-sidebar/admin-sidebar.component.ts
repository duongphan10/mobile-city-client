import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css',
  '../../assets/css/main.css'
  ]
})
export class AdminSidebarComponent {
  token: any;
  type: any;
  id: any;
  object: User = {
    username: '',
    fullName: '',
    gender: '',
    birthday: '',
    phone: '',
    email: '',
    avatar: '',
    accountNonExpired: '',
    accountNonLocked: '',
    enabled: '',
    roleName: '',
  };

  constructor(

    private adminUserService: AdminUserService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getToken();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.getCurrentUser();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getCurrentUser() {
    this.adminUserService.getCurrent(this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.object = data.data;
      }
    });
  }

}
