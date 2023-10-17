import "@/styles/globals.css";
import {
  SessionProvider,
} from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
       {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
