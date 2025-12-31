import axios from 'axios';
import type { UserData } from '../types/user';

const api=axios.create({
    baseURL:'https://dummyjson.com',
    headers:{
        "Content-Type":'application/json',
    }
})

interface AuthResponse extends UserData{
    token:string
}

export interface LoginResult{
    success:boolean;
    message:string;
    user:AuthResponse;
    token:string
}

//fetch user by id 

const fetchUserId=async(empId:number):Promise<UserData>=>{
    try {
        const userResponse=await api.get<UserData>(`/users/${empId}`);
        return userResponse.data;
    } catch (error:unknown) {
        if(axios.isAxiosError(error) && error.response?.status===404){
            throw new Error(`Employee ID ${empId} not found`)
        }
        throw error
        
    }
}

//validates credentials aginst dummy api  with checking the username and password as dummy api does authenticate with id ,so with the help of id we get username

const authPass=async(username:string,password:string):Promise<AuthResponse>=>{
    const response =await api.post<AuthResponse>(`/auth/login`,{
        username,
        password,
        expiresInMins:60
    });
    return response.data
}


//main login logic where the password and userid is checked 
export const loginUser=async (credentials:{userId:string|number;password:string}):Promise<LoginResult>=>{
    try{
        const empId=Number(credentials.userId)
        if(Number.isNaN(empId) ||empId<=0){
            throw new Error('Employee ID must be a positive number')
        }
        const user=await fetchUserId(empId);

        const authData=await authPass(user.username,credentials.password)

        const fullUser:AuthResponse={
            ...user,
            token:authData.token
        }
        return{
            success:true,
            message:'Login Successful',
            user:fullUser,
            token:authData.token
        }
    }catch(error:unknown){
        if(axios.isAxiosError(error)){
            const apiMessage=error.response?.data.message;
            if(apiMessage) throw new Error(apiMessage)// Pass through API-specific error messages
            if(error.response?.status===400 ||error.response?.status===401){
                throw new Error('Invalid credentials provided')
            }
            throw new Error('Failed to connect to the authentication servcie')
        } // Fallback for generic JS errors
        throw error instanceof Error? error:new Error('An unexpected error occured during login')
    }
}

export default api;