import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Linklush - Unleash the power of your online presence with Linklush
        </title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Unleash the power of your online presence with Linklush"
        />
        <link rel="icon" href="/linklush-site-icon.png" />
      </Head>
      <main className={inter.className}></main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/admin/dashboard",
    },
    props: {},
  };
};
