import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class GoogleOauthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const body = context.switchToHttp().getRequest().body;
    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();    
    
    return payload.aud === process.env.GOOGLE_CLIENT_ID && 
    (payload.iss === 'accounts.google.com' || payload.iss === 'https://accounts.google.com');
  }
}
