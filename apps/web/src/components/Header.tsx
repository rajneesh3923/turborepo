"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";
import { Plane, Hotel, Package, Phone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "frontend/app/hooks/useUser";
import { createClient } from "frontend/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface userProps {
  user: User | null;
}

export default function Header(user: userProps) {
  console.log("USERRRR", user);
  const supabase = createClient();
  // let user = useUser();

  const router = useRouter();

  console.log("user header", user.user);

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const triggerLogout = async () => {
    let { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-20 z-50  transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 h-full ">
        <div className="flex items-center justify-between h-full  ">
          <Link href="/" className="text-2xl font-bold text-primary ">
            TravelEasein
          </Link>
          {!pathname.includes("auth") && (
            <nav className="hidden md:flex items-center  gap-10">
              <Link
                href="/flights"
                className="flex text-lg items-center font-medium text-black hover:text-primary"
              >
                <Plane className="w-4 h-4 mr-1" />
                Flights
              </Link>
              <Link
                href="/hotels"
                className="flex items-center text-lg font-medium text-black hover:text-primary"
              >
                <Hotel className="w-4 h-4 mr-1" />
                Hotels
              </Link>
              <Link
                href="/packages"
                className="flex items-center text-lg font-medium text-black hover:text-primary"
              >
                <Package className="w-4 h-4 mr-1" />
                Packages
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-lg font-medium text-black hover:text-primary"
              >
                <Phone className="w-4 h-4 mr-1" />
                Contact Us
              </Link>
            </nav>
          )}
          {!user?.user ? (
            <Flex justify="center" align="center">
              <Button
                variant="solid"
                size="md"
                bg="primary.500"
                onClick={() => {
                  router.push("/become-agent");
                }}
              >
                Become an Agent
              </Button>
              {!pathname.includes("auth") && (
                <Button
                  variant="outline" // This makes the button outlined
                  size="md"
                  borderColor="primary.500" // Set the border color (matches the solid button color)
                  color="primary.500" // Text color matches the border
                  _hover={{ bg: "primary.100" }} // Optional: Add a background color on hover
                  mx="2" // Adds margin between the buttons
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Login
                </Button>
              )}
            </Flex>
          ) : (
            <Flex justify="center" align="center">
              <Button
                variant="solid"
                size="md"
                bg="primary.400"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
              {!pathname.includes("auth") && (
                <Button
                  variant="outline" // This makes the button outlined
                  size="md"
                  borderColor="primary.500" // Set the border color (matches the solid button color)
                  color="primary.500" // Text color matches the border
                  _hover={{ bg: "primary.100" }}
                  mx="2" // Adds margin between the buttons
                  onClick={() => {
                    triggerLogout();
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              )}
            </Flex>
          )}
          <Button variant="outline" size="icon" display={{ md: "none" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
