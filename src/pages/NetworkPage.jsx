import React from 'react';

export default function NetworkPage() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-start p-8">
      <h2 className="text-3xl font-bold mb-6">Network</h2>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latency</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-2 font-semibold">prod-vpc</td>
              <td className="px-4 py-2">VPC</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span><span className="text-green-700">Connected</span></td>
              <td className="px-4 py-2">12 ms</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">staging-vpn</td>
              <td className="px-4 py-2">VPN</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span><span className="text-yellow-700">Degraded</span></td>
              <td className="px-4 py-2">87 ms</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">dev-tunnel</td>
              <td className="px-4 py-2">Tunnel</td>
              <td className="px-4 py-2"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span><span className="text-red-700">Disconnected</span></td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2"><button className="text-blue-600 hover:underline">Details</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
