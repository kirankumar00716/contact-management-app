import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editContact } from "../Redux/action";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  mob: number;
  status: string;
};

const Form: Contact = {
  id: "",
  first_name: "",
  last_name: "",
  mob: 0,
  status: "active",
};
interface StoreState {
  contacts: Contact[];
}

function EditContact() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const AllContact = useSelector((store: StoreState) => store.contacts);

  const [form, setForm] = useState<Contact>(Form);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function handleSave() {
    dispatch(editContact({ ...form }));
    window.location.href = "/";
  }

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    const contact = AllContact.find((el: any) => el.id == id);

    if (contact) {
      setForm(contact);
    }
  }, [AllContact, id]);

  return (
    <div className="w-1/2 mx-auto my-4 pt-16">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="first-name">
          First Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md"
          id="first-name"
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="last-name">
          Last Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md"
          id="last-name"
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="last-name">
          Mobile Number
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md"
          id="last-name"
          type="number"
          name="mob"
          value={form.mob}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select
          className="w-full border border-gray-400 p-2 rounded-md"
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value={"active"}>Active</option>
          <option value={"inactive"}>Inactive</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save Contact
      </button>
    </div>
  );
}

export default EditContact;