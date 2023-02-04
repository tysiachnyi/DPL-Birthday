import { format, isToday } from "date-fns";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { BIRTHDAY_INPUT } from "../../constants/BirthdayInput.const";
import "./BirthdayForm.scss";
import Spinner from "../Spinner/Spinner";
import { BirthdayData } from "../../pages/BirthdayPage";
import { API_URLS } from "../../constants/api";
import Confetti from "react-confetti";

type BirthdayFormProps = {
  data: undefined | BirthdayData;
};

const BirthdayForm: FC<BirthdayFormProps> = ({ data }) => {
  const [selectedDay, setSelectedDay] = useState<number>(data?.day || 1);
  const [selectedMonth, setSelectedMonth] = useState<number>(data?.month || 1);
  const [selectedYear, setSelectedYear] = useState<number>(data?.year || 2000);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [succesMsg, setSuccesMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [rickRoll, setRickRoll] = useState<boolean>(false);
  const [isBirthday, setIsBirthday] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const birthday = isToday(
        new Date(new Date().getFullYear(), data.month - 1, data.day)
      );
      if (birthday) {
        setIsBirthday(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isBirthday) {
      setTimeout(() => {
        setIsBirthday(false);
      }, 5000);
    }
  }, [isBirthday]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const errorBlock = () => (
    <div className="error-notification">
      <div className="error-notification-text">{error}</div>
    </div>
  );

  const successBlock = () => (
    <div className="success-notification">
      <div className="success-notification-text">{succesMsg || "Success!"}</div>
    </div>
  );

  const showConfetti = () => {
    if (success && succesMsg) {
      return <Confetti numberOfPieces={300} />;
    }

    if (isBirthday) {
      setSuccess(true);
      setSuccesMsg("Happy Birthday! 🎉🎉🎉");
      return <Confetti numberOfPieces={300} />;
    }

    return null;
  };

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(Number(e.target.value));
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    setSuccesMsg(null);
    setSuccess(false);
    setLoading(true);
    setError(null);
    const currentYear = new Date().getFullYear();
    if (!selectedDay || !selectedMonth || !selectedYear) {
      setError("Please fill in all the fields");
      setLoading(false);
      return;
    }

    if (selectedYear > currentYear) {
      setError("Year cannot be in the future");
      setLoading(false);
      return;
    }

    const userAge = currentYear - selectedYear;
    if (userAge < 18) {
      setError("You must be 18 years old or older 🙁");
      setLoading(false);
      return;
    }

    const birthdayDate = format(
      new Date(selectedYear, selectedMonth - 1, selectedDay),
      "dd/MM/yyyy"
    );

    const today = isToday(
      new Date(currentYear, selectedMonth - 1, selectedDay)
    );

    if (birthdayDate === "01/04/2000") {
      setRickRoll(true);
    }

    try {
      const response = await fetch(API_URLS.BIRTHDAY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthday: birthdayDate,
        }),
      });

      if (response.ok) {
        if (today) {
          setSuccesMsg("Happy Birthday! 🎉🎉🎉");
        }
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 3000);
      } else {
        throw new Error();
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <div className="birthday-element">
      <div>
        {showConfetti()}
        <div className="succes-section">{success && successBlock()}</div>
        <div className="error-section">{error && errorBlock()}</div>
        <div className="spinner-section">{loading && <Spinner />}</div>
      </div>
      <div>
        {rickRoll && (
          <>
            <iframe
              width="560"
              height="315"
              src="http://www.youtube.com/embed/J7UwSVsiwzI?autoplay=1"
              allow="autoplay"
              title="rickroll"
            ></iframe>
          </>
        )}
      </div>
      <div>
        <div className="heading-container">
          <h1 className="heading">Please add your Birthday </h1>
          <span>🎂</span>
        </div>
        <div className="container">
          <div className="input-section">
            <label className="input-label">Day</label>
            <select
              disabled={loading}
              name="day"
              aria-selected="true"
              tabIndex={0}
              value={selectedDay}
              onChange={handleDayChange}
              className="input"
              id="day"
            >
              {Array.from({ length: daysInMonth }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="input-section">
            <label className="input-label">Month</label>
            <select
              disabled={loading}
              tabIndex={0}
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="input"
              id="month"
            >
              {Array.from({ length: BIRTHDAY_INPUT.MONTH.length }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {BIRTHDAY_INPUT.MONTH[i]}
                </option>
              ))}
            </select>
          </div>
          <div className="input-section">
            <label className="input-label">Year</label>
            <select
              disabled={loading}
              tabIndex={0}
              name="year"
              className="input"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Array.from({ length: 101 }, (_, i) => (
                <option
                  key={i + new Date().getFullYear() - 100}
                  value={i + new Date().getFullYear() - 100}
                >
                  {i + new Date().getFullYear() - 100}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="submit-button-section">
        <button
          disabled={loading}
          className="submit-button"
          onClick={handleSubmit}
        >
          <div>{loading ? "Saving" : "Submit"}</div>
        </button>
      </div>
    </div>
  );
};

export default BirthdayForm;
