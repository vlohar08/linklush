import { ReactNode, useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import LinksContextProvider from "context/LinkContext";
import ProfileContextProvider from "context/ProfileContext";
import LinkPreview from "./LinkPreview";
import Head from "next/head";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase.config";
import LoadingContextProvider from "context/LoadingContext";
import AnalyticsContextProvider from "context/AnalyticsContext";

const Layout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <LinksContextProvider>
      <ProfileContextProvider uid={user?.uid ? user.uid : ""}>
        <LoadingContextProvider>
          <AnalyticsContextProvider>
            <Head>
              <title>{title}</title>
              <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
              />
              <meta
                name="description"
                content="Unleash the power of your online presence with Linklush"
              />
              <link rel="icon" href="/assets/linklush-site-icon.png" />
            </Head>
            <Header />
            <main className="flex flex-col lg:flex-row w-full max-w-[100vw] min-h-[100vh] bg-[#eff0f3]">
              <SideMenu />
              <section className="lg:w-2/3 h-fit m-2 md:m-4 bg-white rounded-3xl">
                {children}
              </section>
              <LinkPreview />
            </main>
          </AnalyticsContextProvider>
        </LoadingContextProvider>
      </ProfileContextProvider>
    </LinksContextProvider>
  );
};

export default Layout;
