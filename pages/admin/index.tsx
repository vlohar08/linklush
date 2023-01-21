import { GetServerSideProps } from "next";

const Admin = () => {
  return <div></div>;
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/admin/dashboard",
    },
    props: {},
  };
};
