import React, { useEffect, useState } from "react";
import axios from "axios";

function AmountEntry() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const apiUrl = import.meta.env.VITE_API_URL;

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  useEffect(() => {
    fetchMembers();
  }, [year]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/amountentry/${year}`);
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (id, month, value) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.memberId === id
          ? {
            ...m,
            [month]: Number(value) || 0,
            total: [
              "jan", "feb", "mar", "apr", "may", "jun",
              "jul", "aug", "sep", "oct", "nov", "dec"
            ].reduce((sum, mo) => sum + (mo === month ? Number(value) || 0 : m[mo] || 0), 0),
          }
          : m
      )
    );
  };

  const saveMemberAmounts = async (member) => {
    try {
      await axios.post(`${apiUrl}/api/amountentry/member/${member.memberId}`, {
        ...member,
        year,
      });
      alert(`Amounts saved for ${member.name}`);
      fetchMembers();
    } catch (err) {
      console.error("Error saving member amounts", err);
      alert("Failed to save data");
    }
  };

  const saveAllMembers = async () => {
    try {
      await axios.post(`${apiUrl}/api/amountentry/all`, {
        entries: members.map((m) => ({ ...m, year })),
      });
      alert("All members saved successfully!");
    } catch (err) {
      console.error("Error saving all members", err);
      alert("Failed to save all data");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">Amount Entry</h2>
      <div className="flex justify-center mt-5">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse mt-5">
            <thead>
              <tr className="bg-blue-500 text-white h-14 text-md">
                <th className="border p-2">Name</th>
                {[
                  "jan", "feb", "mar", "apr", "may", "jun",
                  "jul", "aug", "sep", "oct", "nov", "dec"
                ].map((month) => (
                  <th key={month} className="border p-2 capitalize">{month}</th>
                ))}
                <th className="border p-2">Total</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.memberId} className="hover:bg-gray-100 text-md text-center h-14">
                  <td className="border p-2 font-medium">{member.name}</td>
                  {[
                    "jan", "feb", "mar", "apr", "may", "jun",
                    "jul", "aug", "sep", "oct", "nov", "dec"
                  ].map((month) => (
                    <td key={`${member.memberId}-${month}`} className="border p-2">
                      <input
                        type="number"
                        value={member[month] || 0}
                        onChange={(e) =>
                          handleAmountChange(member.memberId, month, e.target.value)
                        }
                        className="w-20 border rounded px-2 py-1 text-center"
                      />
                    </td>
                  ))}
                  <td className="border p-2 font-bold text-black">
                    {member.total || 0}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => saveMemberAmounts(member)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end items-center mt-5">
        <button
          onClick={saveAllMembers}
          className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 shadow"
        >
          Save All
        </button>
      </div>
    </div>
  );
}

export default AmountEntry;
