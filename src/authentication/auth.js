export const isAuthenticated = () => {
    if ("token" in localStorage && "user" in localStorage) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null) {
            if (localStorage.getItem("warehouseId") === user.warehouseId) return true;
        }
    }
    return false;
}

export const isAuthorized = (roles) => {
    if ("user" in localStorage) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null) {
            let lcased = roles.map(r => r.toLowerCase());
            if (lcased.includes(user.role.toLowerCase())) return true;
        }
    }
    return false;
}