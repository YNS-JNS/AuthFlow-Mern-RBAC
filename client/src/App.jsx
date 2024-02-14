import { useEffect } from "react";

const App = () => {

  useEffect(() => {

    fetch("http://localhost:8000/test")
      .then((response) => {
        return response.json(); // Return the parsed JSON data
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => console.log("Failed to fetch"));

  }, [])


  return (
    <div className="bg-slate-700 font-display">
      <h1>Hello</h1>
    </div>
  )
}

export default App;