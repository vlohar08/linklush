import Image from "next/image";
import linklushLogo from "@/assets/linklush-logo.png";
import {
  defaultProfile,
  useProfile,
  useUpdateProfile,
} from "context/ProfileContext";
import { useCallback, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "firebase.config";
import { defaultLinks, useUpdateLinks } from "context/LinkContext";

const Header = () => {
  const profile = useProfile();
  const updateLinks = useUpdateLinks();
  const updateProfile = useUpdateProfile();

  const getUserData = useCallback(async () => {
    if (profile.uid) {
      const docRef = doc(db, "users", profile.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        updateLinks(docData.links);
        updateProfile(docData.profile);
      } else {
        await setDoc(doc(db, "users", profile.uid), {
          links: defaultLinks,
          profile: defaultProfile,
        });
      }
    }
  }, [profile.uid, updateLinks, updateProfile]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white">
      <Image src={linklushLogo} width={150} alt="Linklush" />
      <div className="flex gap-x-2 items-center">
        <Image
          className="hidden sm:block aspect-square rounded-3xl min-w-[40px] min-h-[40px] object-cover"
          src={profile.avatar}
          width={40}
          height={40}
          alt="User Profile Image"
        />
        <p className="w-[10ch] sm:w-fit font-medium text-base whitespace-nowrap text-ellipsis overflow-hidden">
          Hello, {profile.name}
        </p>
      </div>
    </header>
  );
};

export default Header;
