async function fetchFromDisc() {
    return [
        { pattern: "Colors", words: ["red", "blue", "green", "yellow"] },
        { pattern: "Shapes", words: ["circle", "square", "triangle", "rectangle"] },
        { pattern: "Planets", words: ["Mars", "Venus", "Earth", "Jupiter"] },
        { pattern: "Elements", words: ["fire", "water", "earth", "air"] }
    ];
}

async function fetchFromAI() {
    try {
        const response = await fetch("http://127.0.0.1:1234/v1/chat/completions");
        const data = await response.json();
        return data.map(entry => ({
            pattern: entry.pattern,
            words: entry.words.split(", ")
        }));
    } catch (error) {
        console.error("Error fetching from AI:", error);
        return [];
    }
}

let wordsData = [];
let words = [];
let selectedWords = [];

async function initializeGame() {
    const discData = await fetchFromDisc();
    const aiData = await fetchFromAI();
    wordsData = [...discData, ...aiData];
    words = wordsData.flatMap(group => group.words).sort(() => Math.random() - 0.5);
    document.getElementById("words-container").innerHTML = words.map(word => 
        `<span class='word' onclick='selectWord("${word}")'>${word}</span>`
    ).join(" ");
}

function selectWord(word) {
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(w => w !== word);
    } else if (selectedWords.length < 4) {
        selectedWords.push(word);
    }
    console.log(selectedWords);
}

function checkSelection() {
    const foundGroup = wordsData.find(group =>
        selectedWords.every(word => group.words.includes(word))
    );
    document.getElementById("result").textContent = foundGroup ? `Correct! Group: ${foundGroup.pattern}` : "Try again!";
    selectedWords = [];
}

document.addEventListener("DOMContentLoaded", initializeGame);
