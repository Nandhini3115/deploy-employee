import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/employees";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    dept: "",
    salary: ""
  });
  const [editName, setEditName] = useState("");

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API_URL);
    setEmployees(res.data);
  };

  // Add employee
  const addEmployee = async () => {
    await axios.post(API_URL, {
      id: Number(newEmployee.id),
      name: newEmployee.name,
      dept: newEmployee.dept,
      salary: Number(newEmployee.salary)
    });
    fetchEmployees();
    setNewEmployee({ id: "", name: "", dept: "", salary: "" });
  };

  // Update employee name
  const updateEmployee = async (id) => {
    await axios.put(`${API_URL}/${id}`, { name: editName });
    fetchEmployees();
    setEditName("");
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEmployees();
  };

  return (
    <>
      {/* Add Employee Form */}
      <h4>Add Employee</h4>
      <input placeholder="ID" value={newEmployee.id}
        onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })} />
      <input placeholder="Name" value={newEmployee.name}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
      <input placeholder="Dept" value={newEmployee.dept}
        onChange={(e) => setNewEmployee({ ...newEmployee, dept: e.target.value })} />
      <input placeholder="Salary" value={newEmployee.salary}
        onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })} />
      <button onClick={addEmployee}>Add</button>

      {/* Employee Table */}
      <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Dept</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.dept}</td>
              <td>{emp.salary}</td>
              <td>
                <input
                  placeholder="New name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => updateEmployee(emp.id)}>Update</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployeeTable;
