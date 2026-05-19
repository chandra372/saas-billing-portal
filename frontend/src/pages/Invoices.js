import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

const Invoices = () => {

  const [invoices, setInvoices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const mockInvoices = [
      {
        _id: "1",
        invoiceNumber: "INV-001",
        amount: 29.99,
        issueDate: "2026-05-01",
        status: "paid",
        pdfUrl: "#",
      },

      {
        _id: "2",
        invoiceNumber: "INV-002",
        amount: 99.99,
        issueDate: "2026-05-10",
        status: "sent",
        pdfUrl: "#",
      },

      {
        _id: "3",
        invoiceNumber: "INV-003",
        amount: 299.99,
        issueDate: "2026-05-15",
        status: "paid",
        pdfUrl: "#",
      },
    ];

    const fetchInvoices = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(
            "/api/invoices",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setInvoices(response.data);

      } catch (err) {

        console.log(
          "Using mock invoice data"
        );

        setInvoices(mockInvoices);

        setError(
          "Using demo invoice data"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchInvoices();

  }, []);

  if (loading) {

    return (
      <div className="text-center mt-8">
        Loading invoices...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">

        Invoices

      </h1>

      {
        error && (
          <div className="text-red-600 mb-4">
            {error}
          </div>
        )
      }

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">

        <table className="min-w-full">

          <thead className="bg-gray-100 dark:bg-gray-700">

            <tr>

              <th className="px-6 py-3 text-left">
                Invoice Number
              </th>

              <th className="px-6 py-3 text-left">
                Amount
              </th>

              <th className="px-6 py-3 text-left">
                Date
              </th>

              <th className="px-6 py-3 text-left">
                Status
              </th>

              <th className="px-6 py-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              invoices.map((invoice) => (

                <tr
                  key={invoice._id}
                >

                  <td className="px-6 py-4">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="px-6 py-4">

                    $
                    {invoice.amount.toFixed(2)}

                  </td>

                  <td className="px-6 py-4">

                    {
                      new Date(
                        invoice.issueDate
                      ).toLocaleDateString()
                    }

                  </td>

                  <td className="px-6 py-4">

                    <span>

                      {invoice.status}

                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {
                      invoice.pdfUrl && (

                        <a
                          href={invoice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          Download PDF

                        </a>
                      )
                    }

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

        {
          invoices.length === 0 && (

            <div className="text-center py-8">

              No invoices found

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Invoices;