import request from '@/utils/request'

//注册接口
export const userRegisterService = ({username,password,repassword})=>
    
//根据接口文档修改reg

    
     request.post('/api/reg', {username,password,repassword})


//登录接口
export const userLoginService = ({username,password})=>
    request.post('/api/login', {username,password})