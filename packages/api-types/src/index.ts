export interface AllTweets {
    id:number;
    content:string;
    createdAt:string
    updatedAt:string
    user:{
        id:number
        name:string
        username:string
    };
}

export interface CreateTweet {
    content:string
}
