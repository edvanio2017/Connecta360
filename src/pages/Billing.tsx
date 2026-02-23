import React from 'react';
import { CreditCard, Download, Zap, AlertTriangle, Check, ArrowRight, TrendingUp } from 'lucide-react';

export default function Billing() {
  const currentPlan = {
    name: 'Growth',
    price: 'R$ 999',
    billingCycle: 'Monthly',
    nextInvoice: 'Mar 01, 2026',
    usage: {
      email: { current: 350000, limit: 500000, color: 'bg-blue-500' },
      push: { current: 850000, limit: 1000000, color: 'bg-orange-500' },
      sms: { current: 920, limit: 1000, color: 'bg-purple-500' },
      whatsapp: { current: 480, limit: 500, color: 'bg-green-500' },
    }
  };

  const plans = [
    { name: 'Starter', price: 'R$ 299', features: ['Email + Push', '50k Emails', '3 Workspaces'] },
    { name: 'Growth', price: 'R$ 999', features: ['All 5 Channels', '500k Emails', '1k SMS included', '20 Automations'], current: true },
    { name: 'Business', price: 'R$ 2.999', features: ['Unlimited Push', '5M Emails', '10k SMS included', 'Dedicated Support'] },
  ];

  const invoices = [
    { id: 'INV-2026-002', date: 'Feb 01, 2026', amount: 'R$ 1.142,50', status: 'Paid' },
    { id: 'INV-2026-001', date: 'Jan 01, 2026', amount: 'R$ 999,00', status: 'Paid' },
    { id: 'INV-2025-012', date: 'Dec 01, 2025', amount: 'R$ 1.050,20', status: 'Paid' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your plan, payment methods, and view your usage metrics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Payment Methods
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Current Plan & Usage */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Plan Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                    Current Plan
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{currentPlan.name} Plan</h3>
                  <p className="text-sm text-gray-500">{currentPlan.billingCycle} billing • Next invoice on {currentPlan.nextInvoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{currentPlan.price}</p>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Usage this month</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(currentPlan.usage).map(([key, data]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium text-gray-700">{key}</span>
                      <span className="text-gray-500">{data.current.toLocaleString()} / {data.limit.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${data.color} transition-all duration-500`} 
                        style={{ width: `${(data.current / data.limit) * 100}%` }}
                      ></div>
                    </div>
                    {(data.current / data.limit) > 0.9 && (
                      <p className="text-[10px] text-red-500 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Critical: 90% quota reached
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pay-as-you-go Rates */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Pay-as-you-go Rates</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'SMS (BR)', price: 'R$ 0,09' },
                { label: 'WhatsApp', price: 'R$ 0,12' },
                { label: 'Telegram', price: 'R$ 0,01' },
                { label: 'Push', price: 'R$ 0,003' },
              ].map((rate) => (
                <div key={rate.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">{rate.label}</p>
                  <p className="text-sm font-bold text-gray-900">{rate.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Invoice History</h3>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
            </div>
            <div className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      <Download className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-xs text-gray-500">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <p className="text-sm font-semibold text-gray-900">{invoice.amount}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Plan Comparison */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Available Plans</h3>
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`p-6 rounded-2xl border-2 transition-all ${
                plan.current 
                ? 'border-blue-500 bg-blue-50/30' 
                : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">{plan.name}</h4>
                  <p className="text-2xl font-black text-gray-900 mt-1">{plan.price}<span className="text-xs font-normal text-gray-500">/mo</span></p>
                </div>
                {plan.current && <Check className="h-5 w-5 text-blue-600" />}
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-gray-600">
                    <Zap className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center group">
                  Switch to {plan.name}
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          ))}
          
          <div className="p-6 rounded-2xl bg-slate-900 text-white">
            <h4 className="font-bold mb-2">Enterprise</h4>
            <p className="text-sm text-slate-400 mb-4">Custom volumes, SLA 99.99%, and white-label options.</p>
            <button className="w-full py-2 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
