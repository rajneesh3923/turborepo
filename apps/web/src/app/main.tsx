"use client";

import React, { ReactNode, useState } from "react";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import TravelHeader from "frontend/components/Header";
import { usePathname } from "next/navigation";
import Footer from "../components/Footer";
import { User } from "@supabase/supabase-js";
import { AppRouter } from "@repo/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createClient } from "../utils/supabase/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { TRPCProvider } from "../../utils/trpc";

const client = new Ably.Realtime({
  key: "f18MvA.z8TGKA:AxuD_b4V8vqMkRjpl1K9_535vpylTNMBpKrFFJLmTD4",
  clientId: "traveleasein",
});

const getAuthToken = async () => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSIOn", session);
  return session?.access_token;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Main({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  const pathname = usePathname();
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          async headers() {
            return {
              authorization: await getAuthToken(),
            };
          },
        }),
      ],
    })
  );

  const trpc = createTRPCOptionsProxy<AppRouter>({
    client: trpcClient,
    queryClient,
  });

  return (
    <AblyProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {!pathname.includes("/dashboard") &&
            !pathname.includes("/become-agent") && <TravelHeader user={user} />}
          <ChannelProvider channelName={`notifications:${user?.email}`}>
            {children}
          </ChannelProvider>
          {!pathname.includes("/dashboard") &&
            !pathname.includes("/become-agent") && <Footer />}
        </TRPCProvider>
      </QueryClientProvider>
    </AblyProvider>
  );
}
