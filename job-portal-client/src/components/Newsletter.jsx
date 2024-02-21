import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
const Newsletter = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex item-center gap-2">
        <FaEnvelopeOpenText />
        Email me for jobs
      </h3>
      <p className="text-primary/75 text-base mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        officia adipisci id nobis accusamus fuga distinctio labore aliquam alias
        quod?
      </p>
      <div className="w-full space-y-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@mail.com"
          className="w-full block py-2 pl-3 border focus:outline-none"
        />
        <input
          type="submit"
          value="Subscribe"
          className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
        />
      </div>

      {/* part two */}

      <div className="mt-20">
        <h3 className="text-lg font-semibold mb-2 flex item-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          officia adipisci id nobis accusamus fuga distinctio labore aliquam
          alias quod?
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value={"Upload Your Resume"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
