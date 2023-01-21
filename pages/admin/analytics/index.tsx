import Layout from "components/Backend/Layout";
import React, { ReactNode } from "react";

const Analytics = () => {
  return (
    <div className="bg-white rounded-3xl p-3 md:p-6">
      Analytics - Coming Soon!
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
