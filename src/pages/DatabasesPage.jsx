import React from 'react';

export default function DatabasesPage() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-start p-8">
      <h2 className="text-3xl font-bold mb-6">Databases</h2>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-2 font-semibold">prod-db-main</td>
              <td className="px-4 py-2">PostgreSQL</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span><span className="text-green-700">Healthy</span></td>
              <td className="px-4 py-2">db01.prod.local</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">staging-db</td>
              <td className="px-4 py-2">MySQL</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span><span className="text-yellow-700">Warning</span></td>
              <td className="px-4 py-2">db02.staging.local</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">dev-db</td>
              <td className="px-4 py-2">MongoDB</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span><span className="text-red-700">Down</span></td>
              <td className="px-4 py-2">db03.dev.local</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
