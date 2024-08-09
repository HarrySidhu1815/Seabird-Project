import React, { useState } from "react";
import arrow from "../../assets/arrow.png";
import Lesson from "./Lesson";
import classes from "./Resource.module.css";
import { getAllLessonBySubject, getAllSubjects } from "../../util/lesson";

export default function Resource() {
  const subjects = getAllSubjects();

  return (
    <div className={classes.resource}>
      {subjects.map((subject) => {
        const lessons = getAllLessonBySubject(subject);
        const [isExpanded, setIsExpanded] = useState(false);

        function handleExpandClick() {
          setIsExpanded((prevState) => !prevState);
        }
        return (
          <div key={subject}>
            <div className={classes["lesson-header"]}>
              <h1>{subject}</h1>
              <button onClick={handleExpandClick}>
                <img className={isExpanded ? classes.close : classes.open} src={arrow} alt="arrow" />
              </button>
            </div>
            {isExpanded &&
              lessons.map((lesson) => {
                return (
                  <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    level={lesson.level}
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
