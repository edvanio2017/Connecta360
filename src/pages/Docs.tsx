import React, { useState } from 'react';
import { Copy, Check, Code, Globe, Lock, Zap, MessageSquare, Mail, Smartphone, Send } from 'lucide-react';

export default function Docs() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/messages',
      description: 'Send a message to one or multiple channels with fallback support.',
      auth: 'API Key (Bearer Token)',
    }
  ];

  const codeExamples = {
    curl: `curl -X POST https://api.connecta360.com/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+5511999999999",
    "channels": ["whatsapp", "sms"],
    "content": {
      "text": "Your order #123 has been shipped!",
      "template": "order_shipped",
      "variables": {
        "order_id": "123"
      }
    },
    "fallback": {
      "enabled": true,
      "delay": 30
    }
  }'`,
    node: `const response = await fetch('https://api.connecta360.com/v1/messages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+5511999999999',
    channels: ['whatsapp', 'sms'],
    content: {
      text: 'Your order #123 has been shipped!'
    }
  })
});

const data = await response.json();
console.log(data.message_id);`
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">API Documentation</h2>
        <p className="text-lg text-gray-600 mt-2">Integrate Connecta360 into your application using our REST API.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 hidden lg:block">
          <nav className="sticky top-8 space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Getting Started</p>
            {['Authentication', 'Base URL', 'Rate Limiting'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                {item}
              </a>
            ))}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-8 mb-4 px-3">Messaging API</p>
            {['Send Message', 'Message Status', 'Webhooks'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Authentication */}
          <section id="authentication" className="scroll-mt-24">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Authentication</h3>
            </div>
            <p className="text-gray-600 mb-4">
              All API requests must be authenticated using a Bearer Token in the <code>Authorization</code> header. You can generate keys in the <span className="text-blue-600 font-medium">API Keys</span> section.
            </p>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-blue-300 border border-gray-800">
              Authorization: Bearer YOUR_API_KEY
            </div>
          </section>

          {/* Base URL */}
          <section id="base-url" className="scroll-mt-24">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Base URL</h3>
            </div>
            <p className="text-gray-600 mb-4">The API is accessible via HTTPS at the following base URL:</p>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-blue-300 border border-gray-800 flex justify-between items-center">
              <code>https://api.connecta360.com/v1</code>
              <button onClick={() => copyToClipboard('https://api.connecta360.com/v1', 'baseurl')} className="text-gray-400 hover:text-white transition-colors">
                {copied === 'baseurl' ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </section>

          {/* Send Message */}
          <section id="send-message" className="scroll-mt-24">
            <div className="flex items-center space-x-2 mb-4">
              <Send className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Send Message</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Our unified endpoint allows you to send messages to any supported channel. If multiple channels are provided, the system will attempt to deliver in the specified order.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center space-x-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">POST</span>
                <code className="text-sm font-mono text-gray-700">/messages</code>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Request Body Parameters</h4>
                <div className="space-y-4">
                  {[
                    { name: 'to', type: 'string', required: true, desc: 'Recipient identifier (phone number or email).' },
                    { name: 'channels', type: 'array', required: true, desc: 'List of channels to attempt (whatsapp, sms, email, push, telegram).' },
                    { name: 'content', type: 'object', required: true, desc: 'Message content including text and template data.' },
                    { name: 'fallback', type: 'object', required: false, desc: 'Automatic fallback configuration if primary channel fails.' },
                  ].map(param => (
                    <div key={param.name} className="flex flex-col sm:flex-row border-b border-gray-100 pb-3 last:border-0 gap-2 sm:gap-0">
                      <div className="w-full sm:w-1/4">
                        <code className="text-sm text-blue-600 font-bold">{param.name}</code>
                        {param.required && <span className="ml-2 text-[10px] text-red-500 font-bold uppercase">Required</span>}
                      </div>
                      <div className="w-full sm:w-3/4">
                        <p className="text-xs text-gray-500 mb-1 italic">{param.type}</p>
                        <p className="text-sm text-gray-600">{param.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
              <div className="flex border-b border-gray-800">
                <button className="px-6 py-3 text-sm font-medium text-white border-b-2 border-blue-500 bg-gray-800/50">cURL</button>
                <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">Node.js</button>
                <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">Python</button>
              </div>
              <div className="p-6 relative">
                <pre className="text-sm text-blue-300 font-mono overflow-x-auto">
                  {codeExamples.curl}
                </pre>
                <button 
                  onClick={() => copyToClipboard(codeExamples.curl, 'curl')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  {copied === 'curl' ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </section>

          {/* Response Example */}
          <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" /> Success Response
            </h4>
            <pre className="text-sm font-mono text-blue-800">
{`{
  "message_id": "msg_8f2k9l1m0p3q",
  "status": "queued",
  "channel": "whatsapp",
  "created_at": "2026-02-22T08:00:00Z"
}`}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
