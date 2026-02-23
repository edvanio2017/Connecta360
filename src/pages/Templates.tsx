import React, { useState } from 'react';
import { Smartphone, Mail, MessageSquare, Send, Copy, Edit3, Trash2, Plus } from 'lucide-react';

export default function Templates() {
  const [activeChannel, setActiveChannel] = useState('whatsapp');

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'sms', name: 'SMS', icon: Smartphone },
    { id: 'push', name: 'Push', icon: Send },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-8rem)] gap-6">
      {/* Left Sidebar - Template List */}
      <div className="w-full lg:w-1/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden max-h-[400px] lg:max-h-none">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 lg:pb-0">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`p-2 rounded-lg flex-1 flex justify-center transition-colors ${
                  activeChannel === channel.id ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
                title={channel.name}
              >
                <channel.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`p-3 rounded-lg border cursor-pointer transition-colors ${i === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-gray-900">Order Confirmation {i}</h4>
                <span className="text-xs text-gray-500">HSM</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                Hi {'{{name}}'}, your order #{'{{order_id}}'} has been confirmed and is being processed.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area - Editor & Preview */}
      <div className="flex-1 flex flex-col xl:flex-row gap-6">
        {/* Editor */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-medium text-gray-900">Edit Template</h3>
            <div className="flex space-x-2 w-full sm:w-auto">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 flex-1 sm:flex-none flex justify-center"><Copy className="h-4 w-4" /></button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 flex-1 sm:flex-none flex justify-center"><Trash2 className="h-4 w-4" /></button>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex-1 sm:flex-none">Save</button>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
              <input type="text" defaultValue="Order Confirmation 1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message Body</label>
              <textarea 
                rows={8} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                defaultValue="Hi {{name}}, your order #{{order_id}} has been confirmed and is being processed. Track it here: {{tracking_url}}"
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">Use {'{{variable}}'} to insert dynamic content.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interactive Buttons</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="text" defaultValue="Track Order" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <input type="text" defaultValue="{{tracking_url}}" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono text-gray-500" />
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add Button</button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="w-full xl:w-80 bg-gray-100 rounded-xl border border-gray-200 shadow-inner flex flex-col items-center py-8 px-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Live Preview</h3>
          
          {/* Phone Mockup */}
          <div className="w-full max-w-[280px] bg-white rounded-[2rem] shadow-xl border-8 border-gray-800 h-[500px] relative overflow-hidden flex flex-col">
            <div className="bg-green-600 text-white p-3 flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Connecta360</p>
                <p className="text-[10px] opacity-80">Official Business Account</p>
              </div>
            </div>
            <div className="flex-1 bg-[#e5ddd5] p-3 overflow-y-auto">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[90%] mb-2">
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  Hi <span className="bg-yellow-100 px-1 rounded">John</span>, your order #<span className="bg-yellow-100 px-1 rounded">12345</span> has been confirmed and is being processed. Track it here: <span className="text-blue-500 underline">https://track.link</span>
                </p>
                <div className="mt-2 text-[10px] text-gray-400 text-right">10:42 AM</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm max-w-[90%] text-center py-2 text-sm text-blue-500 font-medium cursor-pointer border border-gray-100">
                Track Order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
