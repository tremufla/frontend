export default function MapLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <>
      {header}
      {children}
    </>
  );
}
