import "./App.css";
import { useFact } from "./hooks/useFact";

const App = () => {
  const { fact, error, url, newFact } = useFact();

  return (
    <>
      <button onClick={newFact}>Fact!</button>
      {fact && <p>{fact}</p>}

      <h6>{error}</h6>
      {url && <img src={url} alt={`Cat saying ${fact}`} />}
      <footer className="repo">
        Github repo{" "}
        <a href="https://github.com/SFToro/exercises/tree/main/apps/gatos-react">
          Here
        </a>
      </footer>
    </>
  );
};

export default App;
