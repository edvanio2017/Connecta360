import React, { useState } from 'react';
import { Key, Plus, Copy, Trash2, Eye, EyeOff, Shield, Clock, CheckCircle2 } from 'lucide-react';

export default function ApiKeys() {
  const [showKey, setShowKey] = useState<number | null>(null);

  const apiKeys = [
    { 
      id: 1, 
      name: 'Production Server', 
      key: 'on_live_8f2k9l1m0p3q4r5s6t7u8v9w0x1y2z', 
      scope: 'Admin', 
      created: 'Jan 12, 2026', 
      lastUsed: '2 mins ago',
      expiresIn: '45 days'
    },
    { 
      id: 2, 
      name: 'Marketing Automation', 
      key: 'on_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5', 
      scope: 'Send-only', 
      created: 'Feb 05, 2026', 
      lastUsed: '1 hour ago',
      expiresIn: '72 days'
    },
    { 
      id: 3, 
      name: 'Analytics Dashboard', 
      key: 'on_live_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5', 
      scope: 'Read-only', 
      created: 'Feb 15, 2026', 
      lastUsed: 'Yesterday',
      expiresIn: '82 days'
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, we'd show a toast here
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
          <p className="text-sm text-gray-500 mt-1">Manage access tokens for your applications and services.</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Create New Key
        </button>
      </div>

      {/* Security Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
        <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="ml-3">
          <h4 className="text-sm font-medium text-amber-800">Security Best Practice</h4>
          <p className="text-sm text-amber-700 mt-1">
            Never share your API keys or commit them to version control. Use environment variables to store them securely.
            Keys are rotated automatically every 90 days.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scope</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires In</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {apiKeys.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">Created on {item.created}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">
                      {showKey === item.id ? item.key : 'on_live_••••••••••••••••••••••••'}
                    </code>
                    <button 
                      onClick={() => setShowKey(showKey === item.id ? null : item.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showKey === item.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(item.key)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.scope === 'Admin' ? 'bg-purple-100 text-purple-800' :
                    item.scope === 'Send-only' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.scope}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-3 w-3 text-green-500 mr-1.5" />
                    {item.lastUsed}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1.5" />
                    {item.expiresIn}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Documentation Link */}
      <div className="bg-gray-900 rounded-xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2">Developer Documentation</h3>
          <p className="text-slate-400 text-sm mb-4 max-w-md">
            Learn how to integrate our API into your workflow. We support Node.js, Python, Go, and more.
          </p>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            View API Docs
          </button>
        </div>
        <Key className="absolute -right-8 -bottom-8 h-48 w-48 text-white/5 transform -rotate-12" />
      </div>
    </div>
  );
}
