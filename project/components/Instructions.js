function Instructions({ onStart }) {
    try {
        return (
            <div className="modal-overlay" data-name="instructions-modal">
                <div className="modal-content">
                    <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Find groups of four related words</li>
                        <li>Select four words and submit your guess</li>
                        <li>You have 4 lives to find all connections</li>
                        <li>Wrong guesses cost one life</li>
                    </ul>
                    <button 
                        className="start-button"
                        onClick={onStart}
                        data-name="start-button"
                    >
                        Start Game
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Instructions component error:', error);
        reportError(error);
        return null;
    }
}
