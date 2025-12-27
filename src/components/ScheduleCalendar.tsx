import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { fetchSchedule } from '../services/api';
import type { Schedule } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import '../styles/ScheduleCalendar.css';

/**
 * ScheduleCalendar component displays upcoming episode schedule in a calendar view
 */
const ScheduleCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [schedule, setSchedule] = useState<Map<string, Schedule[]>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    loadMonthSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const loadMonthSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const start = startOfMonth(currentMonth);
      const end = endOfMonth(currentMonth);
      const days = eachDayOfInterval({ start, end });

      const scheduleMap = new Map<string, Schedule[]>();

      // Fetch schedule for each day of the month
      const promises = days.map(async (day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        try {
          const daySchedule = await fetchSchedule(dateStr);
          if (daySchedule.length > 0) {
            scheduleMap.set(dateStr, daySchedule);
          }
        } catch {
          // Silently fail for individual days
          console.error(`Failed to fetch schedule for ${dateStr}`);
        }
      });

      await Promise.all(promises);
      setSchedule(scheduleMap);
    } catch {
      setError('Failed to load schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderCalendar = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Pad the beginning of the month
    const startDay = start.getDay();
    const paddingDays = Array(startDay).fill(null);

    return (
      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="calendar-day empty" />
        ))}
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const hasSchedule = schedule.has(dateStr);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <div
              key={dateStr}
              className={`calendar-day ${hasSchedule ? 'has-schedule' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => hasSchedule && handleDateClick(day)}
            >
              <span className="day-number">{format(day, 'd')}</span>
              {hasSchedule && <span className="schedule-indicator">•</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelectedDateSchedule = () => {
    if (!selectedDate) return null;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const daySchedule = schedule.get(dateStr) || [];

    return (
      <div className="selected-date-schedule">
        <h3>{format(selectedDate, 'MMMM d, yyyy')}</h3>
        <div className="schedule-list">
          {daySchedule.map((item) => (
            <div key={item.id} className="schedule-item">
              <div className="schedule-time">{item.airtime}</div>
              <div className="schedule-info">
                <p className="schedule-show">{item.show.name}</p>
                <p className="schedule-episode">
                  S{item.season}E{item.number}: {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading && schedule.size === 0) {
    return <LoadingSpinner message="Loading schedule..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadMonthSchedule} />;
  }

  return (
    <div className="schedule-calendar">
      <div className="calendar-header-controls">
        <button onClick={handlePrevMonth} className="month-nav-btn">
          ← Previous
        </button>
        <h2 className="current-month">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="month-nav-btn">
          Next →
        </button>
      </div>
      {renderCalendar()}
      {renderSelectedDateSchedule()}
    </div>
  );
};

export default ScheduleCalendar;