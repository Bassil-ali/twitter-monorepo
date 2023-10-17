import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import UploadImageIcon from "./icons/newTweet/UploadImageIcon";
import CreatePollIcon from "./icons/newTweet/CreatePollIcon";
import AddEmojiIcon from "./icons/newTweet/AddEmojiIcon";
import UploadVideoIcon from "./icons/newTweet/UploadVideoIcon";
import { useClientAuth } from "@/hooks/useClientAuth";
import { useQueryClient } from "react-query";

export default function NewTweet() {
    const clientAuth = useClientAuth()
    const queryClient = useQueryClient()

    async function createTweet(data: any , {resetForm}) {
        const response = await clientAuth.post('/tweets/create' ,data)
        const allTweets = queryClient.getQueryData('allTweets') as []
        resetForm()
        queryClient.setQueryData('allTweets' , [response.data , ...allTweets])
    }

    return (
        <>
            <Formik
                initialValues={{
                    content: "",
                }}
                validationSchema={toFormikValidationSchema(z.string())}
                onSubmit={createTweet}
            >
                {(form) => (
                        <Form>
                        <div className="flex">
                            <div className="m-2 w-10 py-1">
                                <img
                                    className="inline-block h-10 w-10 rounded-full"
                                    src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                    alt=""
                                />
                            </div>
                            <div className="flex-1 px-2 pt-2 mt-2">
                                    <textarea
                                        name="content"
                                        value={form.values.content}
                                        className=" bg-black outline-none text-gray-400 font-medium text-lg w-full"
                                        rows={2}
                                        cols={50}
                                        placeholder="What's happening?"
                                        onChange={form.handleChange}
                                    ></textarea>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-10"></div>

                            <div className="w-64 px-2">
                                <div className="flex items-center">
                                    <div className="flex-1 text-center px-1 py-1 m-2">
                                        <UploadImageIcon />
                                    </div>

                                    <div className="flex-1 text-center py-2 m-2">
                                        <UploadVideoIcon />
                                    </div>

                                    <div className="flex-1 text-center py-2 m-2">
                                        
                                        <CreatePollIcon />
                                    </div>

                                    <div className="flex-1 text-center py-2 m-2">
                                        <AddEmojiIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <button type="submit" disabled={!form.values.content} className="
                                    bg-blue-500 mt-5 disabled:bg-blue-400   text-white 
                                    font-bold py-2 px-8 rounded-full mr-8 float-right">
                                    Tweet
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
