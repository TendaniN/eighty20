import { Providers } from "state/providers";
import { BrowserRouter } from "react-router-dom";
import Pages from "pages/index";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </Providers>
  );
}

export default App;
