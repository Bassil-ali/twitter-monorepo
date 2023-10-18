import { useClientAuth } from "@/hooks/useClientAuth";
import { AllTweets } from "api-types";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Props {
    tweetId: number;
    likes: {id:number}[]
}
export default function LikeIcon({ tweetId  , likes}: Props) {
    const clientAuth = useClientAuth()
    const session = useSession()
    const [isLiked , setIsLiked] = useState(() => {
        if(session.data?.user.id) {
            return !!likes.find(l => l.id == session.data.user.id)
        }
        return false
    })
    async function toggleLike() {
        const response = await clientAuth.post('tweets/toggleLike' , {id:tweetId})
        if(response.status == 201) {
            setIsLiked(!isLiked)
        }

    }
    return (
        <button
            onClick={toggleLike}
            // href="#"
            className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full"
        >
            <svg
                className="text-center h-7 w-6"
                fill={isLiked? 'red' : 'none'}

                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
        </button>
    );
}
