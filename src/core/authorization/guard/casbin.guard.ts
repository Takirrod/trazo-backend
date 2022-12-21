import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTHZ_ENFORCER } from 'nest-authz';
import { Request } from 'express'
import { DataSource } from 'typeorm';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { CasbinRule } from '../entity/casbin.entity';

@Injectable()
export class CasbinGuard implements CanActivate {

  constructor(
    @Inject(AUTHZ_ENFORCER) private enforcer: any,
    private dataSource: DataSource
    ) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    const {
      user,
      originalUrl,
      query,
      route,
      method: action,
    } = context.switchToHttp().getRequest() as Request
    const resource = Object.keys(query).length ? route.path : originalUrl
    const comparativeRoute = route.path;
    const nameRol = (await this.dataSource.getRepository(CasbinRule).find({where: {v1: comparativeRoute}}))
    if (!user) {
      throw new UnauthorizedException()
    }
    
    for (const rol of user.roles) {
      const rolDB = await this.dataSource.getRepository(Rol).findOne({where: {id: rol}})
      if (nameRol.some(rule => rule.v0 === rolDB.nombre)) {
        return true
      }
    }
    throw new ForbiddenException()
  }
}
