export const getAllTopics = (data) => {
    const topics = data.map(video => video.topic);
    return [...new Set(topics)];
};

export const getAllSpeakers = (data) => {
    const speakers = data.flatMap(video => video.speakers);
    return [...new Set(speakers)];
};

export const getVideosByTopics = (data, selectedTopics) => {
    return data.filter(video => selectedTopics.includes(video.topic));
};

export const getVideosBySpeakers = (data, selectedSpeakers) => {
    return data.filter(video => video.speakers.some(speaker => selectedSpeakers.includes(speaker)));
};
