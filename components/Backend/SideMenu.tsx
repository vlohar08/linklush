import {
  IconSmartHome,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons";
import Link from "next/link";

const SideMenu = () => {
  const ICON_STROKE = 1;
  const ICON_SIZE = 30;
  const ICON_CLASSNAME =
    "rounded-2xl h-fit bg-primary-light hover:bg-secondary-light transition-colors duration-300 p-3 text-primary hover:text-secondary cursor-pointer";
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
    </aside>
  );
};

export default SideMenu;
