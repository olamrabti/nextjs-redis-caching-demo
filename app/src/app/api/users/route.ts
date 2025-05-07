
import { NextRequest, NextResponse } from "next/server"
import redis from "@/lib/redis"

const USERS_PER_PAGE = 6

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page") || "1")
        const skip = (page - 1) * USERS_PER_PAGE

        const cacheKey = `page:${page}`

        const cached = await redis.get(cacheKey)
        if (cached) {
            console.log(`Cached page ${page}`)
            return NextResponse.json(JSON.parse(cached))
        }

        console.log(`API call for page ${page}`)

        const res = await fetch(`https://dummyjson.com/users?limit=${USERS_PER_PAGE}&skip=${skip}`)
        if (!res.ok) {
            console.error("Failed to fetch from dummyjson", res.status)
            return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
        }

        const data = await res.json()

        const response = {
            users: data.users,
            total: data.total,
        }

        await redis.set(cacheKey, JSON.stringify(response), "EX", 60)

        return NextResponse.json(response)
    } catch (err) {
        console.error("Server error in GET /api/users:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
