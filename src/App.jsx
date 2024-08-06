import { useState } from "react";
import PricePanel from "./panels/PricePanel";
import LevelPanel from "./panels/LevelPanel";
import "./App.css";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
};

const panels =[<PricePanel/>, <LevelPanel/>]

function App() {
  const [panel, setPanel] = useState(false);
  const changePanel = ()=> setPanel(!panel)

  return (
    <>
      <div>
        <div style={styles.container}>
          <h1>Умнич</h1>
          <button style={{ margin: "20px", "background-color": `${panel ? 'green' : 'blue'}` }} onClick={changePanel}>
            Тип панели
          </button>
          {panels[+panel]}
        </div>
      </div>
    </>
  );
}

export default App;
