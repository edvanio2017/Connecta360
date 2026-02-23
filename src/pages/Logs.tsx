import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCcw, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';

export default function Logs() {
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  const logs = [
    { 
      id: 1, 
      messageId: 'msg_8f2k9l1m0p3q', 
      recipient: '+55 11 99999-1111', 
      channel: 'whatsapp', 
      status: 'delivered', 
      timestamp: '2026-02-22 08:05:12',
      template: 'order_confirmation',
      provider: 'Meta Cloud API'
    },
    { 
      id: 2, 
      messageId: 'msg_a1b2c3d4e5f6', 
      recipient: 'bob@example.com', 
      channel: 'email', 
      status: 'opened', 
      timestamp: '2026-02-22 07:58:45',
      template: 'welcome_email',
      provider: 'AWS SES'
    },
    { 
      id: 3, 
      messageId: 'msg_z9y8x7w6v5u4', 
      recipient: '+55 11 99999-2222', 
      channel: 'sms', 
      status: 'failed', 
      timestamp: '2026-02-22 07:45:30',
      template: 'otp_code',
      provider: 'Twilio',
      error: 'Invalid recipient number'
    },
    { 
      id: 4, 
      messageId: 'msg_k1l2m3n4o5p6', 
      recipient: 'user_7721', 
      channel: 'push', 
      status: 'sent', 
      timestamp: '2026-02-22 07:30:10',
      template: 'app_update',
      provider: 'Firebase FCM'
    },
    { 
      id: 5, 
      messageId: 'msg_q7r8s9t0u1v2', 
      recipient: '+55 11 99999-3333', 
      channel: 'whatsapp', 
      status: 'read', 
      timestamp: '2026-02-22 07:15:22',
      template: 'shipping_update',
      provider: 'Meta Cloud API'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'opened': return 'bg-indigo-100 text-indigo-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'sent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <Smartphone className="h-4 w-4" />;
      case 'push': return <Send className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 max-w-md relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by Message ID or Recipient..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50">
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Logs Table */}
        <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 ${selectedLog ? 'w-full lg:w-2/3' : 'w-full'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => setSelectedLog(log.id)}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedLog === log.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status === 'failed' ? <AlertCircle className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.recipient}</div>
                    <div className="text-xs text-gray-500 font-mono">{log.messageId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 capitalize">
                      <span className="mr-2 text-gray-400">{getChannelIcon(log.channel)}</span>
                      {log.channel}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1.5 text-gray-400" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-blue-600">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 1 to 5 of 1,240 results</p>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg text-gray-400 hover:bg-white disabled:opacity-50" disabled>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-white">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Log Details Sidebar */}
        {selectedLog && (
          <div className="fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:w-1/3 bg-white lg:rounded-xl border border-gray-200 shadow-sm flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Message Details</h3>
              <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-gray-600 p-2">
                <RefreshCcw className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Message ID</label>
                  <p className="text-sm font-mono text-gray-900 mt-1">{logs.find(l => l.id === selectedLog)?.messageId}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                    <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{logs.find(l => l.id === selectedLog)?.status}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Channel</label>
                    <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{logs.find(l => l.id === selectedLog)?.channel}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Provider</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{logs.find(l => l.id === selectedLog)?.provider}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Template Used</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{logs.find(l => l.id === selectedLog)?.template}</p>
                </div>
                {logs.find(l => l.id === selectedLog)?.error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <label className="text-xs font-bold text-red-400 uppercase">Error Message</label>
                    <p className="text-sm text-red-700 mt-1">{logs.find(l => l.id === selectedLog)?.error}</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4">Event Timeline</h4>
                <div className="space-y-4">
                  {[
                    { event: 'Created', time: '08:05:10' },
                    { event: 'Routed to Meta', time: '08:05:11' },
                    { event: 'Delivered', time: '08:05:12' },
                  ].map((e, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                      <div className="flex-1 text-sm text-gray-700">{e.event}</div>
                      <div className="text-xs text-gray-400">{e.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                View Raw JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
