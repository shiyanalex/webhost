function DarkModeToggle() {
    try {
        const [isDarkMode, setIsDarkMode] = React.useState(true);
        
        React.useEffect(() => {
            const savedMode = localStorage.getItem('darkMode');
            // If no saved preference, use dark mode by default
            const shouldUseDarkMode = savedMode === null ? true : savedMode === 'true';
            setIsDarkMode(shouldUseDarkMode);
            if (shouldUseDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }, []);
        
        const toggleDarkMode = () => {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            localStorage.setItem('darkMode', newMode);
            
            if (newMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        };
        
        return (
            <button 
                className="dark-mode-toggle" 
                onClick={toggleDarkMode}
                data-name="dark-mode-toggle"
            >
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
        );
    } catch (error) {
        console.error('DarkModeToggle component error:', error);
        reportError(error);
        return null;
    }
}
