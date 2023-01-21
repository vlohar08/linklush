import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

export type Link = {
  id: string;
  title: string;
  icon: string;
  iconName: string;
  href: string;
  isEnabled: boolean;
  isExpanded: boolean;
};

type LinkUpdate = React.Dispatch<
  React.SetStateAction<
    {
      id: string;
      title: string;
      icon: string;
      iconName: string;
      href: string;
      isEnabled: boolean;
      isExpanded: boolean;
    }[]
  >
>;

const LinksContext = createContext<Link[]>([]);
const UpdateLinksContext = createContext<LinkUpdate>(() => {});

export const useLinks = () => {
  return useContext(LinksContext);
};

export const useUpdateLinks = () => {
  return useContext(UpdateLinksContext);
};

export const defaultLinks = [
  {
    id: nanoid(),
    title: "Linklush",
    icon: "/assets/default-profile-img.png",
    iconName: "",
    href: "https://linklush.com",
    isEnabled: true,
    isExpanded: false,
  },
];

const LinksContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [links, setLinks] = useState(defaultLinks);
  return (
    <LinksContext.Provider value={links}>
      <UpdateLinksContext.Provider value={setLinks}>
        {children}
      </UpdateLinksContext.Provider>
    </LinksContext.Provider>
  );
};

export default LinksContextProvider;
