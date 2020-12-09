export const isAuthenticated = () => {
    if ("token" in localStorage && "user" in localStorage) {
        console.log("Verifying authentication");
        let user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if (user !== undefined && user !== null) {
            if (localStorage.getItem("warehouseId") === user.warehouseId) return true;
        }
    }
    return false;
}