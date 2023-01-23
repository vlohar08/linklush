import Image from "next/image";
import Link from "next/link";
import LinklushLogo from "@/assets/linklush-logo.png";

const Error = () => {
  return (
    <div className="w-full px-4 flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Image className="w-[200px]" src={LinklushLogo} alt="linklush logo" />
      <h1 className="mt-6 mb-3 text-2xl text-center">
        The page you’re looking for doesn’t exist.
      </h1>
      <p className="text-center">
        Want this to be your username?{" "}
        <Link className="underline" href="/admin/dashboard">
          Create your Linklush now.
        </Link>
      </p>
    </div>
  );
};

export default Error;
