import React from "react";
import "../assets/styles/landing.css";
import hero from "../assets/pictures/ofppt1.jpg";

function Home() {
  return (
    <section className="">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
            Building digital <br />
            products & brands.
          </h1>
          <p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl ">
            This free and open-source landing page template was built using the
            utility classNamees from
            <a href="https://tailwindcss.com" className="hover:underline">
              Tailwind CSS
            </a>
            and based on the components from the
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              className="hover:underline"
            >
              Flowbite Library
            </a>
            and the
            <a href="https://flowbite.com/blocks/" className="hover:underline">
              Blocks System
            </a>
            .
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img id="landing-image" src={hero} alt="hero image" />
        </div>
      </div>
    </section>
  );
}

export default Home;
