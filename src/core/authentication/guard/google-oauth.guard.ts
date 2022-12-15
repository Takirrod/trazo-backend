import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv'
import { Request } from 'express';

dotenv.config()

@Injectable()
export class GoogleOauthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ) {
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    // const body = context.switchToHttp().getRequest().body;
    // const ticket = await client.verifyIdToken({
    //   idToken: body.token,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });
    // const payload = ticket.getPayload();    
    
    // return payload.aud === process.env.GOOGLE_CLIENT_ID && 
    // (payload.iss === 'accounts.google.com' || payload.iss === 'https://accounts.google.com');
    const {
      user,
    } = context.switchToHttp().getRequest() as Request
    
    if (!user?.id) {
      throw new BadRequestException(
        `Es necesario que este autenticado para consumir este recurso.`
      )
    }
    try {
      if (user.id !== "GOOGLE") throw new ForbiddenException();
    } catch (err) {
      throw new ForbiddenException();
    }
    return true
  }
}
