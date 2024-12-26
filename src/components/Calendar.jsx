import "../styles/calendar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarDay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function Calendar() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date();
    date.setDate(1);

    const [currentDate, setCurrentDate] = useState({
        currentMonth: date.getMonth(),
        currentYear: date.getFullYear(),
        firstDay: new Date(date.getFullYear(), date.getMonth(), 1),
        lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        // prevLastDay: new Date(currentYear, currentMonth, 0),
        // prevLastDayDate: prevLastDay.getDate(),
        // nextDays: 7 - lastDayIndex - 1
    });


    function handleNextMonth() {
        console.log(currentDate.currentMonth);
        if (currentDate.currentMonth === 11) {
            setCurrentDate({
                currentMonth: 0,
                currentYear: currentDate.currentYear + 1,
                firstDay: new Date(currentDate.currentYear + 1, 0, 1),
                lastDay: new Date(currentDate.currentYear + 1, 1, 0),
            });
        } else {
            setCurrentDate({
                currentMonth: currentDate.currentMonth + 1,
                currentYear: currentDate.currentYear,
                firstDay: new Date(currentDate.currentYear, currentDate.currentMonth + 1, 1),
                lastDay: new Date(currentDate.currentYear, currentDate.currentMonth + 2, 0),
            });
        }
    }

    function hanldePrevMonth() {
        if (currentDate.currentMonth === 0) {
            setCurrentDate({
                currentMonth: 11,
                currentYear: currentDate.currentYear - 1,
                firstDay: new Date(currentDate.currentYear - 1, 11, 1),
                lastDay: new Date(currentDate.currentYear - 1, 12, 0),
            });
        } else {
            setCurrentDate({
                currentMonth: currentDate.currentMonth - 1,
                currentYear: currentDate.currentYear,
                firstDay: new Date(currentDate.currentYear, currentDate.currentMonth - 1, 1),
                lastDay: new Date(currentDate.currentYear, currentDate.currentMonth, 0),
            });
        }
    }

    return (
        <div className="calendar">
            <div className="calendar__header">
                <div className="month">{months[currentDate.currentMonth]} {currentDate.currentYear}</div>
                <div className="btns">
                    <div className="btn today-btn">
                        <FontAwesomeIcon icon={faCalendarDay} className="icon__calendar" />
                        {/* <i className="fas fa-calendar-day"></i> */}
                    </div>
                    <div onClick={hanldePrevMonth} className="btn prev-btn">
                        <FontAwesomeIcon icon={faChevronLeft} className="icon__calendar" />
                        {/* <i className="fas fa-chevron-left"></i> */}
                    </div>
                    <div onClick={handleNextMonth} className="btn next-btn">
                        <FontAwesomeIcon icon={faChevronRight} className="icon__calendar" />
                        {/* <i className="fas fa-chevron-right"></i> */}
                    </div>
                </div>
            </div>
            <div className="calendar__weekdays">
                <div className="day">Sun</div>
                <div className="day">Mon</div>
                <div className="day">Tue</div>
                <div className="day">Wed</div>
                <div className="day">Thu</div>
                <div className="day">Fri</div>
                <div className="day">Sat</div>
            </div>
            <div className="calendar__days">
                {/* Render previous month's days */}
                {Array.from({ length: currentDate.firstDay.getDay() }, (_, x) => {
                    const prevLastDay = new Date(currentDate.currentYear, currentDate.currentMonth, 0);
                    const prevLastDayDate = prevLastDay.getDate();
                    return (
                        <div className="day prev" key={`prev-${x}`}>
                            {prevLastDayDate - (currentDate.firstDay.getDay() - 1) + x}
                        </div>
                    )
                })}

                {/* Render current month's days */}
                {Array.from({ length: currentDate.lastDay.getDate() }, (_, i) => {
                    const day = i + 1;
                    const isToday =
                        day === new Date().getDate() &&
                        currentDate.currentMonth === new Date().getMonth() &&
                        currentDate.currentYear === new Date().getFullYear();

                    return (
                        <div
                            className={`day ${isToday ? "today" : ""}`}
                            key={`current-${day}`}
                        >
                            {day}
                        </div>
                    );
                })}

                {/* Render next month's days */}
                {Array.from({ length: 7 - currentDate.lastDay.getDay() - 1 }, (_, x) => {
                    return (
                        <div className="day next" key={`next-${x}`}>
                            {x + 1}
                        </div>
                    )
                })}

            </div>
        </div>

    );
}

export default Calendar;