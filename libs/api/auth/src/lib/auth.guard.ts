import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '@show-off/api/shared';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Required: Else passport will throw an error `login` of undefined
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );
    /**
     * We need to call the `canActivate` method of the superclass inorder to
     * get the logged-in user id.
     *
     * Without that all `Public` endpoints won't be able to get the user from the `req` object
     */
    if (isPublicEndpoint) {
      (super.canActivate(context) as Promise<boolean>).then().finally(() => {
        return true;
      });
    }
    return super.canActivate(context);
  }
}
