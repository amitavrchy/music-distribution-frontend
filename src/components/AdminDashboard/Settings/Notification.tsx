"use client";

import { useState, useEffect } from "react";
import { User } from "@/redux/types/auth.type";

interface NotificationPreferencesProps {
  user: User;
}

export function NotificationPreferences({
  user,
}: NotificationPreferencesProps) {
  const settings = user.notificationSettings?.[0];

  const [earningAlerts, setEarningAlerts] = useState(
    settings?.isEarningAlertsOn ?? true,
  );
  const [pushNotifications, setPushNotifications] = useState(
    settings?.pushNotificationsOn ?? true,
  );
  const [smsAlerts, setSmsAlerts] = useState(
    settings?.smsNotificationsOn ?? false,
  );

  useEffect(() => {
    if (settings) {
      setEarningAlerts(settings.isEarningAlertsOn);
      setPushNotifications(settings.pushNotificationsOn);
      setSmsAlerts(settings.smsNotificationsOn);
    }
  }, [settings]);

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
        enabled
          ? "bg-green-500 focus:ring-green-500"
          : "bg-gray-600 focus:ring-gray-500"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="p-8 bg-[#0D1D22] rounded-xl shadow-md  ">
      <h2 className="text-xl font-semibold text-white mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Earning Alerts</h3>
            <p className="text-gray-400 text-sm">
              Receive notifications when your releases generate earnings.
            </p>
          </div>
          <ToggleSwitch
            enabled={earningAlerts}
            onChange={() => setEarningAlerts(!earningAlerts)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Push Notifications</h3>
            <p className="text-gray-400 text-sm">
              Receive instant updates on platform changes and new features.
            </p>
          </div>
          <ToggleSwitch
            enabled={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">SMS Alerts</h3>
            <p className="text-gray-400 text-sm">
              Get critical security alerts sent directly to your phone.
            </p>
          </div>
          <ToggleSwitch
            enabled={smsAlerts}
            onChange={() => setSmsAlerts(!smsAlerts)}
          />
        </div>
      </div>
    </div>
  );
}
