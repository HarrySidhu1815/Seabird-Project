export const DUMMY_DATA = [
    {
        id: '1',
        title: 'Title 1',
        topic: 'Band History Since Becoming In 1958',
        speaker: ['Andrew', 'Wayne'],
        videoUrl: 'https://example.com'
    },
    {
        id: '2',
        title: 'Title 2',
        topic: 'Band History Since Becoming In 1958',
        speaker: ['Bobb', 'Carlson'],
        videoUrl: 'https://example.com'
    },
    {
        id: '3',
        title: 'Title 3',
        topic: 'Biographical Profiles of Seabird Elders, Past and Present',
        speaker: ['Chapman', 'Charlie'],
        videoUrl: 'https://example.com'
    },
    {
        id: '4',
        title: 'Title 4',
        topic: 'Cultural Tradition',
        speaker: ['DeGroot', 'Douglas'],
        videoUrl: 'https://example.com'
    },
    {
        id: '5',
        title: 'Title 5',
        topic: 'Biographical Profiles of Seabird Elders, Past and Present',
        speaker: ['Froese', 'Harris'],
        videoUrl: 'https://example.com'
    },
    {
        id: 'video-6',
        title: 'Title 6',
        topic: 'Cultural Tradition',
        speaker: ['Joe', 'Louie'],
        videoUrl: 'https://example.com'
    },
    {
        id: '7',
        title: 'Title 7',
        topic: 'Family History of Living On, and Off Of, the Land.',
        speaker: ['Andrew', 'Wayne'],
        videoUrl: 'https://example.com'
    },
    {
        id: '8',
        title: 'Title 8',
        topic: 'Memorable Events, Occurance, Happening, and People',
        speaker: ['Keith', 'Harjoban'],
        videoUrl: 'https://example.com'
    },
    {
        id: '9',
        title: 'Title 9',
        topic: 'Memoryspaces and Memory Places',
        speaker: ['Leanne', 'Beth'],
        videoUrl: 'https://example.com'
    },
    {
        id: '10',
        title: 'Title 10',
        topic: 'Wage Labour',
        speaker: ['MacHalsie', 'Harry'],
        videoUrl: 'https://example.com'
    },
]

export const getAllTopics = (data) => {
    const topics = data.map(video => video.topic);
    return [...new Set(topics)];
};

export const getAllSpeakers = (data) => {
    const speakers = data.flatMap(video => video.speaker);
    return [...new Set(speakers)];
};

export const getVideosByTopics = (data, selectedTopics) => {
    return DUMMY_DATA.filter(video => selectedTopics.includes(video.topic));
};

export const getVideosBySpeakers = (data, selectedSpeakers) => {
    return DUMMY_DATA.filter(video => video.speaker.some(speaker => selectedSpeakers.includes(speaker)));
};
