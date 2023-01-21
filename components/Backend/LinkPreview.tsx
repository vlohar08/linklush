import { IconWorldWww } from "@tabler/icons";
import { useLinks } from "context/LinkContext";
import { useProfile } from "context/ProfileContext";
import Image from "next/image";
import Link from "next/link";
import DisplayUserProfileWithLinks from "./DisplayUserProfileWithLinks";

const LinkPreview = () => {
  const links = useLinks();
  const profile = useProfile();
  return (
    <section className="pointer-events-none lg:w-1/3 h-fit min-h-[800px] bg-white p-3 md:p-6 rounded-3xl m-2 md:m-4 text-center select-none">
      <div className="flex items-center gap-x-3 rounded-2xl mb-3 text-left py-2 px-3 border-2 border-gray-200">
        <IconWorldWww stroke={1} />
        <p className="text-ellipsis overflow-hidden w-[30ch]">
          linklush.vercel.app/{profile.link}
        </p>
      </div>
      <DisplayUserProfileWithLinks profile={profile} links={links} />
    </section>
  );
};

export default LinkPreview;
