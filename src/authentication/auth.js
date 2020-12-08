export const isAuthenticated = (user) => {
    if ("token" in localStorage) {
        if (user !== undefined && user !== null) {
            if (localStorage.getItem("warehouseId") === user.warehouseId) return true;
        }
    }
    return false;
}