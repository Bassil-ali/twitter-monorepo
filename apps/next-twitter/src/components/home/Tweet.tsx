import { AllTweets } from "api-types";
import TweetStatsIcon from "../icons/Tweet/TweetStatsIcon";
import DownloadTweetIcon from "../icons/Tweet/DownloadTweetIcon";
import UploadTweetIcon from "../icons/Tweet/UploadTweetIcon";
import LikeIcon from "../icons/Tweet/LikeIcon";
import VoteIcon from "../icons/Tweet/VoteIcon";
import CommentIcon from "../icons/Tweet/CommentIcon";

interface Props {
    tweet:AllTweets
}
export default function Tweet({tweet}:Props) {

    return (
        <>

            <hr className="border-gray-600"></hr>
            <div className="flex flex-shrink-0 p-4 pb-0">
                <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                        <div>
                            <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-base leading-6 font-medium text-white">
                                {tweet.user.name}
                                <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @{tweet.user.username} . 16 April
                                </span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="pl-16">
                <p className="text-base width-auto font-medium text-white flex-shrink">
                    {tweet.content}
                    {/* Day 07 of the challenge{" "} */}
                    {/* <span className="text-blue-400">#100DaysOfCode</span>I was wondering */}
                    {/* what I can do with <span className="text-blue-400">#tailwindcss</span> */}
                    {/* , so just started building Twitter UI using Tailwind and so far it */}
                    {/* looks so promising. I will post my code after completion. [07/100] */}
                    {/* <span className="text-blue-400"> #WomenWhoCode #CodeNewbie</span> */}
                </p>

                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center">
                            <div className="flex-1 text-center">
                                <CommentIcon />
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <VoteIcon />
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <LikeIcon likes={tweet.likes} tweetId={tweet.id}  />
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <UploadTweetIcon />
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <DownloadTweetIcon />
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <TweetStatsIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-600"></hr>
        </>
    );
}
