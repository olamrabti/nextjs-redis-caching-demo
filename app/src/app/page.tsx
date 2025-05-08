import UserList from "@/components/userList"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-10">
        <Hero />
        <UserList />
      </div>
    </main>
  )
}
