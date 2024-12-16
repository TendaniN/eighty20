export const PageContainer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <div className="w-full bg-slate-100" style={{ height: "calc(100vh - 5rem)" }}>
    {children}
  </div>
);
