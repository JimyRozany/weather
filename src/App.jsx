import "./App.css";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
// icons
import { AiFillCloud } from "react-icons/ai";
function App() {
  return (
    <div className="app font-IBM">
      <div className="w-min mx-auto h-[100vh] flex flex-col items-center justify-center">
        <Card className="mt-6 w-96 bg-[#1c345b5c] text-white" dir="rtl">
          <CardBody>
            {/* city and time */}
            <div className="flex items-end justify-start gap-2 ">
              <Typography variant="h2" className="mb-2">
                فلسطين
              </Typography>
              <Typography variant="h5" className="mb-2">
                ٧-١٠-٢٠٢٣
              </Typography>
            </div>
            {/* End city and time */}
            <hr />
            {/* degree and description */}
            <div className="flex justify-between items-center">
              {/* info */}
              <div className="">
                {/* Temp */}
                <div className="mt-5">
                  <h3 className="text-6xl">32</h3>
                  {/*TODO: Temp icon */}
                </div>
                {/* End Temp */}
                {/* desc */}
                <div className="text-base">
                  <p>Lorem ipsum dolor.</p>
                </div>
                {/* End desc */}
                {/* Temp: max and min */}
                <div className="flex items-center justify-around">
                  <h3>الصغرى: ٢٨</h3>
                  <h3 className="mx-2">|</h3>
                  <h3>الكبرى: ٣٨</h3>
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
        <div className="w-full flex justify-end mt-1" dir="rtl">
          <Button variant="text" className="text-white font-IBM text-md">
            إنجليزي
          </Button>
        </div>
        {/* End Translation Button */}
      </div>
    </div>
  );
}

export default App;
