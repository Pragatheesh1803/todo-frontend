import { jwtDecode } from "jwt-decode"

export function isTokenExpired() {
    const token = localStorage.getItem("token")
    if(!token) return true

    try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now()

        return decoded.exp < currentTime
    } catch (error) {
        return true
    }
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}