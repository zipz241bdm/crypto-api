import { Route, Routes } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { CoinDetailsPage } from "./pages/CoinDetailsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ROUTES } from "./router/paths";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.coin} element={<CoinDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
