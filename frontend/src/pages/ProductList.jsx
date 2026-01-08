import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import './TableStyles.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [brand, setBrand] = useState('');
    const [mass, setMass] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setLoading(true);
        fetchProducts(page, 50, { search: debouncedSearch, brand, mass })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [page, debouncedSearch, brand, mass]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Products</h1>
            </div>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search products (Expert Mode)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <input
                    type="text"
                    placeholder="Filter by Brand..."
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="number"
                    placeholder="Filter by Mass..."
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="filter-input"
                />
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading-state">Loading...</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Brand</th>
                                <th>Manufacturer</th>
                                <th>Group</th>
                                <th>GTIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.dan}>
                                    <td>{product.product_name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.manufacturer}</td>
                                    <td>{product.group_name}</td>
                                    <td>{product.gtin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="pagination">
                <button
                    className="btn-secondary"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="page-info">Page {page}</span>
                <button
                    className="btn-secondary"
                    onClick={() => setPage(p => p + 1)}
                    disabled={products.length < 50}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
