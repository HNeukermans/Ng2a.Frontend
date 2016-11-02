import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { Home2 } from './home.2';
import { About } from './about';
import { NoContent, EmptyContent } from './no-content';
import { DataResolver } from './app.resolver';
import { AppInsights } from './appinsights';

export const ROUTES: Routes = [
  { path: '',      component: Home2 },
  { path: 'home',  component: Home2 },
  { path: 'empty', component: EmptyContent },
  { path: 'appinsights', component: AppInsights },
  { path: '**',  component: NoContent }
 
];
