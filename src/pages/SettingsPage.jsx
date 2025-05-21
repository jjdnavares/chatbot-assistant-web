import React from 'react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-start p-8">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
        <form className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Dark Mode</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Email Notifications</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-all"></div>
            </label>
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
