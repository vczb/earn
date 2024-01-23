import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "features/company/Auth";
import { useCompany } from "features/company/companySlice";
import { useCustomer } from "features/customer/customerSlice";
import { Protected } from "routes/protected";
import Onboarding from "features/customer/Onboarding";
import Register from "features/customer/Register";
import Welcome from "features/customer/Welcome";
import Edit from "features/customer/Edit";
import Diamonds from "features/transaction/Diamonds";
import Wallet from "features/transaction/Wallet";
import List from "features/product/List";

export default function AppRoutes() {
  const { company } = useCompany();
  const { customer } = useCustomer();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected isAllowed={!!company.jwt?.length} />}>
          <Route path="/" element={<Onboarding />} />
          <Route
            element={
              <Protected isAllowed={!!customer.cpf?.length} redirectTo={"/"} />
            }
          >
            <Route path="/customer/new" element={<Register />} />
            <Route path="/customer/welcome" element={<Welcome />} />
            <Route
              element={
                <Protected isAllowed={!!customer.id?.length} redirectTo={"/"} />
              }
            >
              <Route path="/customer/edit" element={<Edit />} />

              <Route path="/transaction/diamonds" element={<Diamonds />} />
              <Route path="/transaction/wallet" element={<Wallet />} />

              <Route path="/product/list" element={<List />} />
            </Route>
          </Route>
        </Route>

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
