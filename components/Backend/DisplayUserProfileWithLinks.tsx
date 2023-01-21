import { Link as LinkType } from "context/LinkContext";
import { Profile } from "context/ProfileContext";
import Image from "next/image";
import Link from "next/link";
import LinklushLogo from "@/assets/linklush-logo.png";

const DisplayUserProfileWithLinks = ({
  profile,
  links,
}: {
  profile: Profile;
  links: LinkType[];
}) => {
  return (
    <>
      <div
        style={{ background: profile.primaryColor }}
        className="w-full lg:max-w-[600px] rounded-3xl p-3 md:p-6"
      >
        <Image
          className="rounded-3xl aspect-square mx-auto border-4 border-white bg-white min-w-[60px] min-h-[60px] object-cover"
          src={profile.avatar}
          width={60}
          height={60}
          alt="Linklush"
          draggable={false}
        />
        <h2
          style={{ color: profile.textColor }}
          className="font-medium text-lg lg:text-xl mt-3"
        >
          {profile.name}
        </h2>
        <p style={{ color: profile.textColor }} className="text-md my-3">
          {profile.description}
        </p>
        {profile.showButton && (
          <Link target="_blank" href={profile.buttonLink}>
            <button
              style={{ background: profile.buttonColor }}
              className="rounded-xl hover:opacity-90 transition-colors duration-300 py-1 px-4 text-white"
              type="button"
            >
              {profile.buttonText}
            </button>
          </Link>
        )}
      </div>
      <div className="w-full lg:max-w-[600px]">
        {links.map((link) => {
          return (
            link.isEnabled && (
              <Link target="_blank" key={link.id} href={link.href}>
                <div
                  style={{ background: profile.primaryColor }}
                  className="flex items-center mt-3 hover:opacity-90 transition-colors duration-300 rounded-2xl p-2 cursor-pointer"
                >
                  <Image
                    className="rounded-3xl aspect-square object-cover min-w-[40px] min-h-[40px]"
                    width={40}
                    height={40}
                    src={link.icon}
                    alt={link.title}
                    draggable={false}
                  />
                  <h2
                    style={{ color: profile.textColor }}
                    className="flex justify-center w-full font-medium text-base lg:text-lg"
                  >
                    {link.title}
                  </h2>
                </div>
              </Link>
            )
          );
        })}
      </div>
      <div className="mt-4 flex justify-center items-center gap-x-2">
        <p>Powered by</p>
        <Image className="w-[100px]" src={LinklushLogo} alt="Linklush logo" />
      </div>
      <p className="mt-2">
        Made by{" "}
        <Link
          className="underline"
          href="https://my-portfolio-two-brown.vercel.app/"
        >
          Vishal Lohar
        </Link>
      </p>
    </>
  );
};

export default DisplayUserProfileWithLinks;
