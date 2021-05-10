import { Routes, Route } from '@angular/router';
import { ShellAdminComponent } from './shell-admin.component';

/**
 * Provides helper methods to create routes.
 */
export class ShellAdmin {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellAdminComponent,
      children: routes,
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
    };
  }
}
