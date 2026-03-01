import "./styles/style.css";
import { Window } from "./Window";
import { SearchPanel } from "./SearchPanel";

export default function App() {
  return (
    <div>
      <h1>Weave Our Tapestry</h1>

      <Window title="Story Search">
        <SearchPanel />
      </Window>
    </div>
  );
}