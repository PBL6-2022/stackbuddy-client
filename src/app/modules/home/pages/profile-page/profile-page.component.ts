import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          return this.router
            .navigate(['/app/profile'], { queryParams: { tab: 'home' } });
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          return this.router
            .navigate(['/app/profile'], { queryParams: { tab: 'edit' } });
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        command: () => {
          return this.router
            .navigate(['/app/profile'], { queryParams: { tab: 'settings' } });
        },
      },
    ];
  }

  items!: MenuItem[];
  filter$!: Observable<ParamMap>;
  paramsSubscription!: Subscription;
  currentProfileTab = 'home';
  availableTab = ['home', 'edit', 'settings'];
  tabIndex: number = 0;

  ngOnInit(): void {
    this.filter$ = this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => params),
    );

    this.paramsSubscription = this.filter$.subscribe((param: ParamMap) => {
      const currentTab = param.get('tab') || 'home';
      if (this.availableTab.includes(currentTab)) {
        this.currentProfileTab = currentTab;
        this.tabIndex = this.availableTab.findIndex(item => item === currentTab);
        this.tabIndex = this.tabIndex === -1 ? 0 : this.tabIndex;
        console.log(this.tabIndex);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
