import { useState, useEffect } from "react";
import "./LeadForm.css";

const LeadForm = ({ onSubmit, selectedLead, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New"
  });

  useEffect(() => {
    if (selectedLead) {
      setForm(selectedLead);
    }
  }, [selectedLead]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phone: "", status: "New" });
  };

  return (
  <form className="lead-form" onSubmit={handleSubmit}>
    <h3 className="form-title">
      {selectedLead ? "Edit Lead" : "Add Lead"}
    </h3>

    <input
      name="name"
      placeholder="Name"
      value={form.name}
      onChange={handleChange}
      required
    />

    <input
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    />

    <input
      name="phone"
      placeholder="Phone"
      value={form.phone}
      onChange={handleChange}
      required
    />

    <select
      name="status"
      value={form.status}
      onChange={handleChange}
    >
      <option>New</option>
      <option>Contacted</option>
      <option>Lost</option>
    </select>

    <div className="form-actions">
      <button type="submit" className="primary-btn">
        {selectedLead ? "Update Lead" : "Add Lead"}
      </button>

      {selectedLead && (
        <button
          type="button"
          className="secondary-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);
};

export default LeadForm;
