import "./App.css";
//react
import { useEffect, useState } from "react";
// material-tailwind
import { Card, CardBody, Button } from "@material-tailwind/react";
// icons
import { AiFillCloud } from "react-icons/ai";
// other
import axios from "axios";
import moment from "moment";
import "moment/min/locales";

// translation
import { useTranslation } from "react-i18next";

function App() {
  // locale
  const [locale, setLocale] = useState("ar");
  // translation
  const { t, i18n } = useTranslation();
  // temperature state
  const [temp, setTemp] = useState({
    currentTemp: null,
    maxTemp: null,
    minTemp: null,
    desc: "",
    weatherStatusIcon: null,
  });
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
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.898043&lon=35.204269&appid=e0c0ed54a37f0444ba95f174ab44dc20"
      )
      .then(function (response) {
        // handle success
        setTemp({
          currentTemp: Math.round(response.data.main.temp - 272.15),
          maxTemp: Math.round(response.data.main.temp_max - 272.15),
          minTemp: Math.round(response.data.main.temp_min - 272.15),
          desc: response.data.weather[0].description,
          weatherStatusIcon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
                  <h3 className="text-6xl">{temp.currentTemp}</h3>
                  <img src={temp.weatherStatusIcon} alt="weather-status-icon" />
                </div>
                {/* End Temp */}
                {/* desc */}
                <div className="text-base">
                  <p>{t(temp.desc)}</p>
                </div>
                {/* End desc */}
                {/* Temp: max and min */}
                <div className="flex items-center justify-around">
                  <h3>
                    {t("min")}: {temp.minTemp}
                  </h3>
                  <h3 className="mx-2">|</h3>
                  <h3>
                    {t("max")}: {temp.maxTemp}
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
