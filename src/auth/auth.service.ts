import { Injectable,UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const EXPIRE_TIME =60 * 60 * 1000;
@Injectable()
export class AuthService {
    constructor(

        private readonly userService: UserService,
        private readonly jwtService: JwtService,

    ) { }
    async login(data:LoginDto){
        const user = await this.validateuser(data)
        const payload = {
            username:user.username,
            sub:{
                permis : user.permis
            }
        }
        return {user,backendTokens:{
            accessToken: await this.jwtService.signAsync(payload,{
                expiresIn:'1h',
                secret:process.env.JWTSECRETKEY,
            }),
            refreshToken: await this.jwtService.signAsync(payload,{
                expiresIn:'1d',
                secret:process.env.JWTREFRESHTOKENKEY,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        }}
    }

    async validateuser(data:LoginDto){
        const user = await this.userService.getByUsername(data.username)
        let com = await compare(data.password,user.password)
        if(user && (com)){
            const {password,...result} = user;
            return result
        }
        throw new UnauthorizedException();
    }
    async refreshToken(user:any){
        
        const payload = {
            username:user.username,
            sub:user.sub
        };

        return {
            accessToken: await this.jwtService.signAsync(payload,{
                expiresIn:'1h',
                secret:process.env.JWTSECRETKEY,
            }),
            refreshToken: await this.jwtService.signAsync(payload,{
                expiresIn:'1d',
                secret:process.env.JWTREFRESHTOKENKEY,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }
}
