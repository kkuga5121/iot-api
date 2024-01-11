import { Injectable,ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, PermitDTo, UsernameDto } from './dto/user.dto';
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
                permis:data.permis,affiliation:data.affiliation,
                name:data.name
            },
        });
        const {password,...result} = create
        return result;
    }
    async update(data:CreateUserDto){
        
        const user = await this.prismaService.user.findUnique({
            where: { username: data.username },
        })
        if(user){
            
            const update = await this.prismaService.user.update({
                where:{username: data.username },
                data: {

                    password:await hash(data.password,10),
                    name:data.name,
                    permis:data.permis,affiliation:data.affiliation
                },
            });
            return {update:update};
        }
        return {update:null};
    }
    async getAll(){
        const user = await this.prismaService.user.findMany()
        return user
    }
    
    async getAllByRole(data:PermitDTo){
        const user = await this.prismaService.user.findMany({
            where:{
                permis:data.permis
            }
        })
        return user
    }
    async checkUsernmae(data:UsernameDto){
        const user = await this.prismaService.user.findUnique({
            where:{
                username:data.username
            }
        })
        if(!user){
            return {userData:null}
        }
        return {userData:user}
    }
    async getByUsername(data:UsernameDto){
        const user = await this.prismaService.user.findUnique({
            where:{
                username:data.username
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
    async delete(data:UsernameDto){
        const line = await this.prismaService.user.delete({
            where: {
                username:data.username,
            },
        })
        return line;
    }
}
