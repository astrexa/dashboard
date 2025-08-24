import React, { useState } from "react";
import data from "./api/products.json"; // your JSON file
import { FileText, Key, Link, Printer, ShoppingCart } from "lucide-react";
import Logo from "../assets/img/MMC-Logo.jpg";
export default function ProductCart() {
  // Customer Info States
  const [customerInfo, setCustomerInfo] = useState({
    customer: "",
    client: "",
    consultant: "",
    project: "",
    attn: "",
    tel: "",
    mob: "",
    email: "",
    Address: "",
  });

  // Payment Terms
  const [paymentTerms, setPaymentTerms] = useState({
    payment: "60 Days Net",
    delivery: "4 to 6 Weeks from receipt of valid LPO",
    validity: "30 Days",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [finish, setFinish] = useState("RAL 9016");
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customPrice, setCustomPrice] = useState("");
  const [cart, setCart] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState(""); // search state
  const products = Object.keys(data);
  console.log(cart);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetSelections();
  };

  const resetSelections = () => {
    setSelectedProduct(null);
    setHeight("");
    setWidth("");
    setQuantity(1);
    setFinish("RAL 9016");
    setIsCustomSize(false);
    setCustomPrice("");
    setEditIndex(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !quantity) return;

    let price = 0;
    if (isCustomSize) {
      price = parseFloat(customPrice) || 0;
    } else {
      price = data[selectedProduct]?.prices?.[height]?.[width] || 0;
    }

    const newItem = {
      product: selectedProduct,
      height,
      width,
      finish,
      quantity: parseInt(quantity),
      price,
      total: price * quantity,
      custom: isCustomSize,
    };

    if (editIndex !== null) {
      const updatedCart = [...cart];
      updatedCart[editIndex] = newItem;
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }

    resetSelections();
  };

  const handleEdit = (idx) => {
    const item = cart[idx];
    setSelectedProduct(item.product);
    setHeight(item.height);
    setWidth(item.width);
    setQuantity(item.quantity);
    setFinish(item.finish);
    setIsCustomSize(item.custom);
    setCustomPrice(item.custom ? item.price : "");
    setEditIndex(idx);
    setIsModalOpen(true);
  };

  const handleDelete = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  // Print Quotation
  const handlePrint = () => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    const vat = total * 0.05;
    const grandTotal = total + vat;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>Quotation - ${customerInfo.customerName || ""}</title>
        <style>
        body { 
  font-family: Arial, sans-serif; 
  padding: 10px; 
  color: #333; 
}

.header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 1px solid #222; 
  padding-bottom: 12px; 
  margin-bottom: 25px; 
}

.header-left { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
}

.logo { 
  max-height: 70px; 
}

.company-name h2 { 
  margin: 0; 
  font-size: 20px; 
  font-weight: bold; 
  color: #222; 
}

.tagline { 
  margin: 0; 
  font-size: 12px; 
  font-style: italic; 
  color: #666; 
}

.header-right { 
  text-align: right; 
  font-size: 13px; 
  line-height: 1.4; 
}

h1 { 
  margin: 10px 0; 
  font-size: 18px; 
}

table { 
  border-collapse: collapse; 
  width: 100%; 
  margin-top: 20px; 
  font-size: 12px; 
}

th, td { 
  border: 1px solid #555; 
  padding: 8px; 
  text-align: center; 
}

th { 
  background: #f4f4f4; 
}

.totals-row td { 
  font-weight: 500; 
}

.grand-total td { 
  font-weight: 500; 
  background: #f0f0f0; 
}

.section-title { 
  font-weight: 600; 
  margin-top: 20px; 
  margin-bottom: 10px; 
  font-size: 13px; 
  border-bottom: 1px solid #ccc; 
  padding-bottom: 4px; 
}

.info-box { 
  margin-top: 10px; 
  font-size: 12px; 
}

.signature { 
  margin-top: 50px; 
  display: flex; 
  justify-content: space-between; 
  font-size: 14px; 
}

.signature div { 
  width: 45%; 
  text-align: center; 
}

p { 
  margin-top: 0 !important; 
  margin-bottom: 6px; 
}.signature-block {
  margin-top: 60px;
  text-align: left;
  font-size: 13px;
  border-top: 1px solid #aaa;
  padding-top: 12px;
  width: fit-content;
}

.signature-block .sig-name {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
}

.signature-block .sig-title {
  font-size: 12px;
  color: #444;
  margin-bottom: 6px;
}

        </style>
      </head>
      <body>
        <!-- Header -->
 <div class="header">
  <div class="header-left">
    <img src="https://res.cloudinary.com/dtxqdxnrt/image/upload/v1755889091/MMC-Logo_ijbxqd.jpg" class="logo" alt="MMC Engineering"/>
   
  </div>
  <div class="header-right">
    <p><strong>P.O. BOX 7325</strong>, New Industrial Area, <br/> Umm Al Quwain, United Arab Emirates.</p>
    <p><strong>Phone:</strong> +971 6 7670082 <br/> 
       <strong>Email:</strong> sales@mmcengco.com / pradeep@mmcengco.com</p>
  </div>
</div>


        <!-- Title -->
        <h1 style="text-align:center">Supply of Air outlet</h1>
        <div class="info-box">
          <p><b>Customer Name:</b> ${customerInfo.customerName || ""}</p>
          <p><b>Consultant Name:</b> ${customerInfo.consultant}</p>
          <p><b>Project Name:</b> ${customerInfo.project}</p>
          <p><b>Attn:</b> ${customerInfo.attn}</p>
          <p><b>Tel:</b> ${customerInfo.tel}</p>
          <p><b>Mobile Number:</b> ${customerInfo.mob}</p>
          <p><b>Email Address:</b> ${customerInfo.email}</p>
          <p><b>Address:</b> ${customerInfo.Address}</p>
        </div>

        <!-- Quotation Table -->
        <table>
          <tr>
            <th>S.No</th>
            <th>Items</th>
            <th>Size (mm)</th>
            <th>Finish</th>
            <th>Qty</th>
            <th>Unit Price (AED)</th>
            <th>Total (AED)</th>
          </tr>
          ${cart
        .map(
          (item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.product}</td>
              <td>${item.height} x ${item.width}</td>
              <td>${item.finish}</td>
              <td>${item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>`
        )
        .join("")}
          <tr class="totals-row">
            <td colspan="6" style="text-align:right"><b>Total Net Value AED:</b></td>
            <td>${total.toFixed(2)}</td>
          </tr>
          <tr class="totals-row">
            <td colspan="6" style="text-align:right"><b>VAT (5%) AED:</b></td>
            <td>${vat.toFixed(2)}</td>
          </tr>
          <tr class="grand-total">
            <td colspan="6" style="text-align:right"><b>Grand Total AED:</b></td>
            <td>${grandTotal.toFixed(2)}</td>
          </tr>
        </table>

        <div class="info-box">
          <p><b>Payment:</b> ${paymentTerms.payment}</p>
          <p><b>Delivery:</b> ${paymentTerms.delivery}</p>
          <p><b>Validity:</b> ${paymentTerms.validity}</p>
        </div>

        <div style="margin-top:50px; margin-bottom:80px; font-size:13px; text-align:center" >
            <p>We hope our quotation meets your expectations and requirements. </p>
            <p>Should you require any further clarification please feel free to contact the undersigned; </p>
        </div>

        <!-- Signature Section -->
        <div class="signature-block" style="margin-top: 40px;">
  <p class="sig-name">MERWIN SEQUEIRA</p>
  <p class="sig-title">Sr. Sales Executive</p>
  <p><strong>Mob:</strong> +971-58 6905654</p>
  <p><strong>Email:</strong> merwin@mmcengco.com</p>
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


  return (
    <>
      <div className="mb-5 mt-6">
        <h1 className="text-2xl font-semibold text-gray-800">Create New Quotations</h1>

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mt-2" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <span className="hover:text-blue-600">Dashboard</span>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center text-gray-500 font-medium">
              Quotations
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center text-gray-500 font-medium">
              Create New Quotations
            </li>
          </ol>
        </nav>
      </div>
      <div className="pt-6 space-y-6 pb-20 bg-white border border-gray-200 rounded-b-sm  p-5">
        {/* Customer Info Form */}
        <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-sm">
          <h3 className="text-lg font-semibold mb-3 col-span-2">
            Customer Information
          </h3>
          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Customer Name</label>
            <input
              type="text"
              placeholder="Ex: Amana Contracting & Steel Buildings"
              value={customerInfo.customerName}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, customerName: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>
          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Customer Company</label>
            <input
              type="text"
              placeholder="Ex:TOURISM DEVELOPMENT AND INVESTMENT COMPANY (TDIC)"
              value={customerInfo.customerCompany}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, customerCompany: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Client Name</label>
            <input
              type="text"
              placeholder="ex: MIMOR"
              value={customerInfo.client}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, client: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>

          {/* <div className="form-group flex flex-col space-y-2">
          <label htmlFor="" class="text-sm text-gray-500 font-medium">Consultant Name</label>
          <input
            type="text"
            placeholder="Ex: Mafrak Mall"
            value={customerInfo.consultant}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, consultant: e.target.value })
            }
            className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
          />
        </div> */}

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Project Name</label>
            <input
              type="text"
              placeholder="Ex: Mafrak Mall"
              value={customerInfo.project}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, project: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Attn</label>
            <input
              type="text"
              placeholder="Ex: Chethan Chowta"
              value={customerInfo.attn}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, attn: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Telphone Number</label>
            <input
              type="text"
              placeholder="Ex: +971 4 123 4567"
              value={customerInfo.tel}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, tel: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Mobile Number</label>
            <input
              type="text"
              placeholder="Ex: +971 50 123 4567"
              value={customerInfo.mob}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, mob: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            /></div>

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Ex: chethan.chowta@amanabuildings.com"
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Address</label>
            <input
              type="email"
              placeholder="Ex: P.O. Box 12345, Dubai, UAE"
              value={customerInfo.Address}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, Address: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none placeholder:text-gray-300"
            />
          </div>
        </div>


        {/* Payment Terms */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-sm bg-white ">
          <h3 className="text-lg font-semibold mb-3 col-span-3">
            Payment Terms
          </h3>


          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Payment</label>
            <input
              type="text"
              placeholder="60 Days Net"
              value={paymentTerms.payment}
              onChange={(e) =>
                setPaymentTerms({ ...paymentTerms, payment: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Delivery</label>
            <input
              type="text"
              placeholder="4 to 6 Weeks from receipt of valid LPO"
              value={paymentTerms.delivery}
              onChange={(e) =>
                setPaymentTerms({ ...paymentTerms, delivery: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col space-y-2">
            <label htmlFor="" class="text-sm text-gray-500 font-medium">Validity</label>
            <input
              type="text"
              placeholder="30 Days"
              value={paymentTerms.validity}
              onChange={(e) =>
                setPaymentTerms({ ...paymentTerms, validity: e.target.value })
              }
              className="p-2 border border-gray-200 rounded-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-gray-200 h-[2px] rounded-full w-full" />
        {/* Add Item Button */}
        <div className="flex justify-between items-center">
          <h5 className="font-semibold text-gray-400">Add products to complete your quotation</h5>
          <button
            onClick={openModal}
            className="px-6 py-2 cursor-pointer bg-[#0477bf] text-sm text-white rounded-sm shadow"
          >
            Add Items
          </button>
        </div>

        {/* Cart Table */}
        {cart.length > 0 && (
          <>
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">S.No</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Items</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Size (mm)</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Finish</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Qty</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Unit Price (AED)</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Total (AED)</th>
                    <th className="border border-gray-300 px-3 text-sm py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-center">{idx + 1}</td>
                      <td className="border border-gray-300 px-3 text-sm py-2">{item.product}</td>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-center">
                        {item.height} x {item.width}
                      </td>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-center">{item.finish}</td>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-right">
                        {item.price.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-right">
                        {item.total.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-3 text-sm py-2 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="px-2 py-1 text-xs bg-yellow-500 text-black rounded-xs cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Totals Row */}
                  {(() => {
                    const total = cart.reduce((sum, item) => sum + item.total, 0);
                    const vat = total * 0.05;
                    const grandTotal = total + vat;

                    return (
                      <>
                        <tr className="font-bold ">
                          <td colSpan="6" className="border border-gray-300 px-3 text-sm py-2 text-right">
                            TOTAL NET VALUE AED :
                          </td>
                          <td className="border border-gray-300 px-3 text-sm py-2 text-right">
                            {total.toFixed(2)}
                          </td>
                          <td className="border border-gray-300"></td>
                        </tr>
                        <tr className="font-bold ">
                          <td colSpan="6" className="border border-gray-300 px-3 text-sm py-2 text-right">
                            VAT (5%) AED :
                          </td>
                          <td className="border border-gray-300 px-3 text-sm py-2 text-right">
                            {vat.toFixed(2)}
                          </td>
                          <td className="border border-gray-300"></td>
                        </tr>
                        <tr className="font-bold">
                          <td colSpan="6" className="border border-gray-300 px-3 text-sm py-2 text-right">
                            GRAND TOTAL AED :
                          </td>
                          <td className="border border-gray-300 px-3 text-sm py-2 text-right">
                            {grandTotal.toFixed(2)}
                          </td>
                          <td className="border border-gray-300"></td>
                        </tr>
                      </>
                    );
                  })()}
                </tbody>

              </table>
            </div>

            {/* Print Button */}
            <div className="flex gap-1 justify-end">
              <button
                onClick={handlePrint}
                className="mt-4 px-6 py-3 cursor-pointer  text-sm bg-green-700 text-white rounded-sm shadow"
              >
                Save
              </button>
              <button
                onClick={handlePrint}
                className="mt-4 px-6 py-3 flex gap-2 text-sm items-center cursor-pointer  bg-gray-700 text-white rounded-sm shadow"
              > <Printer strokeWidth={1.25} size={18} />
                Save and Print Quotation
              </button>
            </div>
          </>
        )}

        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 p-6 rounded-sm border border-dashed border-gray-300 bg-gray-50 shadow-sm">
            <FileText className="w-16 h-16 text-gray-400 mb-4" strokeWidth={1.2} />
            <h2 className="text-lg font-semibold text-gray-700">No quotation items</h2>
            <p className="text-gray-500 text-sm mt-1">
              You haven’t added any items to this quotation yet.
            </p>
            <button
              onClick={openModal}
              className="mt-4 px-5 py-2 bg-[#0477bf] cursor-pointer text-white rounded-sm hover:bg-[#0477bf] transition"
            >
              Add Items
            </button>
          </div>
        )}

        {/* Existing Modal (Product Selection) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#00000097] backdrop-blur-[2px] flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-sm shadow-sm w-[1000px] max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editIndex !== null ? "Edit Product" : "Select Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Content (same as your modal code) */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-[#00000097] flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-sm shadow-sm w-[1000px] max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">
                        {editIndex !== null ? "Edit Product" : "Select Product"}
                      </h2>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 grid grid-cols-2 overflow-hidden gap-6">
                      {/* Left side - Product List with Search */}
                      <div className="space-y-3 border-r border-gray-300 overflow-y-auto pr-4">
                        <input
                          type="text"
                          placeholder="Search product..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-sm mb-3 focus:outline-none"
                        />
                        {products
                          .filter((p) =>
                            p.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((p, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedProduct(p)}
                              className={`p-4 border rounded-sm cursor-pointer hover:bg-gray-100 ${selectedProduct === p
                                ? "border-gray-300 bg-gray-200"
                                : "border-gray-200"
                                }`}
                            >
                              <h3 className="font-medium text-gray-700">{p}</h3>
                              <p className="text-xs mt-1 text-gray-500 line-clamp-2">
                                {data[p].description}
                              </p>
                            </div>
                          ))}
                      </div>

                      {/* Right side - Product Details */}
                      <div className="p-4 overflow-y-auto">
                        {selectedProduct ? (
                          <>
                            <h3 className="text-lg font-semibold mb-2">
                              {selectedProduct}
                            </h3>

                            {/* Finish */}
                            <label className="block mb-2 text-sm font-medium">
                              Finish
                            </label>
                            <select
                              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                              value={finish}
                              onChange={(e) => setFinish(e.target.value)}
                            >
                              <option value="RAL 9016">RAL 9016 (White Semi Gloss)</option>
                              <option value="RAL 9010">RAL 9010 (Light Off White)</option>
                              <option value="Black RAL 9005">Black RAL 9005 (Matt)</option>
                            </select>

                            {/* Custom Size */}
                            <div className="flex items-center mb-3">
                              <input
                                type="checkbox"
                                id="customSize"
                                checked={isCustomSize}
                                onChange={() => setIsCustomSize(!isCustomSize)}
                                className="mr-2 border-gray-300"
                              />
                              <label htmlFor="customSize" className="text-sm">
                                Custom Size
                              </label>
                            </div>

                            {!isCustomSize ? (
                              <>
                                {/* Height */}
                                <label className="block mb-2 text-sm font-medium">
                                  Height
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                                  value={height}
                                  onChange={(e) => setHeight(e.target.value)}
                                >
                                  <option value="">Select Height</option>
                                  {Object.keys(data[selectedProduct].prices).map((h) => (
                                    <option key={h} value={h}>
                                      {h}
                                    </option>
                                  ))}
                                </select>

                                {/* Width */}
                                {height && (
                                  <>
                                    <label className="block mb-2 text-sm font-medium">
                                      Width
                                    </label>
                                    <select
                                      className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                                      value={width}
                                      onChange={(e) => setWidth(e.target.value)}
                                    >
                                      <option value="">Select Width</option>
                                      {Object.keys(data[selectedProduct].prices[height]).map(
                                        (w) => (
                                          <option key={w} value={w}>
                                            {w}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {/* Custom Inputs */}
                                <label className="block mb-2 text-sm font-medium">
                                  Custom Height (mm)
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                                  value={height}
                                  onChange={(e) => setHeight(e.target.value)}
                                />

                                <label className="block mb-2 text-sm font-medium">
                                  Custom Width (mm)
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                                  value={width}
                                  onChange={(e) => setWidth(e.target.value)}
                                />

                                <label className="block mb-2 text-sm font-medium">
                                  Price
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                                  value={customPrice}
                                  onChange={(e) => setCustomPrice(e.target.value)}
                                />
                              </>
                            )}

                            {/* Quantity */}
                            <label className="block mb-2 text-sm font-medium">
                              Quantity
                            </label>
                            <input
                              type="text"
                              min="1"
                              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            />

                            {/* Add Button */}
                            <div className="flex justify-end">
                              <button
                                onClick={handleAddToCart}
                                className="px-4 py-2 text-sm cursor-pointer bg-green-700 text-white rounded-sm"
                              >
                                {editIndex !== null ? "Update" : "Add Item"}
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="text-gray-500 text-center mt-20">
                            Select a product from the left to configure it.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 border-t border-gray-200 pt-3 flex justify-end">
                      <button
                        onClick={closeModal}
                        className="px-5 py-2 bg-gray-600 cursor-pointer text-white rounded-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
