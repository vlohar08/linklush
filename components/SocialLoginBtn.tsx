import Image from "next/image";

type SocialLoginBtn = {
  provider: string;
  logo: string;
  onClick: () => void;
};

const SocialLoginBtn = ({ provider, logo, onClick }: SocialLoginBtn) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-4 flex justify-center font-medium items-center gap-x-3 border-2 border-primary-light hover:border-primary transition-colors duration-300 rounded-lg px-3 py-2"
    >
      <Image
        draggable={false}
        src={logo}
        width={25}
        height={25}
        alt={provider}
      />
      Continue with {provider}
    </button>
  );
};

export default SocialLoginBtn;
