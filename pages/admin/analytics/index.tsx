import Layout from "components/Backend/Layout";
import { useLoading } from "context/LoadingContext";
import React, { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Analytics = () => {
  const isLoading = useLoading();
  return (
    <div className="bg-white rounded-3xl p-3 md:p-6">
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
        "Analytics - Coming Soon!"
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
