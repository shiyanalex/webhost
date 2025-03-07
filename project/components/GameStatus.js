function GameStatus({ message, type }) {
  try {
    if (!message) return null;

    return (
      <div 
        className={`message message-${type}`}
        data-name="game-status"
      >
        {message}
      </div>
    );
  } catch (error) {
    console.error('GameStatus component error:', error);
    reportError(error);
    return null;
  }
}
