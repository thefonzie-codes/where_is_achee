import './App.css';
import itinerary from './itinerary.json';
import { useState, useEffect } from 'react';
import { peruTheme } from './theme';
import PasswordGate from './components/PasswordGate';
import LocationMap from './components/LocationMap';
import MachuPicchuIcon from './components/MachuPicchuIcon';

// Add theme variables to CSS
const initializeTheme = () => {
    const root = document.documentElement;
    Object.entries(peruTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
};

const isToday = (dateString) => {
    //const today = new Date(Date.now()).toISOString().split('T')[0];
    const today = "2025-01-20";
    console.log(dateString);
    console.log(dateString === today);
    return dateString === today;
};

function TodayActivities({ date, className }) {
    const today = itinerary.find(day => day.date === date);

    if (!today) {
        // Check if the date is before the trip starts or after it ends
        const tripStart = itinerary[0].date;
        const tripEnd = itinerary[itinerary.length - 1].date;
        
        if (date < tripStart) {
            return (
                <div className="activity-card">
                    <h1>Trip not started</h1>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="bullet">•</span>
                            <p>The adventure begins on {tripStart}!</p>
                        </div>
                    </div>
                </div>
            );
        }
        
        if (date > tripEnd) {
            return (
                <div className="activity-card">
                    <h1>Achee is home!</h1>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="bullet">•</span>
                            <p>The journey ended on {tripEnd}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const Activities = () => {
        return (
            <div className="activity-list">
                {today.activities.map((activity, index) => (
                    <div key={`${today.dayNumber}-${index}`} className="activity-item">
                        <span className="bullet">•</span>
                        <p>{activity}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`activity-card ${className}`}>
            <h1>Day {today.dayNumber}</h1>
            <h3>{today.location}</h3>
            <LocationMap location={today.location} />
            <Activities />
        </div>
    );
}

function App() {
    const [showDate, setShowDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isSwiping, setIsSwiping] = useState(false);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    useEffect(() => {
        initializeTheme();

        // Add keyboard event listener
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowLeft') {
                changeDate(-1);
            } else if (event.key === 'ArrowRight') {
                changeDate(1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [showDate]); // Add showDate as dependency to ensure latest state

    const changeDate = (direction) => {
        const currentDate = new Date(showDate);
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + direction);
        setShowDate(newDate.toISOString().split('T')[0]);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
        setTouchEnd(null); // Reset touchEnd
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            changeDate(1);
        } else if (isRightSwipe) {
            changeDate(-1);
        }

        // Reset values
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleCorrectPassword = () => {
        setIsAuthenticated(true);
    };

    const MainContent = () => (
        <>
            <header className="app-header">
                <h1>Where is Achee?</h1>
                <h2>{showDate}</h2>
                <p>South America Edition</p>
            </header>
            <div 
                className="carousel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <button onClick={() => changeDate(-1)}>&larr;</button>
                <TodayActivities 
                    date={showDate} 
                    className={touchEnd ? 'swiping' : ''}
                />
                <button onClick={() => changeDate(1)}>&rarr;</button>
            </div>
        </>
    );

    return (
        <PasswordGate onCorrectPassword={handleCorrectPassword}>
            <MainContent />
        </PasswordGate>
    );
}

export default App;
