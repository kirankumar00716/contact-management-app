import { Route, Routes } from "react-router-dom";
import Contacts from "./Contacts";
import ContactForm from "../Components/ContactForm";
import EditContact from "../Components/EditContact";
import Dashboard from "./ChartsAndMaps";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Contacts />} />
      <Route path="/contact_form" element={<ContactForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
};

export default AllRoutes;