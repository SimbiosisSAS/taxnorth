import ChatClient from './ChatClient'

export const metadata = {
  title: 'Free Tax Help for Newcomers to Canada — TaxNorth.ca',
  description: 'Ask any Canadian tax question in your language. Get instant answers about T4 slips, GST/HST credits, filing deadlines, and more. Free AI tax guide for newcomers.',
}

export default function ChatPage() {
  return <ChatClient />
}