import React, { useEffect, useState } from 'react';
import { fetchPrices } from '../api';
import './TableStyles.css';

const PriceList = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [calendarWeek, setCalendarWeek] = useState('');
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
        fetchPrices(page, 50, { search: debouncedSearch, seller_id: sellerId, calendarweek: calendarWeek })
            .then(data => {
                setPrices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [page, debouncedSearch, sellerId, calendarWeek]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Prices</h1>
            </div>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search by DAN (Expert Mode)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <input
                    type="number"
                    placeholder="Filter by Seller ID..."
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="number"
                    placeholder="Filter by Week..."
                    value={calendarWeek}
                    onChange={(e) => setCalendarWeek(e.target.value)}
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
                                <th>DAN</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Seller ID</th>
                                <th>Week</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map((price) => (
                                <tr key={price.price_id}>
                                    <td>{price.dan}</td>
                                    <td>€{price.price}</td>
                                    <td>{price.amount}</td>
                                    <td>{price.seller_id}</td>
                                    <td>{price.calendarweek}</td>
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
                    disabled={prices.length < 50}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PriceList;
