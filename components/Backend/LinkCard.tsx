import { IconDotsVertical, IconPencilMinus } from "@tabler/icons";
import { useLinks, useUpdateLinks } from "context/LinkContext";
import { useProfile } from "context/ProfileContext";
import { db } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";

type LinkCard = {
  id: string;
};

const LinkCard = ({ id }: LinkCard) => {
  const links = useLinks();
  const { uid } = useProfile();
  const linkIndex = links.findIndex((link) => link.id === id);
  const { icon, title, href } = links[linkIndex];
  const updateLinks = useUpdateLinks();
  const ICON_STROKE = 1;

  const handleLinkExpansion = async () => {
    const updatedLinks = [...links];
    updatedLinks[linkIndex].isExpanded = !updatedLinks[linkIndex].isExpanded;
    updateLinks(updatedLinks);
    await updateDoc(doc(db, "users", uid), {
      links: updatedLinks,
    });
  };

  return (
    <div className="flex items-center gap-x-1 md:gap-x-3 bg-link rounded-3xl px-3 py-4 mt-4">
      <IconDotsVertical stroke={ICON_STROKE} />
      <Image
        className="hidden md:block rounded-3xl aspect-square object-cover"
        src={icon}
        width={50}
        height={50}
        alt=""
      />
      <div>
        <h3 className="w-[15ch] xs:w-[30ch] sm:w-[40ch] md:w-[50ch] lg:w-[30ch] xl:w-[50ch] 2xl:w-[70ch] text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </h3>
        <p className="w-[15ch] xs:w-[30ch] sm:w-[40ch] md:w-[50ch] lg:w-[30ch] xl:w-[50ch] 2xl:w-[70ch] whitespace-nowrap text-ellipsis overflow-hidden">
          {href}
        </p>
      </div>
      <IconPencilMinus
        className="ml-auto cursor-pointer"
        stroke={ICON_STROKE}
        onClick={handleLinkExpansion}
      />
    </div>
  );
};

export default LinkCard;
