import { FC } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar";

interface LayoutProps {
  pageTitle: string;
  pageDescription?: string;
  heading: string;
}

const Layout: FC<LayoutProps> = ({
  pageTitle,
  pageDescription = "Welcome to Truckers Ng",
  heading,
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>Truckers Ng | {pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Navbar />
      <main className="bg-white pt-10">
        <header className="flex justify-center">
          <h1 className="font-bold text-3xl text-blue-700">{heading}</h1>
        </header>
        {children}
      </main>
    </>
  );
};

export default Layout;
