import { NextRequest } from 'next/server'

const responses: Record<string, string> = {
  'hello': 'Welcome to Maple Crest Developments! How can I help you today? You can ask me about our projects, floor plans, or schedule a viewing.',
  'hi': 'Welcome to Maple Crest Developments! How can I help you today? You can ask me about our projects, floor plans, or schedule a viewing.',
  'projects': 'We have 6 premium communities across Canada: Maple Heights (Mississauga), Northern Pines Estates (Calgary), Riverstone Residences (Ottawa), Cedar Grove Townhomes (London), Lakeview Luxury Condominiums (Burlington), and Aurora Hills Community (Edmonton).',
  'floor plans': 'Our floor plans range from 1-bedroom condos to 4-bedroom executive homes. Each plan features open-concept layouts, premium finishes, and modern designs.',
  'viewing': 'To schedule a viewing, please visit our Book A Viewing page or provide your preferred date and time, and I can help arrange it.',
  'price': 'Our property prices vary by location and type. Please visit our Buy page to see options or contact our sales team for personalized pricing.',
  'contact': 'You can reach us at (416) 555-8900 or email info@maplecrestdevelopments.ca. Our head office is at 120 King Street West, Suite 1800, Toronto, Ontario.',
  'default': 'I\'m Maple Assistant, your virtual guide to Maple Crest Developments. I can help with information about our projects, floor plans, pricing, and scheduling viewings. What would you like to know?',
}

export async function POST(request: NextRequest) {
  const { message } = await request.json()
  const lower = message.toLowerCase()

  let reply = responses.default
  for (const [key, value] of Object.entries(responses)) {
    if (lower.includes(key)) { reply = value; break }
  }

  return Response.json({ reply })
}
