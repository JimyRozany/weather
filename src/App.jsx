import "./App.css";
//react
import { useEffect, useState } from "react";
// material-tailwind
import { Card, CardBody, Button, Spinner } from "@material-tailwind/react";
// icons
import { AiFillCloud } from "react-icons/ai";
// other
import moment from "moment";
import "moment/min/locales";

// translation
import { useTranslation } from "react-i18next";

// redux
import { useDispatch, useSelector } from "react-redux";
// import thunk function
import { getWeather } from "./features/weather/weatherSlice";
function App() {
  // redux
  // temperature object
  const temp = useSelector((state) => {
    return state.weather.weather;
  });
  // is loading
  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });

  const dispatch = useDispatch();

  // locale
  const [locale, setLocale] = useState("ar");
  // translation
  const { t, i18n } = useTranslation();
  
  // date&time
  const [dateAndTime, setDateAndTime] = useState(null);

  // direction
  const direction = locale === "ar" ? "rtl" : "ltr";

  // =========== event handlers ============
  function handleLanguageClick() {
    if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      setDateAndTime(moment().locale("en").format("dddd . Do MMMM YYYY"));
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      setDateAndTime(moment().locale("ar").format("dddd . Do MMMM YYYY"));
    }
  }
  useEffect(() => {
    // select language
    i18n.changeLanguage(locale);
    setDateAndTime(moment().locale(locale).format("dddd . Do MMMM YYYY"));
    // get weather info " call api"
    dispatch(getWeather());
   
  }, []);
  return (
    <div className="app font-IBM">
      <div className="w-min mx-auto h-[100vh] flex flex-col items-center justify-center">
        <Card
          className="mt-6 w-[30rem] bg-[#1c345b5c] text-white"
          dir={direction}
        >
          <CardBody>
            {/* city and time */}
            <div className="flex items-end justify-start gap-2 mb-4 ">
              <h2 className=" text-4xl font-bold">{t("palestine")}</h2>
              <h2 className=" text-sm font-medium">{dateAndTime}</h2>
            </div>
            {/* End city and time */}
            <hr />
            {/* degree and description */}
            <div className="flex justify-between items-center">
              {/* info */}
              <div className="">
                {/* Temp */}
                <div className="mt-5 flex items-center justify-between">
                  {isLoading ? (
                    <Spinner color="white" className="h-12 w-12 text-white" />
                  ) : (
                    <>
                      <h3 className="text-6xl">{temp.currentTemp}</h3>
                      <img
                        src={temp.weatherStatusIcon}
                        alt="weather-status-icon"
                      />
                    </>
                  )}
                </div>
                {/* End Temp */}
                {/* desc */}
                <div className="text-base">
                  {isLoading ? <Spinner /> : <p>{t(temp.desc)}</p>}
                </div>
                {/* End desc */}
                {/* Temp: max and min */}
                <div className="flex items-center justify-around">
                  <h3>
                    {t("min")}:{" "}
                    {isLoading ? <Spinner /> : <span>{temp.minTemp}</span>}
                  </h3>
                  <h3 className="mx-2">|</h3>
                  <h3>
                    {t("max")}:{" "}
                    {isLoading ? <Spinner /> : <span>{temp.maxTemp}</span>}
                  </h3>
                </div>
                {/* End Temp: max and min */}
              </div>
              {/* End info */}
              {/* icon weather status */}
              <div className="">
                <AiFillCloud className="text-9xl" />
              </div>
              {/* End icon weather status */}
            </div>
            {/* End degree and description */}
          </CardBody>
        </Card>
        {/* Translation Button */}
        <div className="w-full flex justify-end mt-1" dir={direction}>
          <Button
            variant="text"
            className="text-white font-IBM text-md"
            onClick={handleLanguageClick}
          >
            {locale === "ar" ? "إنجليزي" : "Arabic"}
          </Button>
        </div>
        {/* End Translation Button */}
      </div>
    </div>
  );
}

export default App;
