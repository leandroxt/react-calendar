import serviceWeather from "services/weather";
import { create } from "zustand";

const useCalendarStore = create((set, get) => ({
  reminders: {},
  updateID: null,
  foundCities: [],
  forecast: null,

  setUpdateID(updateID, date) {
    let forecast = get().forecast;
    if (!updateID) {
      forecast = null;
    } else {
      const reminder = get().reminders[date].find(
        (item) => item.id === updateID
      );

      get().fetchForecast(reminder.city.locationKey);
    }

    set(() => ({
      updateID,
      forecast,
    }));
  },

  getReminderToUpdate(date) {
    const dateReminders = get().reminders[date] || [];

    return dateReminders
      ? dateReminders.find((item) => item.id === get().updateID)
      : {};
  },

  mutateReminders(date, { city, reminder, time }) {
    if (!city || !reminder || !time) return;

    const upID = get().updateID;

    set((state) => {
      let dateReminders = state.reminders[date] || [];

      if (upID) {
        // update
        dateReminders = dateReminders.map((item) =>
          item.id === upID ? { id: upID, city, reminder, time } : item
        );
      } else {
        // add new
        dateReminders = [
          ...dateReminders,
          {
            id: Math.random().toString(),
            city,
            reminder,
            time,
          },
        ];
      }

      return {
        updateID: null,
        reminders: {
          ...state.reminders,
          [date]: dateReminders.sort((a, b) => a.time.localeCompare(b.time)),
        },
      };
    });
  },

  updateReminderDate(id, originDate, newDate) {
    const reminders = get().reminders;

    const reminderToTransfer = reminders[originDate].find(
      (reminder) => reminder.id === id
    );

    const origin = reminders[originDate].filter(
      (reminder) => reminder.id !== id
    );

    const destination = [
      ...(reminders[newDate] || []),
      reminderToTransfer,
    ].sort((a, b) => a.time.localeCompare(b.time));

    set(() => ({
      reminders: {
        ...reminders,
        [originDate]: [...origin],
        [newDate]: [...destination],
      },
    }));
  },

  async fetchCities(q) {
    const data = await serviceWeather.getLocation(q);

    const foundCities = data.map((city) => ({
      key: city.Key,
      name: city.EnglishName,
      state: city.AdministrativeArea.EnglishName,
      country: city.Country.EnglishName,
    }));

    set(() => ({
      foundCities,
    }));
  },

  cleanCities() {
    set(() => ({ foundCities: [] }));
  },

  async fetchForecast(locationkey) {
    const { Headline, DailyForecasts } = await serviceWeather.getForecast(
      locationkey
    );
    set(() => ({
      forecast: {
        text: Headline.Text,
        daily: DailyForecasts[0],
      },
    }));
  },
}));

export default useCalendarStore;
