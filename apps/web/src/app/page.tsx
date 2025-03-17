"use client";

import { createClient } from "frontend/utils/supabase/client";
import { useEffect } from "react";
import Hero from "frontend/components/Hero";
import Quotation from "frontend/components/flight/quotation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "../../utils/trpc";

const props = {
  agentName: "Wizard Travelers",
  from: "DEL",
  to: "BNG",
  date: "21 Oct 2024",
  passanger: "1",
  seat: "A2",
  farePrice: "5600",
  airline: "Indigo",
};

const props3 = {
  agentName: "ABC Tours",
  from: "MUM",
  to: "PTN",
  date: "26 Nov 2024",
  passanger: "2",
  seat: "A1",
  farePrice: "9600",
  airline: "Indigo",
};

const props2 = {
  agentName: "TripPlanner",
  from: "KOL",
  to: "CHEN",
  date: "12 Dec 2024",
  passanger: "4",
  seat: "A2",
  farePrice: "32600",
  airline: "Indigo",
};

export default function Home() {
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
      }
    };

    getSession();
  }, [supabase]);

  // useEffect(() => {
  //   trpc.flightRequests.getAllFlightRequests
  //     .query({ page: 1, page_size: 10 })
  //     .then((res) => console.log("FlightReqs", res));
  // });

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen hero_bg">
        <Hero />
      </div>
      <Quotation {...props} />
      <Quotation {...props2} />
      <Quotation {...props3} />
    </div>
  );
}
