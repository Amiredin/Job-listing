const JobList = ({ job, setCurrentFilter }) => {
  const {
    company,
    logo,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,

    new: newPostion,
  } = job;

  const addFilter = (event, filterType) => {
    const buttonValue = event.target.value;
    setCurrentFilter((prevFilters) => [
      ...prevFilters,
      { type: filterType, value: buttonValue },
    ]);
  };

  return (
    <div className="job-list">
      <div className="job-list__right">
        <div className="logo">
          <img src={logo} alt={company} />
        </div>
        <div className="job-list__content">
          <div>
            <ul className="job-list__content__top">
              <li className="job-list__content__top__title">{company}</li>
              {newPostion ? <li className="new">new</li> : null}
              {featured ? <li className="featured">featured</li> : null}
            </ul>
          </div>
          <div className="job-list__content__middle">
            <h1 className="job-list__content__middle__title">{position}</h1>
          </div>
          <div>
            <ul className="job-list__content__bottom">
              <li>{postedAt} . </li>
              <li>{contract} .</li>
              <li>{location}</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="Job-list__left">
          <button
            className="Job-list__left__content"
            onClick={(event) => addFilter(event, "role")}
            value={role}
          >
            {role}
          </button>
          <button
            className="Job-list__left__content"
            onClick={(event) => addFilter(event, "level")}
            value={level}
          >
            {level}
          </button>
          {languages.map((language, index) => (
            <button
              className="Job-list__left__content"
              key={index}
              onClick={(event) => addFilter(event, "language")}
              value={language}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
