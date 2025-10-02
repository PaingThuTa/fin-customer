import Customer from "@/models/Customer";
import Link from "next/link";

export default async function CustomerDetail({ params }) {
  // Await params to handle Next.js async params
  const resolvedParams = await params;

  const customer = await Customer.findById(resolvedParams.id);

  if (!customer) {
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold text-red-600">Customer Not Found</h1>
        <p>The customer you are looking for does not exist.</p>
      </div>
    );
  }

  // Convert Mongoose document to plain object for React
  const customerData = JSON.parse(JSON.stringify(customer));

  return (
    <div className="m-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Customer Details</h1>

        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 gap-4">
            <div className="border-b pb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Member Number</h2>
              <p className="text-2xl font-bold text-blue-600">#{customerData.memberNumber}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Name</h2>
              <p className="text-xl font-semibold text-gray-800">{customerData.name}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Date of Birth</h2>
              <p className="text-lg text-gray-700">
                {new Date(customerData.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-sm text-gray-500">
                Age: {Math.floor((new Date() - new Date(customerData.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years
              </p>
            </div>

            <div className="pb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Interests</h2>
              <p className="text-lg text-gray-700">{customerData.interests}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {customerData.interests.split(',').map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <Link
              href="/customer"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full inline-block"
            >
              Back to Customer List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
