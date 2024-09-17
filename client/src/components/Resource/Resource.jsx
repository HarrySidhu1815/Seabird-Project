import React, { useEffect, useState } from "react";
import arrow from "../../assets/arrow.png";
import Lesson from "./Lesson";
import classes from "./Resource.module.css";
import { getAllLessonBySubject, getAllSubjects } from "../../util/lesson";
import ErrorBlock from "../../UI/ErrorBlock";
import Loading from "../../UI/Loading";
import { useSelector } from "react-redux";

export default function Resource() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [expandedSubjects, setExpandedSubjects] = useState({
    'Sample': true
  });

  const {currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    async function fetchResources() {
      setIsLoading(true);
      const response = await fetch("/api/resources", {
        method: 'POST',
        body: JSON.stringify({
          user: currentUser,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setData(data.resource);
      setIsLoading(false);
    }

    fetchResources();
  }, []);

  function handleErrorClose() {
    setError(null);
  }

  function handleExpandClick(subject) {
    setExpandedSubjects((prevState) => ({
      ...prevState,
      [subject]: !prevState[subject],
    }));
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        {error && <ErrorBlock message={error} handleClose={handleErrorClose} />}
        <p>Error Occurred</p>
      </>
    );
  }

  const subjects = getAllSubjects(data);

  if(!currentUser){
      const lessons = getAllLessonBySubject(data, 'English');
      const isExpanded = expandedSubjects['Sample'];

      return (
        <div className={classes.resource}>
          <div>
          <div className={classes["lesson-header"]}>
            <h1>Sample Material</h1>
            <button onClick={() => handleExpandClick('Sample')}>
              <img
                className={isExpanded ? classes.close : classes.open}
                src={arrow}
                alt="arrow"
              />
            </button>
          </div>
          {isExpanded &&
            lessons.map((lesson) => {
              return (
                <Lesson
                  key={lesson.title}
                  title={lesson.title}
                  level={lesson.level}
                  link={lesson.resource_link}
                >
                  {lesson.description}
                </Lesson>
              );
            })}
        </div>
        </div>
      );
  }

  return (
    <div className={classes.resource}>
      {subjects.map((subject) => {
        const lessons = getAllLessonBySubject(data, subject);
        const isExpanded = expandedSubjects[subject];

        return (
          <div key={subject}>
            <div className={classes["lesson-header"]}>
              <h1>{subject}</h1>
              <button onClick={() => handleExpandClick(subject)}>
                <img
                  className={isExpanded ? classes.close : classes.open}
                  src={arrow}
                  alt="arrow"
                />
              </button>
            </div>
            {isExpanded &&
              lessons.map((lesson) => {
                return (
                  <Lesson
                    key={lesson.title}
                    title={lesson.title}
                    level={lesson.level}
                    link={lesson.resource_link}
                  >
                    {lesson.description}
                  </Lesson>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
