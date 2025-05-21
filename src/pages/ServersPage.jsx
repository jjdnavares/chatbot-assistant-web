import React from 'react';

export default function ServersPage() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-start p-8">
      <h2 className="text-3xl font-bold mb-6">Servers</h2>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-2 font-semibold">vm-prod-1</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span><span className="text-green-700">Running</span></td>
              <td className="px-4 py-2">192.168.1.10</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">vm-staging-2</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span><span className="text-yellow-700">Warning</span></td>
              <td className="px-4 py-2">192.168.1.21</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">vm-dev-3</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span><span className="text-red-700">Down</span></td>
              <td className="px-4 py-2">192.168.1.33</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
