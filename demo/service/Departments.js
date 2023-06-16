export const Departments = {
    getProductsSmall() {
        return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getDepartments() {
        return fetch('/demo/data/departments.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};