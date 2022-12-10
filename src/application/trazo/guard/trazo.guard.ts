import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TrazoRepository } from '../repository/trazo.repository';
import { Request } from 'express'
import { Trazo } from '../entity/trazo.entity';

@Injectable()
export class TrazoGuard implements CanActivate {
  constructor(
    @Inject(TrazoRepository)
    private trazoRespository: TrazoRepository
  ){}
  async canActivate(
    context: ExecutionContext,
  ) {
    const {user, originalUrl} = context.switchToHttp().getRequest() as Request;
    const urlArray: string[] = originalUrl.split('/')
    const trazoId = urlArray[urlArray.length-1];
    const trazos: Trazo[] = await this.trazoRespository.findTrazosByUser(+user.id);
    return trazos.map(trazo => trazo.id).includes(+trazoId)
  }
}
