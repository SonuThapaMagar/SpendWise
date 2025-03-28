import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Content from "../content/Content";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Content />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
