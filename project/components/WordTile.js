function WordTile({ word, isSelected, status, onClick }) {
    try {
        const classes = [
            'word-tile',
            isSelected ? 'selected' : '',
            status || ''
        ].filter(Boolean).join(' ');

        return (
            <div 
                className={classes}
                onClick={onClick}
                data-name="word-tile"
            >
                {word}
            </div>
        );
    } catch (error) {
        console.error('WordTile component error:', error);
        reportError(error);
        return null;
    }
}
