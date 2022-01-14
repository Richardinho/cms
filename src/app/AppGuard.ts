import { Injectable } from '@angular/core';
import { AppState } from './model';
import { Store, select } from '@ngrx/store';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { selectJWTToken } from './pages/edit-article-page/selectors/article.selector';

const selectFoo = (state: AppState) => {
	return 'hellofoo';
};

@Injectable({
	providedIn: 'root',
})
export class AppGuard implements CanActivate {

	constructor(private store: Store<AppState>, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): UrlTree | Observable<boolean | UrlTree> {
			return this.store.pipe(select(selectJWTToken), map(jwt => {
				if (jwt) {
					return true;
				} 

				return this.router.parseUrl('/login');
			}));
	}

}
