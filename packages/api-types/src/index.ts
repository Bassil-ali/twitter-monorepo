export interface AllTweets {
    id:number;
    content:string;
    user:{
        id:number
        name:string
        username:string
    };
}
