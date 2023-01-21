import React, { FormEvent, useState } from "react";
import SocialLoginBtn from "components/SocialLoginBtn";
import FormInput from "components/FormInput";
import Image from "next/image";
import linkLushLogo from "@/assets/linklush-logo.png";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";
import { actionCodeSettings, auth, provider } from "firebase.config";
import { useRouter } from "next/router";
import Head from "next/head";

const LoginOrRegister = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace("/admin/dashboard");
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <Head>
        <title>Linklush - Login or Register</title>
      </Head>
      <div className="w-[90%] max-w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 - -translate-y-1/2">
        <Image
          draggable={false}
          className="max-w-[180px] mx-auto"
          src={linkLushLogo}
          alt="linklush"
        />
        <p className="mt-4 mb-8 text-center text-base">
          Simplifying your online presence, one link at a time.
        </p>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <FormInput
            id="user-email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary background-animate rounded-lg px-3 py-2 text-white font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            Login or Register
          </button>
        </form>
        <SocialLoginBtn
          logo="/assets/google-logo.webp"
          provider="Google"
          onClick={handleGoogleLogin}
        />
      </div>
    </>
  );
};

export default LoginOrRegister;
