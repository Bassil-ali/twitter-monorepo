import { clientAuth } from "@/libs/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useClientAuth = () => {
    const session = useSession();

    useEffect(() => {
        const interceptor = clientAuth.interceptors.request.use(
            (config) => {
                if (session.status == "authenticated") {
                    console.log("session authenticated");
                }

                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${session.data?.user?.token}`;
                }

                return config;
            },
            (error) => {
                console.log("error", error);
            },
        );

        return () => {
            clientAuth.interceptors.request.eject(interceptor);
        };
    }, [session.status]);
    return clientAuth;
};
