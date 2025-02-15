import SideNavigation from "../_components/SideNavigation";
export default function Layout({ children }) {
  return (
    <div className="grid h-full gap-12 grid-cols-[16rem_1fr]">
      <div>
        <SideNavigation />
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
}
