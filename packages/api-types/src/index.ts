export interface AllTweets {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        name: string;
        username: string;
    }
    likes: {
        id:number
    }[]
}

export interface CreateTweet {
    content: string;
}

export interface authResponse {
    id: number;
    name: string;
    email: string;
    username: string;
    token: string;
}

export interface loginData {
    username: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}
