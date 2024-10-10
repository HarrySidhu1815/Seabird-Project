export const getAllSubjects = (data) => {
  const sujects = data.map((lesson) => lesson.subject);
  return [...new Set(sujects)];
};

export const getAllLessonBySubject = (data, subject) => {
  const lessons = data.filter((lesson) => lesson.subject === subject);

  lessons.sort((a, b) => {
    const gradeA = parseGrade(a.level);
    const gradeB = parseGrade(b.level);

    return gradeA - gradeB;
  });

  return lessons;
};

const parseGrade = (grade) => {
  if (grade.includes("-")) {
    return parseInt(grade.split("-")[0], 10);
  }
  if (grade.includes("/")) {
    return parseInt(grade.split("/")[0], 10);
  }

  return parseInt(grade, 10)
};
