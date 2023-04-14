import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Provider as SupabaseProvider } from "react-supabase";
import type { AppProps } from "next/app";
import useIsClient from "@hooks/useClient";
import { supabaseClient } from "@lib/supebase";
import {
  useGlobalState,
  GlobalStateProvider,
} from "@reactivers/use-global-state";

import { FollowCursorContainer } from "@components/FollowCursor/FollowCursorContainer";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const isClient = useIsClient();
  const { setGlobalState } = useGlobalState();

  useEffect(() => {
    if (isClient && setGlobalState) {
      console.log({ isClient, setGlobalState });
      setGlobalState("white");
    }
  }, [isClient]);

  return (
    <GlobalStateProvider>
      <SupabaseProvider value={supabaseClient}>
        {isClient && <Toaster />}
        <FollowCursorContainer className="border border-white" />
        <Component {...pageProps} />
      </SupabaseProvider>
    </GlobalStateProvider>
  );
}
