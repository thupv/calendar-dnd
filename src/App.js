import React from 'react';
import './App.scss';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Calendar from "./components/Calendar";
import {RecoilRoot} from "recoil";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <div className="App">
          <Calendar/>
        </div>
      </RecoilRoot>
    </DndProvider>
  );
}

export default App;
