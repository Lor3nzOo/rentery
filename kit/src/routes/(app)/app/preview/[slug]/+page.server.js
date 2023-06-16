import fetch from "node-fetch";

export async function load({ params }) {
    const { slug } = params

    if (!slug) {
        return await resolve(event)
    }

    const data = await fetch('http://localhost:3000/rental/preview', {
        headers: {
            cookie: `id=${slug};`
        }
    })

    const res = await data.json()

    if (res.statusCode === 200) {
        return {
            rental: res.rental
        }
    }

    return await resolve(event)
}