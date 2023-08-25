import React, { useState, useEffect } from "react";
import JobList from "../components/JobList";
import { fetchData } from "../../helper";
import { useLoaderData } from "react-router-dom";
import iconRemove from "../assets/images/icon-remove.svg";

const Home = () => {
  const { jobData } = useLoaderData();

  const [jobs, setJobs] = useState(jobData);
  const [currentFilter, setCurrentFilter] = useState([]);

  const clearFilter = () => {
    setCurrentFilter([]);
  };

  const deleteFilter = (id) => {
    setCurrentFilter((prevFilter) =>
      prevFilter.filter((filter, index) => index !== id)
    );
  };

  const filterJobs = () => {
    let filteredJobs = jobData;

    if (currentFilter.length > 0) {
      const roleFilter = currentFilter.find(
        (filter) => filter.type === "role"
      )?.value;
      const levelFilter = currentFilter.find(
        (filter) => filter.type === "level"
      )?.value;
      const languageFilter = currentFilter
        .filter((filter) => filter.type === "language")
        .map((filter) => filter.value);

      filteredJobs = jobData.filter((job) => {
        const roleMatch = !roleFilter || job.role === roleFilter;
        const levelMatch = !levelFilter || job.level === levelFilter;
        const languageMatch =
          !languageFilter.length ||
          languageFilter.every((lang) => job.languages.includes(lang));
        return roleMatch && levelMatch && languageMatch;
      });
    }

    setJobs(filteredJobs);
  };

  useEffect(() => {
    filterJobs();
  }, [currentFilter]);

  const renderAppliedFilters = () => {
    return currentFilter.map((filter, index) => (
      <li className="filter__item" key={index}>
        {filter.value}
        <button className="filter__icon" onClick={() => deleteFilter(index)}>
          <img src={iconRemove} alt={`Remove ${filter.value}`} />
        </button>
      </li>
    ));
  };

  return (
    <div>
      <header className="header"></header>
      <main>
        {currentFilter.length > 0 && (
          <div className="filter-container">
            <ul className="filter">{renderAppliedFilters()}</ul>
            <div className="filter__clear">
              <button onClick={clearFilter}>Clear</button>
            </div>
          </div>
        )}

        {jobs.map((job) => (
          <JobList job={job} key={job.id} setCurrentFilter={setCurrentFilter} />
        ))}
      </main>
    </div>
  );
};

export default Home;

export const homeLoader = () => {
  const jobData = fetchData();

  return { jobData };
};
