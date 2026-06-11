const rentalIds = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8']

export function generateStaticParams() {
  return rentalIds.map((id) => ({ id }))
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
