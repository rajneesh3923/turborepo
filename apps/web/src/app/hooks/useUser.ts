import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useUser() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

      // Listen for auth state changes (user updates, sign-in, sign-out, etc.)
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null); // Handle sign-out or session expiry
        }
      });
  
      // Cleanup listener on component unmount
      return () => {
        authListener?.subscription?.unsubscribe();
      };


  }, [supabase]);

  return user;
}
