import Button from "components/Backend/Button";
import ChangeImage from "components/Backend/ChangeImage";
import FormInput from "components/FormInput";
import Layout from "components/Backend/Layout";
import Toggle from "components/Backend/Toggle";
import React, { ReactNode, useState } from "react";
import { useProfile, useUpdateProfile } from "context/ProfileContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebase.config";
import findProfileByLink from "utils/findProfileByLink";
import resizeFile from "utils/resizeImage";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import ColorPicker from "components/Backend/ColorPicker";
import { IconInnerShadowBottomLeft } from "@tabler/icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLoading } from "context/LoadingContext";

const Settings = () => {
  const profile = useProfile();
  const updateProfile = useUpdateProfile();
  const updatedProfile = { ...profile };
  const isLoading = useLoading();
  const [isSaving, setIsSaving] = useState(false);

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const resizedImage = await resizeFile(e.target.files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, nanoid(5) + e.target.files[0].name);
      uploadBytes(storageRef, resizedImage).then(async ({ metadata }) => {
        updatedProfile.avatar = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/${metadata.fullPath}?alt=media`;
        updatedProfile.avatarName = metadata.fullPath;
        //Update user on database
        await updateDoc(doc(db, "users", profile.uid), {
          profile: updatedProfile,
        });
        updateProfile(updatedProfile);
      });
      //Delete previous avatar
      if (profile.avatarName) {
        deleteObject(ref(storage, profile.avatarName));
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const user = await findProfileByLink(profile.link);
    //Check if someone is using the entered link
    if (user && user.profile.uid !== profile.uid) {
      alert(
        `The entered profile link ${profile.link} is used by someone else. Please try again with different link.`
      );
      setIsSaving(false);
    } else {
      await updateDoc(doc(db, "users", profile.uid), {
        profile,
      });
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-3 bg-white rounded-3xl p-3 md:p-6">
      {isLoading ? (
        <SkeletonTheme baseColor="#e0f5fe" highlightColor="#ffe8f0">
          <Skeleton
            className="mt-3"
            borderRadius={10}
            height={40}
            duration={2}
            count={10}
          />
        </SkeletonTheme>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <FormInput
            id="name"
            type="text"
            title="Name"
            value={updatedProfile.name}
            onChange={(e) => {
              updatedProfile.name = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <FormInput
            id="description"
            type="text"
            title="Description"
            value={updatedProfile.description}
            onChange={(e) => {
              updatedProfile.description = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <FormInput
            id="link"
            type="text"
            title={`Link: linklush.vercel.app/${updatedProfile.link}`}
            value={updatedProfile.link}
            onChange={(e) => {
              updatedProfile.link = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <FormInput
            id="button-text"
            type="text"
            title="Button Text"
            value={updatedProfile.buttonText}
            onChange={(e) => {
              updatedProfile.buttonText = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <FormInput
            id="button-link"
            type="text"
            title="Button Link"
            value={updatedProfile.buttonLink}
            onChange={(e) => {
              updatedProfile.buttonLink = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <div className="flex items-center gap-x-3">
            <h2>Show Button</h2>
            <Toggle
              state={profile.showButton}
              onChange={() => {
                updatedProfile.showButton = !updatedProfile.showButton;
                updateProfile(updatedProfile);
              }}
            />
          </div>
          <ColorPicker
            title="Button Color"
            value={profile.buttonColor}
            onChange={(e) => {
              updatedProfile.buttonColor = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <ColorPicker
            title="Primary Color"
            value={profile.primaryColor}
            onChange={(e) => {
              updatedProfile.primaryColor = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <ColorPicker
            title="Text Color"
            value={profile.textColor}
            onChange={(e) => {
              updatedProfile.textColor = e.target.value;
              updateProfile(updatedProfile);
            }}
          />
          <ChangeImage
            title="Avatar"
            message="Change profile image"
            id={"1"}
            icon={profile.avatar}
            onChange={handleIconChange}
          />
          <Button
            className="ml-auto"
            icon={
              isSaving && (
                <IconInnerShadowBottomLeft
                  className="animate-spin h-5 w-5 mr-3 ..."
                  stroke={1}
                />
              )
            }
            title={isSaving ? "Saving..." : "Save"}
            onClick={handleSave}
          />
        </>
      )}
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      <Layout title="Linklush - Settings">{page}</Layout>
    </>
  );
};

export default Settings;
