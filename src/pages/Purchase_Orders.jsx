import React, { useState, useRef } from "react";

const PurchaseOrdersTable = () => {
  // ✅ Orders object inside the same file
  const orders = [
    {
      id: "PO-001",
      customerName: "Emirates Engineering LLC",
      customerLPO: "LPO-12345",
      status: "Order Created",
      deliveryAddress: "Warehouse 12, Dubai Industrial City, Dubai, UAE",
      deliveryDate: "29/08/2025",
      products: [
        {
          product: "Double Deflection Grille - RETURN",
          height: "600",
          width: "600",
          finish: "Black RAL 9005",
          quantity: 52,
          custom: false,
        },
        {
          product: "Double Deflection Register - SUPPLY",
          height: "750",
          width: "750",
          finish: "RAL 9010",
          quantity: 11,
          custom: false,
        },
        {
          product: "Double Deflection Register - SUPPLY",
          height: "835",
          width: "835",
          finish: "RAL 9016",
          quantity: 15,
          custom: true,
        },
      ],
    },
    {
      id: "PO-002",
      customerName: "Al Futtaim Group",
      customerLPO: "LPO-67890",
      status: "Order Not Created",
      deliveryAddress: "Jebel Ali Free Zone, Dubai, UAE",
      deliveryDate: "25/08/2025",
      products: [
        {
          product: "Linear Bar Grille",
          height: "1000",
          width: "200",
          finish: "RAL 9003",
          quantity: 3,
          custom: false,
        },
      ],
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

const handlePrint = (order) => {
  const jobCreatedDate = new Date().toLocaleDateString("en-GB");
  const totalQty = order.products.reduce((acc, p) => acc + p.quantity, 0);

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Production Order - ${order.id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            margin: 15mm;
            size: A4;
          }
          
          body {
            font-family: 'helvetica', 'arial', sans-serif;
            line-height: 1.5;
            padding: 20px;
            color: #2c2c2c;
            background: white;
          }

          .container {
            max-width: 100%;
            margin: 0 auto;
          }

          /* Header Section */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #333;
          }

          .logo {
            max-height: 60px;
            width: auto;
          }

          .company-info {
            text-align: right;
            font-size: 12px;
            line-height: 1.5;
          }

          .company-info p {
            margin: 3px 0;
          }

          /* Title */
          .title {
            text-align: center;
            font-size: 20px;
            font-weight: normal;
            margin: 25px 0;
          }

          /* Order Information */
          .order-info {
          }

          .order-info-item {
            font-size: 12px;
            line-height: 2;
          }

          .order-info-item label {
            font-weight: bold;
            min-width: 110px;
          }

          .order-info-item span {
            font-weight: normal;
          }

          /* Table Styles */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 12px;
          }

          th, td {
            border: 1px solid #444;
            padding: 8px;
            text-align: center;
          }

          th {
            background: #f4f4f4;
          }

          /* Remarks Section */
          .remarks {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 30px;
          }

          .remarks div {
            border: 1px solid #aaa;
            padding: 8px;
            height: 100px;
            font-size: 12px;
          }

          /* Footer */
          .footer {
            margin-top: 40px;
            font-size: 11px;
            text-align: center;
            border-top: 1px solid #aaa;
            padding-top: 10px;
          }

          /* Print-specific styles */
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            
            .container {
              box-shadow: none;
            }
            
            .page-break {
              page-break-before: always;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <img src="https://res.cloudinary.com/dtxqdxnrt/image/upload/v1755889091/MMC-Logo_ijbxqd.jpg" class="logo" alt="MMC Engineering Co."/>
            <div class="company-info">
              <p>P.O. BOX 7325, Umm Al Quwain, UAE</p>
              <p><strong>Phone:</strong> +971 6 7670082</p>
              <p><strong>Email:</strong> sales@mmcengco.com</p>
            </div>
          </div>

          <!-- Title -->
          <h1 class="title">Production Order</h1>

          <!-- Order Information -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div class="order-info">
            <div class="order-info-item">
              <label>LPO:</label>
              <span>${order.customerLPO}</span>
            </div>
            <div class="order-info-item">
              <label>Customer:</label>
              <span>${order.customerName}</span>
            </div>
            <div class="order-info-item">
              <label>Delivery Address:</label>
              <span>${order.deliveryAddress}</span>
            </div>
           
            
          </div>
          <div>
           <div class="order-info-item">
              <label>Delivery Date:</label>
              <span>${order.deliveryDate}</span>
            </div>
            <div class="order-info-item">
              <label>Job Created:</label>
              <span>${jobCreatedDate}</span>
            </div>
          </div>
          </div>

          <!-- Product Table -->
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product</th>
                <th>Height</th>
                <th>Width</th>
                <th>Finish</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              ${order.products
                .map(
                  (p, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>${p.product}</td>
                    <td>${p.height}</td>
                    <td>${p.width}</td>
                    <td>${p.finish}</td>
                    <td>${p.quantity}</td>
                  </tr>`
                )
                .join("")}
              <tr>
                <td colspan="5" style="text-align: right;"><b>Total Quantity</b></td>
                <td>${totalQty}</td>
              </tr>
            </tbody>
          </table>

          <!-- Remarks Section -->
          <div class="remarks">
            <div><b>Production Assistant Remarks</b><br/><br/></div>
            <div><b>Production Supervisor Remarks</b><br/><br/></div>
            <div><b>Product Remarks (Any)</b><br/><br/></div>
            <div><b>Operations / Production Manager</b><br/><br/></div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>MMC Engineering Co. | Tel: +971 6 7670082 | Email: sales@mmcengco.com</p>
          </div>
        </div>

        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerLPO.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Production Orders</h3>
        <div>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search by PO, Customer, or LPO..."
              className="border border-gray-300 rounded-sm me-4 px-3 py-2 text-sm w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="border border-gray-300 rounded-sm px-3 py-2 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Order Created">Order Created</option>
              <option value="Order Not Created">Order Not Created</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  capitalize  ">
                PO ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  capitalize  ">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  capitalize  ">
                LPO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  capitalize  ">
                Delivery Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  capitalize  ">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  capitalize  ">
                Estimated Delivery
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500  capitalize  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                  {order.customerName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                  {order.customerLPO}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                  {order.deliveryAddress}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-sm font-medium ${order.status === "Order Created"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs  rounded-full">
                    25th Dec, 2023
                  </span>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-2 text-xs bg-[#0477BF] cursor-pointer text-white rounded-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handlePrint(order)}
                    className="px-3 py-2 text-xs cursor-pointer bg-gray-700 text-white rounded-sm"
                  >
                    Create Production Order
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000097] backdrop-blur-[2px] bg-opacity-40 z-50">
          <div className="bg-white rounded-sm shadow-lg w-full max-w-5xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <p className="mb-1"><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
                <p className="mb-1"><strong>LPO:</strong> {selectedOrder.customerLPO}</p>
                {/* <p><strong>Status:</strong> {selectedOrder.status}</p> */}
                <p className="mb-1"><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Products</h4>
                <table className="w-full border border-gray-200 text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className=" px-3 py-2 text-start text-xs  border border-gray-200">Product</th>
                      <th className=" px-3 py-2 text-center text-xs  border border-gray-200">Height</th>
                      <th className=" px-3 py-2 text-center text-xs  border border-gray-200">Width</th>
                      <th className=" px-3 py-2 text-center text-xs  border border-gray-200">Finish</th>
                      <th className=" px-3 py-2 text-center text-xs  border border-gray-200">Qty</th>
                      {/* <th className="px-3 py-2 border">Custom</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((p, idx) => (
                      <tr key={idx} className="text-xs">
                        <td className="px-3 py-2 text-xs border border-gray-200">{p.product}</td>
                        <td className=" px-3 py-2 text-center text-xs  border border-gray-200">{p.height}</td>
                        <td className=" px-3 py-2 text-center text-xs  border border-gray-200">{p.width}</td>
                        <td className=" px-3 py-2 text-center text-xs  border border-gray-200">{p.finish}</td>
                        <td className=" px-3 py-2 text-center text-xs  border border-gray-200">{p.quantity}</td>
                        {/* <td className="px-3 py-2 border">{p.custom ? "Yes" : "No"}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-6 py-3 mt-5 flex justify-between">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-sm cursor-pointer bg-gray-600 text-white rounded-sm"
              >
                Close
              </button>
              <button
                onClick={() => handlePrint(selectedOrder)}
                className="px-4 me-2 py-2 text-sm cursor-pointer bg-green-600 text-white rounded-sm hover:bg-green-600"
              >
                Print Production Order
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Hidden Job Card for Printing */}
      {selectedOrder && (
        <div className="hidden print:block p-8" ref={printRef}>
          <h2 className="text-xl font-bold mb-4">Job Card</h2>
          <p><strong>PO ID:</strong> {selectedOrder.id}</p>
          <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
          <p><strong>LPO:</strong> {selectedOrder.customerLPO}</p>
          <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
          <table className="w-full border border-gray-300 mt-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Product</th>
                <th className="px-3 py-2 border">Height</th>
                <th className="px-3 py-2 border">Width</th>
                <th className="px-3 py-2 border">Finish</th>
                <th className="px-3 py-2 border">Qty</th>
                <th className="px-3 py-2 border">Custom</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.products.map((p, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-3 py-2 border">{p.product}</td>
                  <td className="px-3 py-2 border">{p.height}</td>
                  <td className="px-3 py-2 border">{p.width}</td>
                  <td className="px-3 py-2 border">{p.finish}</td>
                  <td className="px-3 py-2 border">{p.quantity}</td>
                  <td className="px-3 py-2 border">{p.custom ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrdersTable;
