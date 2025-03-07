function Header({ attemptsLeft }) {
  try {
    return (
      <header className="header" data-name="game-header">
        <h1 className="game-title" data-name="game-title">Connections</h1>
        <p className="game-subtitle" data-name="game-subtitle">
          Find groups of four related words
        </p>
        <p className="attempts-remaining" data-name="attempts-counter">
          Attempts remaining: {attemptsLeft}
        </p>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    reportError(error);
    return null;
  }
}
