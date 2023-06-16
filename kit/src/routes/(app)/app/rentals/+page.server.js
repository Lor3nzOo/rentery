import fetch from "node-fetch";

export const load = async ({ locals }) => {
    const data = await fetch('http://localhost:3000/rental/myRentals', {
        headers: {
            cookie: `username=${locals.user?.username};`
        }
    })

    const properties = await data.json()

    if (properties.statusCode === 200) {
        return {
            rentals: properties.rentals
        }
    }
}