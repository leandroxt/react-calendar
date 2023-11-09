import { useReducer } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
import PropTypes from "prop-types";
import useCalendarStore from "store/calendar.store";

import { REMINDER_SIZE } from "../../constants";
import Forecast from "./Forecast";

const CalendarDayFormReminder = ({ reminder = {}, onCancel, onConfirm }) => {
  const [foundCities, fetchCities, cleanCities, fetchForecast] =
    useCalendarStore((state) => [
      state.foundCities,
      state.fetchCities,
      state.cleanCities,
      state.fetchForecast,
    ]);
  const [state, dispatch] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      reminder: reminder.reminder || "",
      city: reminder.city || { locationKey: "", name: "" },
      time: reminder.time || "",
    }
  );

  function onChange({ target }) {
    dispatch({ [target.id]: target.value });
  }

  function onChangeCity({ target }) {
    dispatch({ city: { ...state.city, name: target.value } });
    if (target.value.length >= 3) {
      fetchCities(target.value);
    }
  }

  function onClickSuggestion(locationKey, name) {
    cleanCities();
    dispatch({ city: { ...state.city, locationKey, name } });
    fetchForecast(locationKey);
  }

  function onClickConfirm() {
    onConfirm(state);
  }

  return (
    <div className="form-reminder">
      <h2>{reminder.id ? "Update" : "Create"} a reminder</h2>
      <Forecast />
      <div>
        <TextField
          id="city"
          label="City"
          variant="outlined"
          className="input-form input-city"
          InputLabelProps={{ shrink: true }}
          value={state.city.name}
          onChange={onChangeCity}
        ></TextField>
        <div className={`suggestions ${foundCities.length > 0 ? "show" : ""}`}>
          {foundCities.map((cit) => {
            const cityName = `${cit.name}, ${cit.state} - ${cit.country}`;
            return (
              <div
                key={cit.key}
                className="item"
                role="button"
                tabIndex={0}
                onClick={() => onClickSuggestion(cit.key, cityName)}
              >
                {cityName}
              </div>
            );
          })}
        </div>
        <TextField
          id="time"
          label="Time"
          variant="outlined"
          type="time"
          className="input-form"
          InputLabelProps={{ shrink: true }}
          value={state.time}
          onChange={onChange}
        />
      </div>
      <TextField
        id="reminder"
        label="Reminder"
        multiline
        minRows={4}
        variant="outlined"
        className="input-form"
        InputLabelProps={{ shrink: true }}
        inputProps={{
          maxLength: REMINDER_SIZE,
        }}
        value={state.reminder}
        onChange={onChange}
      />
      <p className="char-count">{`Characters count: ${state.reminder.length}/${REMINDER_SIZE}`}</p>

      <div className="actions">
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={onClickConfirm}>
          {reminder.id ? "Update" : "Create"} reminder
        </Button>
      </div>
    </div>
  );
};

CalendarDayFormReminder.propTypes = {
  reminder: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CalendarDayFormReminder;
