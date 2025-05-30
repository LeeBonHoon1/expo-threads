import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext({
  user: {},
  setUser: ({}) => {},
  logOut: () => {},
  createUser: (username: string) => {},
});

export const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [session, setSession] = useState<Session | null>(null);

  const createUser = async (username: string) => {
    if (!session?.user?.id) {
      return { error: "No active session" };
    }

    const { data, error } = await supabase
      .from("User")
      .insert({
        id: session.user.id,
        username,
      })
      .select();

    if (error) {
      console.error("Create user error:", error);
      return { error: error.message };
    }

    const newUser = data[0];
    setUser(newUser);
    router.push("/(tabs)");
    return { error: undefined };
  };

  const getUser = async (session: Session | null) => {
    if (session) {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("id", session.user.id);

      if (!error && data?.[0]) {
        setUser(data[0]);
        router.push("/(tabs)");
      }
    }
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/(auth)");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      getUser(session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      getUser(session);
      setSession(session);
    });
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, logOut, createUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
