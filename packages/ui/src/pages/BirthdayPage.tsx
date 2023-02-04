import { useEffect, useState } from "react";
import BirthdayForm from "../components/BirthdayForm/BirthdayForm";
import Spinner from "../components/Spinner/Spinner";
import { API_URLS } from "../constants/api";

export type BirthdayData = {
  day: number;
  month: number;
  year: number;
};

const BirthdayPage = () => {
  const [data, setData] = useState<BirthdayData | undefined>(undefined);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(API_URLS.BIRTHDAY);
        const bithdatDate = await response.json();

        const [day, month, year] = bithdatDate.data.split("/");
        setData({
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div>
        <BirthdayForm data={data} />
      </div>
    </>
  );
};

export default BirthdayPage;
