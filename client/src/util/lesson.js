export const DUMMY_LESSONS = [
    {
        id: '1',
        subject: 'English',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '2',
        subject: 'English',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '3',
        subject: 'Mathematics',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '4',
        subject: 'Mathematics',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '5',
        subject: 'Science',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '6',
        subject: 'Science',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '7',
        subject: 'Social Studies',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
    {
        id: '8',
        subject: 'Social Studies',
        title: 'Lesson Title',
        level: 'Grade Level',
        description: 'This is a description of the subject, information, learning outcomes, lesson plan, and the kinds of classroom activities it may or may not include.',
        packageLink: 'http://dummy_url.com'
    },
]

export const getAllSubjects = (data) => {
    const sujects = data.map(lesson => lesson.subject)
    return [...new Set(sujects)]
}

export const getAllLessonBySubject = (data, subject) => {
    const lessons = data.filter(lesson => lesson.subject === subject)
    return lessons
}