import React, { createContext, useContext, useState } from "react";

export type Profile = {
  uid: string;
  name: string;
  avatar: string;
  avatarName: string;
  description: string;
  link: string;
  showButton: boolean;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  primaryColor: string;
  textColor: string;
};

type UpdateProfileContext = React.Dispatch<
  React.SetStateAction<{
    uid: string;
    name: string;
    avatar: string;
    avatarName: string;
    description: string;
    link: string;
    showButton: boolean;
    buttonText: string;
    buttonLink: string;
    buttonColor: string;
    primaryColor: string;
    textColor: string;
  }>
>;
export const defaultProfile = {
  uid: "",
  name: "Linklush",
  avatar: "/assets/default-profile-img.png",
  avatarName: "",
  description: "Unleash the power of your online presence with Linklush",
  link: "",
  showButton: true,
  buttonText: "Message us",
  buttonLink: "https://linklush.com",
  buttonColor: "#07aef4",
  primaryColor: "#e0f5fe",
  textColor: "#000000",
};
const ProfileContext = createContext<Profile>(defaultProfile);
const UpdateProfileContext = createContext<UpdateProfileContext | (() => null)>(
  () => null
);

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const useUpdateProfile = () => {
  return useContext(UpdateProfileContext);
};

const ProfileContextProvider = ({
  children,
  uid,
}: {
  children: React.ReactNode;
  uid: string;
}) => {
  defaultProfile.uid = uid;
  defaultProfile.link = uid;
  const [profile, setProfile] = useState(defaultProfile);
  return (
    <ProfileContext.Provider value={profile}>
      <UpdateProfileContext.Provider value={setProfile}>
        {children}
      </UpdateProfileContext.Provider>
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
