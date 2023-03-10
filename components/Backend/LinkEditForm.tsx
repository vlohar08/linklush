import { IconInnerShadowBottomLeft, IconTrash } from "@tabler/icons";
import { useLinks, useUpdateLinks } from "context/LinkContext";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import Button from "./Button";
import ChangeImage from "./ChangeImage";
import FormInput from "../FormInput";
import Toggle from "./Toggle";
import { db } from "firebase.config";
import { useProfile } from "context/ProfileContext";
import resizeFile from "utils/resizeImage";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";

const LinkEditForm = ({ id }: { id: string }) => {
  const ICON_STROKE = 1;
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const links = useLinks();
  const { uid, link } = useProfile();
  const linkIndex = links.findIndex((link) => link.id === id);
  const { icon, iconName, isExpanded, isEnabled, href, title } =
    links[linkIndex];
  const updateLinks = useUpdateLinks();
  let updatedLinks = [...links];

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const resizedImage = await resizeFile(e.target.files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, nanoid(5) + e.target.files[0].name);
      uploadBytes(storageRef, resizedImage).then(async ({ metadata }) => {
        updatedLinks[
          linkIndex
        ].icon = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/${metadata.fullPath}?alt=media`;
        updatedLinks[linkIndex].iconName = metadata.fullPath;
        //Update User on database
        await updateDoc(doc(db, "users", uid), {
          links: updatedLinks,
        });
        await fetch("/api/revalidate", {
          method: "POST",
          body: JSON.stringify({ profileLink: link }),
        });
        updateLinks(updatedLinks);
        setIsUploading(false);
      });
      //Delete previous Icon
      if (iconName) {
        deleteObject(ref(storage, iconName));
      }
    }
  };

  const handleToggle = () => {
    updatedLinks[linkIndex].isEnabled = !updatedLinks[linkIndex].isEnabled;
    updateLinks(updatedLinks);
  };

  const handleDelete = async () => {
    updatedLinks = updatedLinks.filter((link) => link.id !== id);
    updateLinks(updatedLinks);
    await updateDoc(doc(db, "users", uid), {
      links: updatedLinks,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateDoc(doc(db, "users", uid), {
      links,
    });
    await fetch("/api/revalidate", {
      method: "POST",
      body: JSON.stringify({ profileLink: link }),
    });
    setIsSaving(false);
  };

  return (
    <div
      style={{ display: isExpanded ? "flex" : "none" }}
      className="flex flex-col gap-y-4 rounded-3xl border-2 border-gray-100 px-4 md:px-16 py-8 mt-4"
    >
      <Toggle state={isEnabled} onChange={handleToggle} />
      <FormInput
        type="text"
        title="Title"
        id={"title" + id}
        value={title}
        onChange={(e) => {
          updatedLinks[linkIndex].title = e.target.value;
          updateLinks(updatedLinks);
        }}
      />
      <FormInput
        type="text"
        title="URL"
        id={"url" + id}
        value={href}
        onChange={(e) => {
          updatedLinks[linkIndex].href = e.target.value;
          updateLinks(updatedLinks);
        }}
      />
      <ChangeImage
        title="Link"
        message={isUploading ? "Uploading..." : "Change icon or image"}
        icon={icon}
        onChange={handleIconChange}
        id={id}
        disabled={isUploading}
      />
      <div className="flex flex-wrap items-center justify-end gap-x-3">
        <Button
          className="!bg-white text-secondary hover:text-primary"
          title="Delete"
          icon={<IconTrash className="cursor-pointer" stroke={ICON_STROKE} />}
          onClick={handleDelete}
        />
        <Button
          icon={
            isSaving && (
              <IconInnerShadowBottomLeft
                className="animate-spin h-5 w-5 mr-3 ..."
                stroke={ICON_STROKE}
              />
            )
          }
          title={isSaving ? "Saving..." : "Save"}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default LinkEditForm;
