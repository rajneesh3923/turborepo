"use client";

import { flightRequestQuery } from "frontend/app/client/queries/flightRequest";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Request() {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    flightRequestQuery.all
  );

  if (isLoading) {
    <div>{isLoading}</div>;
  }

  if (data) {
    return <div></div>;
  }

  return <div>Request</div>;
}
