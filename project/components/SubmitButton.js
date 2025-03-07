function SubmitButton({ selectedWords, onSubmit }) {
  try {
    return (
      <button
        className="submit-button"
        onClick={onSubmit}
        disabled={selectedWords.length !== 4}
        data-name="submit-button"
      >
        Submit
      </button>
    );
  } catch (error) {
    console.error('SubmitButton component error:', error);
    reportError(error);
    return null;
  }
}
