import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Quotation from "./pages/Quotation";
import Create_Quotations from "./pages/Create_Quotations";
import Purchase_Orders from "./pages/Purchase_Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Signin Page */}
        <Route path="/" element={<Signin />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />   {/* /dashboard */}
          <Route path="quotation" element={<Quotation />} /> {/* /dashboard/quotation */}
          <Route path="quotation/create-new-quotation" element={<Create_Quotations />} /> {/* /dashboard/quotation */}
          <Route path="Purchase-Orders" element={<Purchase_Orders />} /> {/* /dashboard/quotation */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
