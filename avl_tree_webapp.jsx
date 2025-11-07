import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentAVLManager() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ roll: "", name: "", age: "", gpa: "" });
  const [searchRoll, setSearchRoll] = useState("");
  const [found, setFound] = useState(null);

  // Insert student (sorted by roll number)
  const insertStudent = () => {
    if (!form.roll || !form.name) return alert("Enter complete details");
    if (students.find((s) => s.roll === form.roll))
      return alert("Roll number already exists!");
    const newList = [...students, form].sort((a, b) => a.roll - b.roll);
    setStudents(newList);
    setForm({ roll: "", name: "", age: "", gpa: "" });
  };

  // Delete student by roll
  const deleteStudent = (roll) => {
    setStudents(students.filter((s) => s.roll !== roll));
  };

  // Search student
  const searchStudent = () => {
    const s = students.find((st) => st.roll === searchRoll);
    setFound(s || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-center mb-6"
      >
        🎓 Student Record Management (AVL Tree Simulation)
      </motion.h1>

      {/* Form Section */}
      <Card className="max-w-3xl mx-auto mb-6 shadow-md">
        <CardContent className="p-6 grid grid-cols-2 gap-4">
          <input
            placeholder="Roll Number"
            type="number"
            value={form.roll}
            onChange={(e) => setForm({ ...form, roll: parseInt(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            placeholder="GPA"
            type="number"
            step="0.1"
            value={form.gpa}
            onChange={(e) => setForm({ ...form, gpa: parseFloat(e.target.value) })}
            className="border p-2 rounded"
          />
          <div className="col-span-2 text-center">
            <Button onClick={insertStudent} className="px-6 py-2">Add Student</Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto mb-6 text-center">
        <input
          placeholder="Enter Roll Number to Search"
          type="number"
          value={searchRoll}
          onChange={(e) => setSearchRoll(parseInt(e.target.value))}
          className="border p-2 rounded mr-2"
        />
        <Button onClick={searchStudent}>Search</Button>
        {found ? (
          <div className="mt-4 text-green-600 font-medium">
            Found: {found.roll} | {found.name} | Age: {found.age} | GPA: {found.gpa}
          </div>
        ) : searchRoll && <div className="mt-4 text-red-500">No student found.</div>}
      </div>

      {/* Display Section */}
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-center">All Students (Sorted by Roll)</h2>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Roll</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">GPA</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="5" className="text-center p-3">No records found</td></tr>
              ) : (
                students.map((s) => (
                  <motion.tr
                    key={s.roll}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="border p-2">{s.roll}</td>
                    <td className="border p-2">{s.name}</td>
                    <td className="border p-2">{s.age}</td>
                    <td className="border p-2">{s.gpa}</td>
                    <td className="border p-2 text-center">
                      <Button onClick={() => deleteStudent(s.roll)} variant="destructive" size="sm">Delete</Button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
