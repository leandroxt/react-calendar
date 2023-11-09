import { Fragment } from "react";

import useCalendarStore from "store/calendar.store";

const Forecast = () => {
  const forecast = useCalendarStore(({ forecast }) => forecast);

  if (!forecast) {
    return <Fragment />;
  }

  return (
    <div className="forecast">
      <p className="text">{forecast.text}</p>
      <div className="current-day">
        <div className="temperature">
          <p>
            <label>Max:</label>
            {`${forecast.daily.Temperature.Maximum.Value}°${forecast.daily.Temperature.Maximum.Unit}`}
          </p>
          <p>
            <label>Min:</label>
            {`${forecast.daily.Temperature.Minimum.Value}°${forecast.daily.Temperature.Minimum.Unit}`}
          </p>
        </div>

        <div>
          <div>
            Day
            <img
              src={`https://www.accuweather.com/images/weathericons/${forecast.daily.Day.Icon}.svg`}
              alt=""
            />
          </div>
          <p>{`${forecast.daily.Day.IconPhrase}`}</p>
        </div>
        <div>
          <div>
            Night
            <img
              src={`https://www.accuweather.com/images/weathericons/${forecast.daily.Night.Icon}.svg`}
              alt=""
            />
          </div>
          <p>{`${forecast.daily.Night.IconPhrase}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
