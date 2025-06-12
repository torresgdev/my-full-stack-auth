
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; 
import { AuthService } from '../auth.service'; 


export interface JwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { 
  constructor(
    private configService: ConfigService,
    private authService: AuthService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, // O token deve expirar
      secretOrKey: configService.get<string>('JWT_SECRET')!, 
    });
  }


  async validate(payload: JwtPayload) {
  
    const user = await this.authService.validateUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Token inválido ou usuário não encontrado.');
    }

    return { id: user.id, email: user.email }; 
  }
}