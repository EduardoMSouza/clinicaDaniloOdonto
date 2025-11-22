export const logoutService = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
}