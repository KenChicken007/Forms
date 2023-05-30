import "./App.css";
import Main from "./Components/main";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <AnimatePresence>
        <Main />
      </AnimatePresence>
    </>
  );
}

export default App;
