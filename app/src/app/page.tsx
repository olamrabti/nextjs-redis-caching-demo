import UserList from "@/components/user-list"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="ml-8 text-3xl font-bold mb-6">Clients : </h1>
      <UserList />
    </main>
  )
}
