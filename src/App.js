import "./App.css";
import { Button } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";

function App() {
  return (
    <>
      <h1>hello </h1>
      <Button className="bg-green-400">
        {" "}
        <AiFillHome className="text-4xl text-white" />
      </Button>
    </>
  );
}

export default App;
