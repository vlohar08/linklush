import { IconInnerShadowBottomLeft } from "@tabler/icons";
import Button from "components/Backend/Button";
import Layout from "components/Backend/Layout";
import { useAnalytics, useUpdateAnalytics } from "context/AnalyticsContext";
import { useLoading } from "context/LoadingContext";
import { useProfile } from "context/ProfileContext";
import { db } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import React, { ReactNode, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Analytics = () => {
  const { uid, link } = useProfile();
  const isLoading = useLoading();
  const [isSaving, setIsSaving] = useState(false);
  const analytics = useAnalytics();
  const updateAnalytics = useUpdateAnalytics();
  const handleSave = async () => {
    setIsSaving(true);
    await updateDoc(doc(db, "users", uid), {
      analytics: window.btoa(analytics),
    });
    await fetch("/api/revalidate", {
      method: "POST",
      body: JSON.stringify({ profileLink: link }),
    });
    setIsSaving(false);
  };
  return (
    <div className="bg-white rounded-3xl p-3 md:p-6">
      <h2 className="text-xl font-semibold">Add Tracking Code</h2>

      {isLoading ? (
        <Skeleton
          baseColor="#e0f5fe"
          highlightColor="#ffe8f0"
          className="mt-3"
          borderRadius={10}
          height={300}
          duration={2}
          count={1}
        />
      ) : (
        <>
          <textarea
            className="mt-4 w-full border-2 border-primary-light outline-none rounded-3xl p-6 resize-y"
            name="code"
            rows={15}
            value={analytics}
            onChange={(e) => updateAnalytics(e.target.value)}
          ></textarea>
          <Button
            className="ml-auto mt-4"
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

Analytics.getLayout = function getLayout(page: ReactNode) {
  return (
    <>
      <Layout title="Linklush - Analytics">{page}</Layout>
    </>
  );
};

export default Analytics;
