import React from "react";
import Header from "../components/website/Header";
import Hero from "../components/website/Hero";
import Section1 from "../components/website/Section1";
import Section2 from "../components/website/Section2";
import Section3 from "../components/website/Section3";

const Website = () => {
  return (
    <>
      {/* https://dribbble.com/shots/16442461-Hush-Messaging-App-Landing-Page */}
      <Header />
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
    </>
  );
};

export default Website;
