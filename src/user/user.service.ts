import { Injectable,ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
        
    async create(data: CreateUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: { username: data.username },
        })
        if(user) throw new ConflictException('User Duplicated')
        
        const create = await this.prismaService.user.create({
            data: {username:data.username,
                password:await hash(data.password,10),
                permis:data.permis,...data
            },
        });
        const {password,...result} = create
        return result;
    }

    async getByUsername(username:string){
        const user = await this.prismaService.user.findUnique({
            where:{
                username:username
            }
        })
        return user
    }
    async getById(id:number){
        const user = await this.prismaService.user.findUnique({
            where:{
                id:Number(id)
            }
        })
        return user
    }
}
