import React, { Fragment, ReactElement, useId } from "react";
import type { NextPageWithLayout } from "pages/_app";
import Layout from "components/Backend/Layout";
import LinkCard from "components/Backend/LinkCard";
import LinkEditForm from "components/Backend/LinkEditForm";
import { IconPlus } from "@tabler/icons";
import Button from "components/Backend/Button";
import { useLinks, useUpdateLinks } from "context/LinkContext";
import { nanoid } from "nanoid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebase.config";
import { useProfile } from "context/ProfileContext";

const Dashboard: NextPageWithLayout = () => {
  const links = useLinks();
  const { uid } = useProfile();
  const updateLinks = useUpdateLinks();

  const defaultLink = {
    id: nanoid(),
    title: "Linklush",
    icon: "/assets/default-profile-img.png",
    iconName: "",
    href: "https://linklush.com",
    isEnabled: true,
    isExpanded: false,
  };

  const handleAddNewLinks = async () => {
    updateLinks((prevLinks) => [...prevLinks, defaultLink]);
    await updateDoc(doc(db, "users", uid), {
      links: [...links, defaultLink],
    });
  };

  return (
    <div className="bg-white rounded-3xl p-3 md:p-6">
      <div className="flex flex-wrap items-center gap-x-2 justify-between">
        <h2 className="text-xl font-semibold">My link</h2>
        <Button
          onClick={handleAddNewLinks}
          title="Add New Link"
          icon={<IconPlus stroke={1} />}
        />
      </div>
      <div>
        {links.map(({ id }) => (
          <Fragment key={id}>
            <LinkCard id={id} />
            <LinkEditForm id={id} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout title="Linklush - Dashboard">{page}</Layout>
    </>
  );
};

export default Dashboard;
