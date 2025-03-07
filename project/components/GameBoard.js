function GameBoard({ words, selectedWords, solvedWords, onWordClick }) {
  try {
    return (
      <div className="word-grid" data-name="game-board">
        {words.map((wordObj, index) => {
          const isSelected = selectedWords.includes(wordObj);
          const solvedCategory = solvedWords.find(group => 
            group.some(w => w.word === wordObj.word)
          )?.category;

          return (
            <WordTile
              key={index}
              word={wordObj.word}
              isSelected={isSelected}
              status={solvedCategory}
              onClick={() => onWordClick(wordObj)}
            />
          );
        })}
      </div>
    );
  } catch (error) {
    console.error('GameBoard component error:', error);
    reportError(error);
    return null;
  }
}
