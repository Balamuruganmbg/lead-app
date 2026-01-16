import { useEffect, useState } from "react";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead
} from "../services/lead.service";
import LeadForm from "../components/LeadForm";
import "./Leads.css";
import { useAuth } from "../hooks/useAuth";


const Leads = () => {
  // ✅ HOOKS FIRST
  const { logoutUser } = useAuth();

  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data = await getLeads();
    setLeads(data);
  };

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  const handleCreateOrUpdate = async (lead) => {
    if (lead._id) {
      await updateLead(lead._id, lead);
    } else {
      await createLead(lead);
    }
    setSelectedLead(null);
    fetchLeads();
  };

  const handleDelete = async (id) => {
    await deleteLead(id);
    fetchLeads();
  };

  return (
    <div className="page">
      <div className="header">
        <h2 className="title">Lead Management</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card">
        <LeadForm
          onSubmit={handleCreateOrUpdate}
          selectedLead={selectedLead}
          onCancel={() => setSelectedLead(null)}
        />
      </div>

      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.status}</td>
                <td>
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => setSelectedLead(lead)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(lead._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Leads;
