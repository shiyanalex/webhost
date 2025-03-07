function LivesCounter({ lives }) {
    try {
        return (
            <div className="lives-counter" data-name="lives-counter">
                {[...Array(4)].map((_, index) => (
                    <i 
                        key={index}
                        className={`fas fa-heart ${index >= lives ? 'empty' : ''}`}
                        data-name={`life-heart-${index}`}
                    ></i>
                ))}
            </div>
        );
    } catch (error) {
        console.error('LivesCounter component error:', error);
        reportError(error);
        return null;
    }
}
