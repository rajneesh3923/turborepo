"use client";

import React, { ReactNode, useState } from "react";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { QueryClientProvider } from "@tanstack/react-query";
import TravelHeader from "@/components/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { queryClient } from "@/utils/query";
import { User } from "@supabase/supabase-js";
import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { createClient } from "@/utils/supabase/client";

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

export default function Main({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  const pathname = usePathname();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: await getAuthToken(),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <AblyProvider client={client}>
        <QueryClientProvider client={queryClient}>
          {!pathname.includes("/dashboard") &&
            !pathname.includes("/become-agent") && <TravelHeader user={user} />}
          <ChannelProvider channelName={`notifications:${user?.email}`}>
            {children}
          </ChannelProvider>
          {!pathname.includes("/dashboard") &&
            !pathname.includes("/become-agent") && <Footer />}
        </QueryClientProvider>
      </AblyProvider>
    </trpc.Provider>
  );
}
