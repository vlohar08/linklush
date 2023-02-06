import DisplayUserProfileWithLinks from "components/Backend/DisplayUserProfileWithLinks";
import { Link } from "context/LinkContext";
import { Profile } from "context/ProfileContext";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import findProfileByLink from "utils/findProfileByLink";

type User = {
  profile: Profile;
  links: Link[];
  analytics: string;
};

const ProfileId = ({ user }: { user: User }) => {
  const { profile, links, analytics } = user;
  return (
    <section className="flex flex-col items-center w-full h-fit min-h-[800px] bg-white p-3 md:p-6 rounded-3xl text-center">
      <div
        dangerouslySetInnerHTML={{
          __html: `${Buffer.from(analytics, "base64")}`,
        }}
      />
      <Head>
        <title>{profile.name}</title>
      </Head>
      <DisplayUserProfileWithLinks profile={profile} links={links} />
    </section>
  );
};

export default ProfileId;

export const getStaticProps: GetStaticProps = async (context) => {
  // @ts-ignore
  const profileLink = context?.params.profileLink as string;
  const user = await findProfileByLink(profileLink);

  // @ts-ignore
  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { profileLink: "vishal" } }],
    fallback: "blocking",
  };
};
