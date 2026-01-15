import "./globals.scss";

export const metadata = {
  title: "Alex | Frontend Developer",
  description: "Creative frontend developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
