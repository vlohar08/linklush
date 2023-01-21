import DisplayUserProfileWithLinks from "components/Backend/DisplayUserProfileWithLinks";
import { Link } from "context/LinkContext";
import { Profile } from "context/ProfileContext";
import { GetServerSideProps } from "next";
import Head from "next/head";
import findProfileByLink from "utils/findProfileByLink";

type User = {
  profile: Profile;
  links: Link[];
};

const ProfileId = ({ user }: { user: User }) => {
  const { profile, links } = user;

  return (
    <section className="flex flex-col items-center w-full h-fit min-h-[800px] bg-white p-3 md:p-6 rounded-3xl text-center">
      <Head>
        <script>console.log(1)</script>
      </Head>
      <DisplayUserProfileWithLinks profile={profile} links={links} />
    </section>
  );
};

export default ProfileId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profileLink = context.query.profileLink as string;

  const user = await findProfileByLink(profileLink);

  // @ts-ignore
  if (!user?.links) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
};
