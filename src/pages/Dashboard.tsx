import React from 'react';
import { ArrowUpRight, ArrowDownRight, MessageSquare, Mail, Smartphone, Send, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total de Mensagens', value: '1.2M', change: '+12.5%', isPositive: true },
    { name: 'Entregabilidade', value: '98.4%', change: '+0.2%', isPositive: true },
    { name: 'Taxa de Abertura', value: '42.1%', change: '-1.4%', isPositive: false },
    { name: 'Taxa de Cliques', value: '14.2%', change: '+2.1%', isPositive: true },
  ];

  const channels = [
    { name: 'WhatsApp', volume: '450K', icon: MessageSquare, color: 'bg-green-100 text-green-600' },
    { name: 'E-mail', volume: '520K', icon: Mail, color: 'bg-blue-100 text-blue-600' },
    { name: 'SMS', volume: '180K', icon: Smartphone, color: 'bg-purple-100 text-purple-600' },
    { name: 'Push', volume: '50K', icon: Send, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`inline-flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume by Channel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Volume por Canal</h3>
          <div className="h-64 flex items-end space-x-2">
            {/* Mock Chart */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group">
                <div 
                  className="w-full bg-blue-100 rounded-t-md relative group-hover:bg-blue-200 transition-colors"
                  style={{ height: `${height}%` }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-md"
                    style={{ height: `${height * 0.7}%` }}
                  ></div>
                </div>
                <span className="text-xs text-center mt-2 text-gray-500">Dia {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribuição por Canal</h3>
          <div className="space-y-4">
            {channels.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${channel.color}`}>
                    <channel.icon className="h-5 w-5" />
                  </div>
                  <span className="ml-3 font-medium text-gray-700">{channel.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{channel.volume}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Alertas Recentes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { msg: 'Taxa de entrega do WhatsApp caiu abaixo de 95% no Brasil', time: 'há 10 minutos', type: 'warning' },
            { msg: 'Quota mensal de SMS atingiu 80%', time: 'há 2 horas', type: 'info' },
            { msg: 'Falha na conexão do gateway Twilio', time: 'há 1 dia', type: 'error' },
          ].map((alert, i) => (
            <div key={i} className="px-6 py-4 flex items-start">
              <AlertCircle className={`h-5 w-5 mt-0.5 ${
                alert.type === 'error' ? 'text-red-500' : 
                alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
              }`} />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{alert.msg}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
