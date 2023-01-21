import { IconWorldWww } from "@tabler/icons";
import { useLinks } from "context/LinkContext";
import { useProfile } from "context/ProfileContext";
import Image from "next/image";
import Link from "next/link";

const LinkPreview = () => {
  const links = useLinks();
  const profile = useProfile();
  return (
    <section className="lg:w-1/3 h-fit min-h-[800px] bg-white p-3 md:p-6 rounded-3xl m-2 md:m-4 text-center select-none">
      <div className="flex items-center gap-x-3 rounded-2xl mb-3 text-left py-2 px-3 border-2 border-gray-200">
        <IconWorldWww stroke={1} />
        <p className="text-ellipsis overflow-hidden w-[30ch]">
          linklush.vercel.app/{profile.link}
        </p>
      </div>
      <div className="rounded-3xl bg-secondary-light p-3 md:p-6">
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
          <Link className="pointer-events-none" href={profile.buttonLink}>
            <button
              className="rounded-xl bg-secondary hover:bg-primary transition-colors duration-300 py-1 px-4 text-white"
              type="button"
            >
              {profile.buttonText}
            </button>
          </Link>
        )}
      </div>
      {links.map((link) => {
        return (
          link.isEnabled && (
            <Link
              className="pointer-events-none"
              key={link.id}
              href={link.href}
            >
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
    </section>
  );
};

export default LinkPreview;
