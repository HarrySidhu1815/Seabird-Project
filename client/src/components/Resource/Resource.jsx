import React from "react";
import Lesson from "./Lesson";
import classes from './Resource.module.css'

export default function Resource() {
  return (
    <div className={classes.resource}>
      <div>
        <h1>English</h1>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
      </div>
      <div>
        <h1>Mathematics</h1>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
      </div>
      <div>
        <h1>Science</h1>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
      </div>
      <div>
        <h1>Social Studies</h1>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
        <Lesson title="Lesson Title" level="Grade Level">
          This is a description of the subject, information, learning outcomes,
          lesson plan, and the kinds of classroom activities it may or may not
          include.
        </Lesson>
      </div>
    </div>
  );
}
