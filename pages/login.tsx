import React, { FormEvent, useEffect, useState } from "react";
import SocialLoginBtn from "components/SocialLoginBtn";
import FormInput from "components/FormInput";
import Image from "next/image";
import linkLushLogo from "@/assets/linklush-logo.png";
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { actionCodeSettings, auth, provider } from "firebase.config";
import { useRouter } from "next/router";
import Head from "next/head";

const LoginOrRegister = () => {
  const [email, setEmail] = useState("");
  const [isLinkSent, setIsLinkSent] = useState(false);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace("/admin/dashboard");
    }
  });

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      } else {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((res) => {
        window.localStorage.setItem("emailForSignIn", email);
        setIsLinkSent(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
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
        {isLinkSent && (
          <p className="text-center mt-4">
            Account login link sent to your email address. Please follow the
            link inside to continue.
          </p>
        )}
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
