import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('User');
  }

  ngOnInit() {
  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = { username: 'zapien', password: 'nattalie123' };
    if (user.username != null && user.password != null) {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log the user in
        //store user in localStorage
        this.localStorageService.saveItemsToLocalStorage(user);
        // navigate to contacts page
        this.router.navigate(['contacts', user]);
      } else {
        // show error toast user
        this.toastService.ShowToast('danger', 15000, 'Login failed! Please check your username or password!');
      }
    } else {
        // show error toast user

        this.toastService.ShowToast('danger', 15000, 'Login failed! Please check your username or password!');
      }
    }
  }
