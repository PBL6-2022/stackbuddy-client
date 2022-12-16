import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  srcAvatar: string = '';
  shouldDisplayDropdownContent: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  items!: any[];
  rightBarItems!: any[];

  ngOnInit() {
    this.items = [
      {
        label: '',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Bookmark',
        icon: 'pi pi-fw pi-bookmark',
      },
      {
        label: 'History',
        icon: 'pi pi-fw pi-history',
      },
    ];

    this.rightBarItems = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Trending',
        icon: 'pi pi-fw pi-sort-amount-up-alt',
      },
      {
        separator:true
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',  
      }
    ]
  }

  handleAvatarClick() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  switchDropdown() {
    this.shouldDisplayDropdownContent = !this.shouldDisplayDropdownContent;
  }
}
