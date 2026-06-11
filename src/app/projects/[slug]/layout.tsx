import { projects } from '@/lib/data'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
