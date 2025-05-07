"use client"

import { useEffect, useState } from "react"
import UserCard from "./user-card"
import Pagination from "./pagination"


const USERS_PER_PAGE = 6

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)


  const fetchUsers = async (page: number) => {
    setLoading(true)
    try {
      const skip = (page - 1) * USERS_PER_PAGE
      const res = await fetch(`https://dummyjson.com/users?limit=${USERS_PER_PAGE}&skip=${skip}`)
      const data = await res.json()
      console.log("API Response:", data)
      setUsers(data.users)
      setTotalPages(Math.ceil(data.total / USERS_PER_PAGE))
    } catch (err) {
      console.error("Failed to fetch users:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className="space-y-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.length > 0 ? (
              users.map((user: any) => (
                <UserCard
                  key={user.id}
                  user={{
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                  }}
                />
              ))
            ) : (
              <p>No users found.</p>
            )}

          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
