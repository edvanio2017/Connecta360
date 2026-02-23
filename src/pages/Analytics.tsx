import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Send, 
  Download, 
  Calendar,
  Filter,
  DollarSign,
  Target
} from 'lucide-react';

const data = [
  { name: 'Mon', sent: 4000, delivered: 3800, read: 2400 },
  { name: 'Tue', sent: 3000, delivered: 2900, read: 1398 },
  { name: 'Wed', sent: 2000, delivered: 1950, read: 9800 },
  { name: 'Thu', sent: 2780, delivered: 2700, read: 3908 },
  { name: 'Fri', sent: 1890, delivered: 1800, read: 4800 },
  { name: 'Sat', sent: 2390, delivered: 2300, read: 3800 },
  { name: 'Sun', sent: 3490, delivered: 3400, read: 4300 },
];

const channelData = [
  { name: 'WhatsApp', value: 45, color: '#22c55e' },
  { name: 'Email', value: 30, color: '#3b82f6' },
  { name: 'SMS', value: 15, color: '#a855f7' },
  { name: 'Push', value: 10, color: '#f97316' },
];

const funnelData = [
  { stage: 'Sent', count: 100000, percentage: '100%' },
  { stage: 'Delivered', count: 98400, percentage: '98.4%' },
  { stage: 'Opened', count: 42100, percentage: '42.1%' },
  { stage: 'Clicked', count: 14200, percentage: '14.2%' },
  { stage: 'Converted', count: 2800, percentage: '2.8%' },
];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time performance metrics across all communication channels.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Last 7 Days
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Sent', value: '1,240,500', change: '+12.5%', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Deliverability', value: '98.4%', change: '+0.2%', icon: Target, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Conversion Rate', value: '2.8%', change: '+0.5%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Cost', value: 'R$ 12,450', change: '+8.2%', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Volume Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Message Volume Trends</h3>
            <div className="flex space-x-2">
              <span className="flex items-center text-xs text-gray-500"><div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div> Sent</span>
              <span className="flex items-center text-xs text-gray-500"><div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div> Delivered</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sent" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} />
                <Area type="monotone" dataKey="delivered" stroke="#22c55e" fillOpacity={1} fill="url(#colorDelivered)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Breakdown Pie */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Channel Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {channelData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Engagement Funnel</h3>
          <div className="space-y-4">
            {funnelData.map((item, i) => (
              <div key={item.stage} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                  <span className="text-sm font-bold text-gray-900">{item.count.toLocaleString()} <span className="text-xs font-normal text-gray-400 ml-1">({item.percentage})</span></span>
                </div>
                <div className="h-10 w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-1000" 
                    style={{ 
                      width: item.percentage,
                      opacity: 1 - (i * 0.15)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Cost by Channel</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg. Cost per Message</p>
                <p className="text-sm font-bold text-gray-900">R$ 0,024</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Detailed Breakdown</button>
          </div>
        </div>
      </div>
    </div>
  );
}
