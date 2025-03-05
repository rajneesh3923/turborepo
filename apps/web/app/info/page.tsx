"use client";

import React from "react";
import { useTRPC } from "../../utils/trpc";
import { useQuery } from "@tanstack/react-query";

export default function Info() {
  const trpc = useTRPC(); // use `import { trpc } from './utils/trpc'` if you're using the singleton pattern
  const { data, error, isError } = useQuery(trpc.user.queryOptions());

  console.log("TRPC DATA", data, error, isError);
  return <div>page</div>;
}
