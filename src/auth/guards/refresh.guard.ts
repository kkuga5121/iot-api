import { CanActivate,Controller,Injectable,ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {Request} from 'express'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshJwtGuard implements CanActivate{
    constructor(
        private jwtService:JwtService,
    ){ }
    async canActivate (
        context:ExecutionContext,
        ):Promise<boolean> 
        {
        const requst = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(requst)
        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(token,{
                secret:process.env.JWTREFRESHTOKENKEY,
            })
            requst['user'] = payload;
        }catch{
            throw new UnauthorizedException();
        }
        return true
    }
    private extractTokenFromHeader(requst:Request){
        const [type,token] = requst.headers.authorization.split(' ') ?? [];
        return type === 'Refresh' ? token : undefined;

    }
}