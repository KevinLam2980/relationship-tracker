import React, { useState } from 'react';
import ProfileSettings from '../components/ProfileSettings';
import { loadDefaultCycleData, saveDefaultCycleData } from '../utils/localStorageUtils';

const Profile = () => {
  const [defaultCycleData, setDefaultCycleData] = useState(loadDefaultCycleData());

  const handleSaveSettings = (settings: ProfileSettings) => {
    setDefaultCycleData(settings);
    saveDefaultCycleData(settings);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Profile Settings</h2>
          <ProfileSettings initialSettings={defaultCycleData} onSave={handleSaveSettings} />
        </div>
      </div>
    </div>
  );
};

export default Profile;