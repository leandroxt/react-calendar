import { Fragment } from "react";

import PropTypes from "prop-types";
import useCalendarStore from "store/calendar.store";

const CalendarReminders = ({ date, onClickChip }) => {
  const reminders = useCalendarStore(({ reminders }) => reminders);

  return (
    (reminders[date] &&
      reminders[date].map(({ id, time, reminder }) => (
        <div
          key={id}
          draggable
          className="calendar-reminder"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onClickChip(id);
          }}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              "data",
              JSON.stringify({ reminderID: id, originDate: date })
            );
          }}
        >{`${time} - ${reminder}`}</div>
      ))) || <Fragment />
  );
};

CalendarReminders.propTypes = {
  date: PropTypes.string.isRequired,
  onClickChip: PropTypes.func.isRequired,
};

export default CalendarReminders;
