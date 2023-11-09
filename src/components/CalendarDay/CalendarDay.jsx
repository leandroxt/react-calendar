import { useState } from "react";

import { Card, CardContent, Grid } from "@material-ui/core";
import CalendarDayFormReminder from "components/CalendarDayFormReminder";
import CalendarReminders from "components/CalendarReminders";
import Modal from "components/Modal";
import PropTypes from "prop-types";
import useCalendarStore from "store/calendar.store";

const CalendarDay = ({ day, month, year, height, isEnabled = false }) => {
  const date = `${day}.${month}.${year}`;
  const [
    mutateReminders,
    setUpdateID,
    getReminderToUpdate,
    updateReminderDate,
  ] = useCalendarStore((state) => [
    state.mutateReminders,
    state.setUpdateID,
    state.getReminderToUpdate,
    state.updateReminderDate,
  ]);
  const [open, setOpen] = useState(false);

  function toggleModal() {
    setOpen((prevState) => !prevState);
    setUpdateID(null, date);
  }

  function onConfirmForm(formReminder) {
    mutateReminders(date, formReminder);
    toggleModal();
  }

  function onClickChip(id) {
    toggleModal();
    setUpdateID(id, date);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const { reminderID, originDate } = JSON.parse(
          e.dataTransfer.getData("data")
        );
        updateReminderDate(reminderID, originDate, date);
      }}
    >
      <Card
        variant="outlined"
        style={{ height }}
        className={
          isEnabled
            ? "calendar-day-card"
            : "calendar-day-card calendar-day-card--disabled"
        }
        onClick={toggleModal}
      >
        <CardContent className="calendar-day-content">
          <Grid item>
            <div className="calendar-day-header">
              <p className="calendar-day-text">{day}</p>
            </div>
            <CalendarReminders date={date} onClickChip={onClickChip} />
          </Grid>
        </CardContent>
      </Card>
      <Modal open={open} onClose={toggleModal}>
        <CalendarDayFormReminder
          reminder={getReminderToUpdate(date)}
          onCancel={toggleModal}
          onConfirm={onConfirmForm}
        />
      </Modal>
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.string,
  year: PropTypes.string,
  height: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
};

export default CalendarDay;
