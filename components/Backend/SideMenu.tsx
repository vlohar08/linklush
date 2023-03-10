import {
  IconSmartHome,
  IconReportAnalytics,
  IconSettings,
  IconLogout,
} from "@tabler/icons";
import { auth } from "firebase.config";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const SideMenu = () => {
  const ICON_STROKE = 1;
  const ICON_SIZE = 30;
  const ICON_CLASSNAME =
    "rounded-2xl h-fit bg-primary-light hover:bg-secondary-light transition-colors duration-300 p-3 text-primary hover:text-secondary cursor-pointer";
  const router = useRouter();

  return (
    <aside className="flex h-fit lg:w-fit flex-row lg:flex-col gap-3 lg:min-h-[80vh] rounded-3xl bg-white p-2 m-2 mt-4 md:m-4">
      <Link href="/admin/dashboard">
        <div className={ICON_CLASSNAME}>
          <IconSmartHome
            size={ICON_SIZE}
            stroke={ICON_STROKE}
            color="currentColor"
          />
        </div>
      </Link>
      <Link href="/admin/analytics">
        <div className={ICON_CLASSNAME}>
          <IconReportAnalytics
            size={ICON_SIZE}
            stroke={ICON_STROKE}
            color="currentColor"
          />
        </div>
      </Link>
      <Link href="/admin/settings">
        <div className={ICON_CLASSNAME}>
          <IconSettings
            size={ICON_SIZE}
            stroke={ICON_STROKE}
            color="currentColor"
          />
        </div>
      </Link>
      <div
        className={ICON_CLASSNAME}
        onClick={() => {
          signOut(auth);
          router.replace("/login");
        }}
      >
        <IconLogout
          size={ICON_SIZE}
          stroke={ICON_STROKE}
          color="currentColor"
        />
      </div>
    </aside>
  );
};

export default SideMenu;
