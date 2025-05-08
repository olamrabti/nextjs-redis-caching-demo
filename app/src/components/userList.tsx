"use client"

import { useCallback, useEffect, useState } from "react"
import UserCard from "./userCard"
import Pagination from "./Pagination"

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
}

const USERS_PER_PAGE = 6

export default function UserList() {

  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)


  const fetchUsers = useCallback(async (page: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/users?page=${page}`)

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()
      console.log("API Response:", data)
      setUsers(data.users)
      setTotalPages(Math.ceil(data.total / USERS_PER_PAGE))
    } catch (err) {
      console.error("Failed to fetch users:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // When `currentPage` changes, fetch the corresponding user data.
  // The fetchUsers function is memoized using useCallback to ensure stable identity
  // and prevent unnecessary effect re-runs.
  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage, fetchUsers])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className="space-y-6">
      {loading ? (
        <div style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
          Loading...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              users.map((user: any) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))
            }

          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div >
  )
}
