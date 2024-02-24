import React, { useEffect } from "react";
import Banner from "../components/Banner";
import { useState } from "react";
import Jobs from "../Pages/Jobs";
import Card from "../components/Card";
import Sidebar from "../Sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Home = () => {
  const [selectCategory, setSelectCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json") // make this fetch the data from MongoDB
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio button filtering.
  const handleChange = (event) => {
    setSelectCategory(event.target.value);
  };

  // button based filtering
  const handleClick = (event) => {
    setSelectCategory(event.target.value);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main functions
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // filtering Input Items
    if (query) {
      filteredJobs = filteredItems;
    }

    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }

    // Slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectCategory, query);

  // ?????????????????????????????????????????????????????????????????????
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#first",
        popover: {
          title: "NavBar",
          description: "check for salary,Search,Post,Applied-jobs",
        },
      },
      {
        element: "#second",
        popover: {
          title: "Login",
          description: "Login to find make your search even better",
        },
      },
      {
        element: "#third",
        popover: {
          title: "Search jobs here",
          description: "Goodluck looking for your dream job👌",
        },
      },
      {
        element: "#fourth",
        popover: {
          title: "Filter",
          description: "Filter out the best jobs for you🤯",
        },
      },
    ],
  });
  driverObj.drive();
  // ??????????????????????????????????????????????????????????????????????

  return (
    <div className="text-blue">
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 text-black">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* jobs card */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}
          {/* pagination here */}
          {result.length > 0 ? (
            <div className="flex jsutify-centermt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* right side */}
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
