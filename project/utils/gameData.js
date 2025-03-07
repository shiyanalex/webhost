const WORD_GROUPS = [
    {
        pattern: "Types of Weather",
        words: ["RAIN", "SNOW", "STORM", "WIND"],
        color: "yellow"
    },
    {
        pattern: "Musical Instruments",
        words: ["PIANO", "GUITAR", "VIOLIN", "DRUMS"],
        color: "green"
    },
    {
        pattern: "Celestial Bodies",
        words: ["SUN", "MOON", "STAR", "PLANET"],
        color: "blue"
    },
    {
        pattern: "Body Parts",
        words: ["HEAD", "HAND", "FOOT", "HEART"],
        color: "purple"
    }
];

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function checkSelection(selectedWords, groupWords) {
    if (selectedWords.length !== 4) return false;
    return selectedWords.every(word => groupWords.includes(word));
}
