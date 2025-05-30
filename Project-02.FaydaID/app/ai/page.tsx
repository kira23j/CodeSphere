'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/navbar/navbar'

const INTENTS: Record<string, { examples: string[]; response: string }> = {
  onboarding_help: {
    examples: ['How do I create a profile?', "I'm new here. What should I do first?"],
    response:
      "Welcome! To create your decentralized identity, connect your wallet, fill in your profile info, upload an image, and submit to the blockchain. Need help step-by-step?",
  },
  wallet_connection: {
    examples: ['How do I connect my Metamask?', 'Wallet not connecting'],
    response:
      "Click 'Connect Wallet' on the homepage. Make sure Metamask is installed and you're logged in. Approve the connection in your Metamask popup.",
  },
  profile_editing: {
    examples: ['How do I change my info?', 'I want to update my social links.'],
    response:
      "Go to Dashboard > Edit Profile. You can update skills, links, and profile image. Don’t forget to resubmit to sync with the blockchain.",
  },
  image_upload_help: {
    examples: ['How can I upload my profile image?', 'My image isn’t showing.'],
    response:
      'Use the upload button in the profile form. We use Pinata + IPFS for secure decentralized image hosting. Make sure it’s in .jpg or .png format under 2MB.',
  },
  submit_identity: {
    examples: ['What happens when I click Submit?', 'Is my data stored forever?'],
    response:
      'When you click submit, your identity is signed with your wallet and saved to the blockchain. It’s permanent unless you update it later.',
  },
  view_profile: {
    examples: ['Where do I see my identity?', 'I want to check my profile.'],
    response:
      'Go to Dashboard > View Profile. You’ll see everything you submitted along with your visibility settings.',
  },
  visibility_settings: {
    examples: ['How do I hide some info?', 'I want to make parts of my profile private.'],
    response:
      'In the Edit Profile section, use the visibility toggle next to each field. These settings are saved on-chain too.',
  },
  search_users: {
    examples: ['Can I find others?', 'How do I search for people?'],
    response:
      'Yes! Use the Search bar to find other verified FaydaID users. You can view their public data only.',
  },
  ai_help: {
    examples: ['What can you do?', 'How can you help me?'],
    response:
      "I'm your AI Assistant. I can guide you through creating, editing, or managing your identity, and answer any questions about the app. Just ask!",
  },
  troubleshooting: {
    examples: ['I got a transaction error.', "My data isn't saving."],
    response:
      'Make sure your wallet is connected and you have testnet BTT tokens. Refresh the page and try again. Still issues? Try reconnecting your wallet.',
  },
  kyc_verification: {
    examples: ['Can I verify my identity?', 'Is there KYC?'],
    response:
      'KYC is optional for now. We’re working on third-party KYC and NFT-based credentials for verified users. Stay tuned!',
  },
  fake_profile_concern: {
    examples: ['What if someone lies on their profile?'],
    response:
      'FaydaID is user-sovereign, but we’re integrating AI fraud detection, KYC, and community ratings to reduce false identities.',
  },
  language_support: {
    examples: ['Can I use another language?'],
    response: 'Multilingual support is planned. For now, FaydaID is available in English.',
  },
  feedback_suggestion: {
    examples: ['I have a feature idea', 'I want to report a bug'],
    response:
      'Great! Please use the Feedback button or type your suggestion here and I’ll log it for the team.',
  },
}

const SYSTEM_PROMPT = `
You are FaydaAI, a friendly and helpful assistant for the FaydaID platform.
Always respond with:
- A calm, supportive tone
- Clear, helpful language
- Neatly formatted answers (short paragraphs or bullet points)
- No unnecessary words or fluff
Use the intent map as a guide, but feel free to write natural human replies. Keep answers helpful, clean, and easy to read.
`

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Welcome to FaydaID! How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const OPENROUTER_API_KEY =
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
    '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'

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    const updated = [...messages, userMessage]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...updated,
            {
              role: 'system',
              content:
                'Here are the INTENTS:\n' +
                Object.entries(INTENTS)
                  .map(([key, val]) => `- ${key}: ${val.examples.join('; ')}`)
                  .join('\n'),
            },
          ],
        }),
      })

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content ?? '⚠️ Could not fetch response.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Error reaching AI assistant. Try again later.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <header className="text-center p-4 text-xl font-semibold backdrop-blur-md shadow-md text-indigo-800">
          🧠 FaydaID Chat Assistant
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow ${
                msg.role === 'user'
                  ? 'ml-auto bg-blue-100 text-blue-900'
                  : 'bg-white text-indigo-800 border border-indigo-200'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-sm italic text-gray-500">Thinking...</div>
          )}
          <div ref={bottomRef}></div>
        </section>

        <footer className="p-4 border-t bg-white flex gap-2 backdrop-blur supports-[backdrop-filter]:bg-white/30">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        </footer>
      </main>
    </>
  )
}
