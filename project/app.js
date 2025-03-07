function App() {
    try {
        const [showInstructions, setShowInstructions] = React.useState(true);
        const [words, setWords] = React.useState(() => {
            const allWords = WORD_GROUPS.flatMap(group => group.words);
            return shuffleArray(allWords);
        });

        const [selectedWords, setSelectedWords] = React.useState([]);
        const [solvedGroups, setSolvedGroups] = React.useState([]);
        const [lives, setLives] = React.useState(4);
        const [message, setMessage] = React.useState({ text: '', type: '' });

        const handleWordClick = (word) => {
            if (lives === 0) return;
            
            setSelectedWords(prev => {
                if (prev.includes(word)) {
                    return prev.filter(w => w !== word);
                }
                if (prev.length < 4) {
                    return [...prev, word];
                }
                return prev;
            });
        };

        const handleShuffle = () => {
            setWords(prev => shuffleArray([...prev]));
            setSelectedWords([]); // Automatically deselect when shuffling
        };

        const handleDeselectAll = () => {
            setSelectedWords([]);
        };

        const checkSelectionMatch = () => {
            for (const group of WORD_GROUPS) {
                if (solvedGroups.includes(group)) continue;
                
                if (selectedWords.length === 4 && 
                    selectedWords.every(word => group.words.includes(word))) {
                    return group;
                }
            }
            return null;
        };

        const handleSubmit = () => {
            if (selectedWords.length !== 4) return;

            const correctGroup = checkSelectionMatch();
            if (correctGroup) {
                setSolvedGroups(prev => [...prev, correctGroup]);
                setWords(prev => prev.filter(word => !selectedWords.includes(word)));
                setMessage({ text: 'Correct! Keep going!', type: 'success' });
                
                if (solvedGroups.length === WORD_GROUPS.length - 1) {
                    setMessage({ text: 'Congratulations! You won!', type: 'success' });
                }
            } else {
                setLives(prev => prev - 1);
                setMessage({ 
                    text: lives === 1 ? 'Game Over!' : 'Wrong combination. Try again!', 
                    type: 'error' 
                });
            }
            
            setSelectedWords([]);
        };

        return (
            <div className="game-container">
                {showInstructions && (
                    <Instructions onStart={() => setShowInstructions(false)} />
                )}
                
                <header className="header" data-name="game-header">
                    <h1 className="game-title" data-name="game-title">Connections</h1>
                    <p className="game-subtitle" data-name="game-subtitle">
                        Find groups of four related words
                    </p>
                    <LivesCounter lives={lives} />
                    <DarkModeToggle />
                </header>

                {message.text && (
                    <div className={`message ${message.type}`} data-name="game-message">
                        {message.text}
                    </div>
                )}

                <div className="solved-groups" data-name="solved-groups">
                    {solvedGroups.map((group, index) => (
                        <SolvedGroup key={index} {...group} />
                    ))}
                </div>

                {lives > 0 && words.length > 0 && (
                    <div data-name="game-active">
                        <div className="word-grid" data-name="word-grid">
                            {words.map((word, index) => (
                                <WordTile
                                    key={index}
                                    word={word}
                                    isSelected={selectedWords.includes(word)}
                                    onClick={() => handleWordClick(word)}
                                />
                            ))}
                        </div>
                        <div className="button-group" data-name="game-buttons">
                            <button
                                className="game-button shuffle-button"
                                onClick={handleShuffle}
                                data-name="shuffle-button"
                            >
                                Shuffle
                            </button>
                            <button
                                className="game-button submit-button"
                                onClick={handleSubmit}
                                disabled={selectedWords.length !== 4}
                                data-name="submit-button"
                            >
                                Submit
                            </button>
                            <button
                                className="game-button deselect-button"
                                onClick={handleDeselectAll}
                                disabled={selectedWords.length === 0}
                                data-name="deselect-button"
                            >
                                Deselect All
                            </button>
                        </div>
                    </div>
                )}

                {lives === 0 && (
                    <div className="remaining-groups" data-name="remaining-groups">
                        <h3 className="text-lg font-bold mb-2">Remaining Solutions:</h3>
                        {WORD_GROUPS
                            .filter(group => !solvedGroups.includes(group))
                            .map((group, index) => (
                                <SolvedGroup key={index} {...group} />
                            ))
                        }
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
