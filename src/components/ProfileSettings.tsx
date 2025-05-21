import React, { useState } from 'react';

interface ProfileSettingsProps {
  initialSettings: ProfileSettings;
  onSave: (settings: ProfileSettings) => void;
}

interface ProfileSettings {
  averageCycleLength: number;
  periodLength: number;
}

const ProfileSettings = ({ initialSettings, onSave }: ProfileSettingsProps) => {
  const [settings, setSettings] = useState<ProfileSettings>(initialSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="averageCycleLength" className="block text-sm font-medium text-gray-700">
            Average Cycle Length (days)
          </label>
          <input
            type="number"
            id="averageCycleLength"
            name="averageCycleLength"
            min="21"
            max="45"
            value={settings.averageCycleLength}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="periodLength" className="block text-sm font-medium text-gray-700">
            Period Length (days)
          </label>
          <input
            type="number"
            id="periodLength"
            name="periodLength"
            min="2"
            max="10"
            value={settings.periodLength}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;