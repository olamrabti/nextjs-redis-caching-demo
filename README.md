# Redis-Optimized Next.js User List

This is a performance-focused mini demo application built with **Next.js (App Router)**, **React**, and **Redis**. It fetches a paginated list of users from the [DummyJSON API](https://dummyjson.com/users), caches results in Redis, and showcases both client-side and server-side rendering.

## Tech Stack

- **Next.js**
- **Redis** (for caching API responses)
- **Tailwind CSS** (UI styling)

---

## Features

- **Paginated user list** with caching per page
- **Redis-backed caching** with 60s TTL to reduce API calls
- **Client-Side Rendering (CSR)** for user list
- **Server-Side Rendering (SSR)** for the Hero section (for SEO)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/olamrabti/nextjs-redis-caching-demo
```
### 2.  Run the project using Docker
```bash
make up
``` 
## Architecture Overview
**Client**
- SSR: Renders <Hero /> for SEO and faster load time
- CSR: Loads <UserList /> and paginated users dynamically

**/api/users**
- Checks Redis cache for the current page
- If no cache, fetches from DummyJSON API
- Stores result in Redis with a 60s TTL (1 minute)
- Returns paginated data to client

**Redis**
- Stores cache with keys like: `page:1`, `page:2`, etc.
- TTL ensures fresh data without hitting the API too often

## Performance Benchmarking

- Tools Used :
    - Chrome DevTools (Network & Performance tabs)

- Results :

    The hero section (SSR) which contains the necessary SEO infos appears first directly from the server.

    For the user list (CSR) : Redis caching reduces response latency by ~200ms for repeated requests.
    
    before caching
    ![Alt Text](/app/public/before_redis.png)

    after caching:
    ![Alt Text](/app/public/redis.png)



## Scaling Strategy
- For static parts of the app (like the Hero section), I can use SSR as well, to keep things fast and SEO-friendly without extra caching.
- preloading/cache warming for the most visited pages at build time or server start.
-  Load More Than One Page at a Time
Right now, I only fetch and cache one page at a time when a user clicks. To make it faster, I could preload the next page in the background while the user is viewing the current one.

- Or even better: when I fetch page 1, I could also store pages 2 and 3 in Redis right away, if the API allows it.

    This way, the user doesn’t wait when clicking "Next".





