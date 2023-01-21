import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import findProfileByLink from "utils/findProfileByLink";

type User = {
  profile: {
    name: string;
    description: string;
    showButton: boolean;
    buttonLink: string;
    buttonText: string;
    avatar: string;
  };
  links: {
    href: string;
    icon: string;
    id: string;
    isEnabled: string;
    title: string;
  }[];
};

const ProfileId = ({ user }: { user: User }) => {
  const { profile, links } = user;

  return (
    <section className="flex flex-col items-center w-full h-fit min-h-[800px] bg-white p-3 md:p-6 rounded-3xl m-2 md:m-4 text-center">
      <div className="w-full max-w-[600px] rounded-3xl bg-secondary-light p-3 md:p-6">
        <Image
          className="rounded-3xl aspect-square mx-auto border-4 border-white bg-white min-w-[60px] min-h-[60px] object-cover"
          src={profile.avatar}
          width={60}
          height={60}
          alt="Linklush"
          draggable={false}
        />
        <h2 className="font-medium text-lg mt-3">{profile.name}</h2>
        <p className="text-sm my-3">{profile.description}</p>
        {profile.showButton && (
          <Link href={profile.buttonLink}>
            <button
              className="rounded-xl bg-secondary hover:bg-primary transition-colors duration-300 py-1 px-4 text-white"
              type="button"
            >
              {profile.buttonText}
            </button>
          </Link>
        )}
      </div>
      <div className="w-full max-w-[600px]">
        {links.map((link) => {
          return (
            link.isEnabled && (
              <Link key={link.id} href={link.href}>
                <div className="flex items-center mt-3 bg-secondary-light hover:bg-primary-light transition-colors duration-300 rounded-2xl p-2 cursor-pointer">
                  <Image
                    className="rounded-3xl aspect-square object-cover min-w-[40px] min-h-[40px]"
                    width={40}
                    height={40}
                    src={link.icon}
                    alt={link.title}
                    draggable={false}
                  />
                  <h2 className="flex justify-center w-full font-medium text-base">
                    {link.title}
                  </h2>
                </div>
              </Link>
            )
          );
        })}
      </div>
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
