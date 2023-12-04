import { Injectable  } from '@nestjs/common';
import { HttpService} from "@nestjs/axios";
import { tap,map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { lineNotifyQuery, lineNotifyWithTokenQuery } from './dto/line.dto';
@Injectable()
export class lineService{
    
  constructor(
    private readonly http : HttpService
    ) {}
    async sendLineNotify(query :lineNotifyQuery) {
        
        const requestConfig: AxiosRequestConfig = {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer `+process.env.LINE_TOKEN,
            },
        };
        try{
            const result = await this.http.post('https://notify-api.line.me/api/notify',{
                message:query.message
                },requestConfig).pipe(
                tap((resp) => console.log("line"+resp)),
                map((resp) => resp.data),
                tap((data) =>  
                {console.log("line"+data)
                    return data;}
                ),
                );
            return result;
        }catch(error){
            
            return null;
        }
    }
    async sendLineNotify2(query :lineNotifyQuery) {
        
        const requestConfig: AxiosRequestConfig = {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer `+process.env.LINE_TOKEN,
            },
        };
        
        try{
            const result = await  this.http.post('https://notify-api.line.me/api/notify',{
                message:query.message
                },requestConfig).pipe(
                tap((resp) => console.log("line"+resp)),
                map((resp) => resp.data),
                tap((data) =>  
                {console.log("line"+data)
                    return data;}
                ),
                );
            return result;
        }catch(error){
            
            return null;
        }
    }
    
    async sendLineNotifyToken(query :lineNotifyWithTokenQuery) {
        
        const requestConfig: AxiosRequestConfig = {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer `+query.token,
            },
        };
        try{
            const result = await this.http.post('https://notify-api.line.me/api/notify',{
                message:query.message
                },requestConfig).pipe(
                tap((resp) => console.log("line"+resp)),
                map((resp) => resp.data),
                tap((data) =>  
                {console.log("line"+data)
                    return data;}
                ),
                );
            return result;
        }catch(error){
            
            return null;
        }
    }
    
    async sendLineNotifyToken2(query :lineNotifyWithTokenQuery) {
        
        const requestConfig: AxiosRequestConfig = {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer `+query.token,
            },
        };
        try{
            const result = await this.http.post('https://notify-api.line.me/api/notify',{
                message:[
                    {
                        type:"text",
                        text:"Hello, user kkuga"
                    }
            ]
                },requestConfig).pipe(
                tap((resp) => console.log("line"+resp)),
                map((resp) => resp.data),
                tap((data) =>  
                {console.log("line"+data)
                    return data;}
                ),
                );
            return result;
        }catch(error){
            
            return null;
        }
    }
}