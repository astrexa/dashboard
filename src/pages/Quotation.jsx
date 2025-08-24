
import { useState, } from "react";
import { Eye, Edit, Trash2, Download, Send, Search, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Quotation() {
  const navigate = useNavigate();
  const [quotations] = useState([
    {
      id: 1,
      company: "Al Futtaim Group",
      contactPerson: "Mohammed Al Mansoori",
      address: "Dubai Festival City, Dubai, UAE",
      phone: "+971 4 706 2222",
      email: "mansoori@alfuttaim.ae",
      fax: "+971 4 223 4455",
    },
    {
      id: 2,
      company: "Emirates Engineering Solutions",
      contactPerson: "Fatima Al Zarooni",
      address: "Dubai Investment Park, Dubai, UAE",
      phone: "+971 4 880 1122",
      email: "fatima@emiratesengg.com",
      fax: "+971 4 880 2211",
    },
    {
      id: 3,
      company: "Dubai Properties LLC",
      contactPerson: "Omar Al Suwaidi",
      address: "Business Bay, Dubai, UAE",
      phone: "+971 4 360 3333",
      email: "omar@dubaiproperties.ae",
      fax: "+971 4 360 4444",
    },
    {
      id: 4,
      company: "Gulf Oil Middle East",
      contactPerson: "Aisha Al Marri",
      address: "Jebel Ali Free Zone, Dubai, UAE",
      phone: "+971 4 883 5678",
      email: "aisha@gulfoilme.com",
      fax: "+971 4 883 6789",
    },
    {
      id: 5,
      company: "Etisalat Business Hub",
      contactPerson: "Khalid Al Habtoor",
      address: "Dubai Silicon Oasis, Dubai, UAE",
      phone: "+971 4 333 2244",
      email: "khalid@etisalatbiz.ae",
      fax: "+971 4 333 5566",
    },

  ]);


  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const filtered = quotations.filter(
    (q) =>
      q.company.toLowerCase().includes(search.toLowerCase()) ||
      q.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  // handle autocomplete
  const handleSearch = (value) => {
    setSearch(value);
    if (value.length > 0) {
      const matches = quotations.filter(
        (q) =>
          q.company.toLowerCase().includes(value.toLowerCase()) ||
          q.contactPerson.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5)); // max 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <div className="pt-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Quotations</h1>

            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mt-2" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <a href="/" className="hover:text-blue-600">Dashboard</a>
                  <span className="mx-2">/</span>
                </li>
                <li className="flex items-center text-gray-500 font-medium">
                  Quotations
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            {/* Search bar */}
            <div className="relative w-full sm:w-100">
              <div className="absolute inset-y-0 left-2 flex items-center text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search company or person..."
                className="w-full pl-8 pr-3 text-sm py-2 border border-gray-200 rounded-sm outline-0 focus:bg-white"
              />
              {/* Autocomplete dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-0 w-full bg-white border border-gray-200 rounded-sm  max-h-48 overflow-y-auto">
                  {suggestions.map((s) => (
                    <div
                      key={s.id}
                      className="px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-100  cursor-pointer"
                      onClick={() => {
                        setSearch(s.company);
                        setSuggestions([]);
                      }}
                    >
                      {s.company}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Create new button */}
            <button onClick={() => navigate("/dashboard/quotation/create-new-quotation")} className="px-5 py-1 text-sm cursor-pointer bg-[#0477bf] text-white rounded-sm hover:bg-[#0477BF] transition">
              Create New Quotation
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white">
      <div className="overflow-x-auto">
        <table className="text-sm w-full text-left text-gray-600 border border-gray-200">
          <thead className="w-full text-xs capitalize bg-gray-50 text-gray-700 sticky top-0 z-20">
            <tr>
              <th className="px-5 py-2 sticky left-0 bg-gray-50 z-30">Sl. No</th>
              <th className="px-5 py-2">Company Name</th>
              <th className="px-5 py-2">Contact Person</th>
              <th className="px-5 py-2">Address</th>
              <th className="px-5 py-2">Contact Number</th>
              <th className="px-5 py-2">Mail Address</th>
              {/* <th className="px-5 py-2">Fax</th> */}
              <th className="px-5 py-2">Status</th>
              <th className="px-5 py-2 text-center sticky right-0 bg-gray-50 z-30">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q, index) => (
              <tr
                key={q.id}
                className="text-xs border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Sticky First Column */}
                <td className="px-5 py-2 sticky left-0 bg-white z-20">
                  {index + 1}
                </td>
                <td className="px-5 py-2 font-medium text-gray-900">
                  {q.company}
                </td>
                <td className="px-5 py-2">{q.contactPerson}</td>
                <td className="px-5 py-2">{q.address}</td>
                <td className="px-5 py-2">{q.phone}</td>
                <td className="px-5 py-2">{q.email}</td>
                {/* <td className="px-5 py-2">{q.fax}</td> */}
                <td className="px-5 py-2">
                  <span className="bg-green-700 text-white px-2 py-1 rounded">
                    Ready
                  </span>
                </td>

                {/* Sticky Actions Column */}
                <td className="px-5 py-2 flex justify-center gap-2 items-center sticky right-0 bg-white z-20">
                  {/* Send For Production */}
                  <div className="relative group opacity-45 cursor-not-allowed">
                    <button className="p-2 bg-blue-600 rounded cursor-pointer">
                      <Check className="w-4 h-4 text-blue-50" />
                    </button>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Send For Production
                    </span>
                  </div>

                  {/* View */}
                  <div className="relative group">
                    <button className="p-2 bg-blue-600 rounded cursor-pointer">
                      <Eye className="w-4 h-4 text-blue-50" />
                    </button>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>

                  {/* Edit */}
                  <div className="relative group">
                    <button className="p-2 bg-blue-600 rounded cursor-pointer">
                      <Edit className="w-4 h-4 text-blue-50" />
                    </button>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Edit
                    </span>
                  </div>

                  {/* Download */}
                  <div className="relative group">
                    <button className="p-2 bg-green-600 rounded cursor-pointer">
                      <Download className="w-4 h-4 text-green-50" />
                    </button>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Download
                    </span>
                  </div>

                  {/* Send */}
                  <div className="relative group">
                    <button className="p-2 bg-teal-600 rounded cursor-pointer">
                      <Send className="w-4 h-4 text-teal-50" />
                    </button>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Send
                    </span>
                  </div>

                  <div className="bg-gray-300 h-6 rounded w-[1px]"></div>

                  {/* Delete */}
                  <div className="relative group">
                    <button className="p-2 bg-red-600 rounded cursor-pointer">
                      <Trash2 className="w-4 h-4 text-red-50" />
                    </button>
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500"
                >
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </>

  )
}

export default Quotation