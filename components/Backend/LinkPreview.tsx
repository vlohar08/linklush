import { IconWorldWww } from "@tabler/icons";
import { useLinks } from "context/LinkContext";
import { useProfile } from "context/ProfileContext";
import DisplayUserProfileWithLinks from "./DisplayUserProfileWithLinks";
import { useLoading } from "context/LoadingContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LinkPreview = () => {
  const links = useLinks();
  const profile = useProfile();
  const isLoading = useLoading();
  return (
    <section className="pointer-events-none lg:w-1/3 h-fit min-h-[800px] bg-white p-3 md:p-6 rounded-3xl m-2 md:m-4 text-center select-none">
      <div className="flex items-center gap-x-3 rounded-2xl mb-3 text-left py-2 px-3 border-2 border-gray-200">
        <IconWorldWww stroke={1} />
        <p className="text-ellipsis overflow-hidden w-[30ch]">
          {isLoading ? "Loading..." : `linklush.vercel.app/${profile.link}`}
        </p>
      </div>
      {isLoading ? (
        <SkeletonTheme baseColor="#e0f5fe" highlightColor="#ffe8f0">
          <Skeleton
            className="mt-3"
            borderRadius={10}
            height={250}
            duration={2}
            count={1}
          />
          <Skeleton
            className="mt-3"
            borderRadius={10}
            height={60}
            duration={2}
            count={4}
          />
        </SkeletonTheme>
      ) : (
        <DisplayUserProfileWithLinks profile={profile} links={links} />
      )}
    </section>
  );
};

export default LinkPreview;
