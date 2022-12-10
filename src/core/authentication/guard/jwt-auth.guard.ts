import { BadRequestException, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const {
      user,
    } = context.switchToHttp().getRequest() as Request
    
    if (!user?.id) {
      throw new BadRequestException(
        `Es necesario que este autenticado para consumir este recurso.`
      )
    }
    try {
      const isPermitted = (await super.canActivate(context)) as boolean
      if (!isPermitted) throw new ForbiddenException();
    } catch (err) {
      throw new ForbiddenException();
    }
    return true
  }
}
