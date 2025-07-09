import React, { useState, useEffect } from 'react';

const Calendario = ({ onChange, initialRange = [null, null] }) => {
  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Actualizar selectedRange cuando cambien las props
  useEffect(() => {
    setSelectedRange(initialRange);
  }, [initialRange]);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

  const handleDayClick = (day) => {
    if (!day || isPastDate(day)) return;
    
    let newRange = [...selectedRange];

    if (!newRange[0] || (newRange[0] && newRange[1])) {
      newRange = [day, null];
    } else if (day >= newRange[0]) {
      newRange[1] = day;
    } else {
      newRange = [day, newRange[0]];
    }

    setSelectedRange(newRange);
    
    if (onChange && newRange[0] && newRange[1]) {
      // Validar que ambas fechas sean válidas antes de llamar onChange
      if (newRange[0] instanceof Date && !isNaN(newRange[0]) && 
          newRange[1] instanceof Date && !isNaN(newRange[1])) {
        onChange(newRange);
      }
    }
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startOffset = firstDay.getDay();
    const totalDays = lastDay.getDate();

    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i)); // Aquí está correcto: year, month, day
    }

    return days;
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + offset,
      1
    ));
  };

  const isInRange = (day) => {
    if (!selectedRange[0] || !selectedRange[1] || !day) return false;
    return day > selectedRange[0] && day < selectedRange[1];
  };

  const isStart = (day) =>
    day && selectedRange[0] && day.getTime() === selectedRange[0].getTime();

  const isEnd = (day) =>
    day && selectedRange[1] && day.getTime() === selectedRange[1].getTime();

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDay = new Date(day);
    compareDay.setHours(0, 0, 0, 0);
    return compareDay < today;
  };

  const days = getDaysInMonth();

  return (
    <div className="bg-zinc-900 text-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="text-gray-400 hover:text-white text-lg sm:text-xl px-2 sm:px-3 py-1 rounded hover:bg-zinc-800 transition"
        >
          ‹
        </button>
        <h2 className="text-lg sm:text-xl font-semibold text-center">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="text-gray-400 hover:text-white text-lg sm:text-xl px-2 sm:px-3 py-1 rounded hover:bg-zinc-800 transition"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs sm:text-sm mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-gray-400 font-medium p-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {days.map((day, index) => {
          const baseStyle =
            'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all text-xs sm:text-sm';
          const today = new Date();
          const isToday =
            day &&
            today.getDate() === day.getDate() &&
            today.getMonth() === day.getMonth() &&
            today.getFullYear() === day.getFullYear();

          const isPast = isPastDate(day);
          const hasFirstSelection = selectedRange[0] && !selectedRange[1];

          let className = baseStyle + ' ';

          if (!day) {
            className += 'invisible';
          } else if (isPast) {
            className += 'text-gray-600 cursor-not-allowed opacity-50';
          } else if (isStart(day)) {
            className += 'bg-emerald-500 text-white font-bold rounded-l-full cursor-pointer';
          } else if (isEnd(day)) {
            className += 'bg-emerald-500 text-white font-bold rounded-r-full cursor-pointer';
          } else if (isInRange(day)) {
            className += 'bg-emerald-500/20 text-white cursor-pointer';
          } else if (hasFirstSelection) {
            className += 'hover:bg-emerald-500/30 hover:text-white text-gray-300 cursor-pointer';
          } else {
            className += 'hover:bg-emerald-600/20 text-gray-300 hover:text-white cursor-pointer';
          }

          if (isToday && !isPast) {
            className += ' border border-emerald-400';
          }

          return (
            <div 
              key={index} 
              className={className} 
              onClick={() => handleDayClick(day)}
            >
              {day ? day.getDate() : ''}
            </div>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-300 gap-2 sm:gap-0">
        <div className="text-center sm:text-left">
          {selectedRange[0] && selectedRange[0] instanceof Date && !isNaN(selectedRange[0]) && (
            <span>
              🡆 Check-in:{' '}
              <span className="text-white">
                {`${selectedRange[0].getDate().toString().padStart(2, '0')}/${(selectedRange[0].getMonth() + 1).toString().padStart(2, '0')}/${selectedRange[0].getFullYear()}`}
              </span>
            </span>
          )}
        </div>
        <div className="text-center sm:text-right">
          {selectedRange[1] && selectedRange[1] instanceof Date && !isNaN(selectedRange[1]) && (
            <span>
              Check-out:{' '}
              <span className="text-white">
                {`${selectedRange[1].getDate().toString().padStart(2, '0')}/${(selectedRange[1].getMonth() + 1).toString().padStart(2, '0')}/${selectedRange[1].getFullYear()}`}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
