"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomerPage() {

  const columns = [
    { field: 'memberNumber', headerName: 'Member #', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      width: 150,
      renderCell: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    { field: 'interests', headerName: 'Interests', width: 250 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 320,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => startEditMode(params.row)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCustomer(params.row)}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <Link
              href={`/customer/${params.row._id}`}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded inline-block"
            >
              View
            </Link>
          </div>
        )
      }
    },
  ];

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [customerList, setCustomerList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCustomers() {
    const data = await fetch(`${API_BASE}/customer`);
    const customers = await data.json();
    const customersWithId = customers.map((customer) => {
      return {
        ...customer,
        id: customer._id
      }
    });
    setCustomerList(customersWithId);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  function handleCustomerFormSubmit(data) {
    if (editMode) {
      // Updating a customer
      fetch(`${API_BASE}/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        stopEditMode();
        fetchCustomers();
      });
      return;
    }

    // Creating a new customer
    fetch(`${API_BASE}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      reset({
        name: '',
        dateOfBirth: '',
        memberNumber: '',
        interests: ''
      });
      fetchCustomers();
    });
  }

  function startEditMode(customer) {
    // Format date for input field (YYYY-MM-DD)
    const formattedCustomer = {
      ...customer,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split('T')[0]
    };
    reset(formattedCustomer);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: '',
      dateOfBirth: '',
      memberNumber: '',
      interests: ''
    });
    setEditMode(false);
  }

  async function deleteCustomer(customer) {
    if (!confirm(`Are you sure you want to delete ${customer.name}?`)) return;

    const id = customer._id;
    await fetch(`${API_BASE}/customer/${id}`, {
      method: "DELETE"
    });
    fetchCustomers();
  }

  return (
    <main>
      <div className="m-4">
        <h1 className="text-3xl font-bold mb-4">Customer Management</h1>

        <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
          <div className="grid grid-cols-2 gap-4 w-fit border border-gray-800 p-4 rounded-lg bg-gray-50">
            <div>Name:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>Date of Birth:</div>
            <div>
              <input
                name="dateOfBirth"
                type="date"
                {...register("dateOfBirth", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>Member Number:</div>
            <div>
              <input
                name="memberNumber"
                type="number"
                {...register("memberNumber", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>Interests:</div>
            <div>
              <input
                name="interests"
                type="text"
                placeholder="e.g., movies, football, gym, gaming"
                {...register("interests", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="col-span-2 text-right">
              {editMode ? (
                <>
                  <input
                    type="submit"
                    className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    value="Update"
                  />
                  {' '}
                  <button
                    type="button"
                    onClick={() => stopEditMode()}
                    className="italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <input
                  type="submit"
                  value="Add Customer"
                  className="w-40 italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                />
              )}
            </div>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Customer List ({customerList.length})</h2>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={customerList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </main>
  );
}
