import {
  MenuComponent,
  NOT_LOGGED_IN_MESSAGE,
  ARTICLE_NOT_CREATED_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from './menu.component';
import { of, throwError } from 'rxjs';
import { UNAUTHORIZED, NOT_FOUND } from '../status-code.constants';
import {
  MessageService,
  INFO,
  ERROR,
  WARNING
} from '../message-service/message.service';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let articleServiceStub;
  let authServiceStub;
  let menuServiceStub;
  let routerStub;
  let messageServiceStub;

  beforeEach(() => {
    articleServiceStub = jasmine.createSpyObj('ArticleService', ['create']);
    authServiceStub = jasmine.createSpyObj('AuthService', ['']);
    menuServiceStub = jasmine.createSpyObj('MenuService', ['']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceStub = jasmine.createSpyObj('MessageService', ['show']);
  });

  describe('createArticle()', () => {
    describe('when article is created by service', () => {
      beforeEach(() => {
        articleServiceStub = jasmine.createSpyObj('ArticleService', {
          create: of('foo')
        });

        component = new MenuComponent(
          articleServiceStub,
          authServiceStub,
          menuServiceStub,
          routerStub,
          messageServiceStub,
        );

        component.createArticle();
      });

      it('should navigate to edit article page', () => {
        expect(routerStub.navigate).toHaveBeenCalledWith(['/edit-article', 'foo']);
      });
    });

    describe('when user is not logged in', () => {
      beforeEach(() => {
        articleServiceStub = jasmine.createSpyObj('ArticleService', {
          create: throwError({ status : UNAUTHORIZED })
        });

        component = new MenuComponent(
          articleServiceStub,
          authServiceStub,
          menuServiceStub,
          routerStub,
          messageServiceStub,
        );

        component.createArticle();
      });

      it('should stay on same page', () => {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      });

      it('should show NOT_LOGGED_IN_MESSAGE  warning', () => {
        expect(messageServiceStub.show).toHaveBeenCalledWith(NOT_LOGGED_IN_MESSAGE, WARNING);
      });
    });

    describe('when article is not created', () => {
      beforeEach(() => {
        articleServiceStub = jasmine.createSpyObj('ArticleService', {
          create: throwError({ status : NOT_FOUND })
        });

        component = new MenuComponent(
          articleServiceStub,
          authServiceStub,
          menuServiceStub,
          routerStub,
          messageServiceStub,
        );

        component.createArticle();
      });

      it('should stay on same page', () => {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      });

      it('should show ARTICLE_NOT_CREATED_MESSAGE  warning', () => {
        expect(messageServiceStub.show).toHaveBeenCalledWith(ARTICLE_NOT_CREATED_MESSAGE, WARNING);
      });
    });

    describe('when an error occurs on the server', () => {
      beforeEach(() => {
        articleServiceStub = jasmine.createSpyObj('ArticleService', {
          create: throwError({ status : 500 })
        });

        component = new MenuComponent(
          articleServiceStub,
          authServiceStub,
          menuServiceStub,
          routerStub,
          messageServiceStub,
        );

        component.createArticle();
      });

      it('should stay on same page', () => {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      });

      it('should show SERVER_ERROR_MESSAGE  warning', () => {
        expect(messageServiceStub.show).toHaveBeenCalledWith(SERVER_ERROR_MESSAGE, ERROR);
      });
    });

    describe('when there is a network error', () => {
      beforeEach(() => {
        articleServiceStub = jasmine.createSpyObj('ArticleService', {
          create: throwError({ })
        });

        component = new MenuComponent(
          articleServiceStub,
          authServiceStub,
          menuServiceStub,
          routerStub,
          messageServiceStub,
        );

        component.createArticle();
      });

      it('should stay on same page', () => {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      });

      it('should show NETWORK_ERROR_MESSAGE  warning', () => {
        expect(messageServiceStub.show).toHaveBeenCalledWith(NETWORK_ERROR_MESSAGE, ERROR);
      });
    });
  });
});
