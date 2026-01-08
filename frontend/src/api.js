const API_URL = "http://127.0.0.1:8000";

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
};

export const fetchProducts = async (page = 1, limit = 50, filters = {}) => {
    // Filter out empty values before creating URLSearchParams
    const cleanFilters = Object.fromEntries(
        Object.entries({ ...filters, page, limit }).filter(([_, v]) => v != null && v !== '')
    );
    const params = new URLSearchParams(cleanFilters);

    const response = await fetch(`${API_URL}/products?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const fetchPrices = async (page = 1, limit = 50, filters = {}) => {
    // Filter out empty values before creating URLSearchParams
    const cleanFilters = Object.fromEntries(
        Object.entries({ ...filters, page, limit }).filter(([_, v]) => v != null && v !== '')
    );
    const params = new URLSearchParams(cleanFilters);

    const response = await fetch(`${API_URL}/prices?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch prices");
    }
    return response.json();
};

export const fetchDashboardStats = async () => {
    const response = await fetch(`${API_URL}/dashboard/stats`);
    if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
    }
    return response.json();
};
