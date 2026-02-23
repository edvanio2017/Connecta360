import React, { useState } from 'react';
import { MessageSquare, Mail, Smartphone, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('channels');

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp Business API', provider: 'Meta Cloud API', status: 'connected', icon: MessageSquare },
    { id: 'sms', name: 'SMS Gateway', provider: 'Twilio', status: 'connected', icon: Smartphone },
    { id: 'email', name: 'Email Provider', provider: 'AWS SES', status: 'warning', icon: Mail },
    { id: 'push', name: 'Push Notifications', provider: 'Firebase FCM', status: 'disconnected', icon: Send },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8 min-w-max">
          {['Channels', 'Workspace', 'Webhooks', 'Compliance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.toLowerCase()
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Channel Integrations</h2>
              <p className="text-sm text-gray-500">Configure your messaging providers and credentials.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Add Provider
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((channel) => (
              <div key={channel.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <channel.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">{channel.name}</h3>
                      <p className="text-sm text-gray-500">{channel.provider}</p>
                    </div>
                  </div>
                  {channel.status === 'connected' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {channel.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                  {channel.status === 'disconnected' && <div className="h-2 w-2 rounded-full bg-gray-300 mt-1.5"></div>}
                </div>

                <div className="space-y-3 mb-6">
                  {channel.status === 'connected' ? (
                    <div className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Connected and routing traffic
                    </div>
                  ) : channel.status === 'warning' ? (
                    <div className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded border border-yellow-100 flex items-start">
                      <AlertCircle className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" />
                      Domain verification pending. Deliverability may be affected.
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Not configured. Click setup to integrate.
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {channel.status === 'disconnected' ? 'Setup' : 'Configure'}
                  </button>
                  {channel.status !== 'disconnected' && (
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
