import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Package, Tag, Layers } from 'lucide-react';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
    >
        <div className="card-header">
            <div className={`icon-wrapper ${colorClass}`}>
                <Icon size={24} className="text-white" />
            </div>
            <span className="stat-label">Total</span>
        </div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats()
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load dashboard statistics.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading-container">Loading...</div>;
    if (error) return <div className="loading-container" style={{ color: '#ef4444' }}>{error}</div>;

    return (
        <div className="dashboard-container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="welcome-section"
            >
                <h1 className="welcome-title">Welcome to AIResources</h1>
                <p className="welcome-text">
                    Your comprehensive data analysis platform. Use the navigation sidebar or the quick links below to explore product details and market prices.
                </p>
                <div className="welcome-actions">
                    <a href="/products" className="action-card">
                        <div className="action-icon">
                            <Package size={24} />
                        </div>
                        <div className="action-info">
                            <h3>Browse Products</h3>
                            <p>Search & filter product catalog</p>
                        </div>
                    </a>
                    <a href="/prices" className="action-card">
                        <div className="action-icon">
                            <Tag size={24} />
                        </div>
                        <div className="action-info">
                            <h3>Analyze Prices</h3>
                            <p>Track pricing trends & history</p>
                        </div>
                    </a>
                </div>
            </motion.div>

            <div className="stats-grid">
                <StatCard title="Products" value={stats.total_products} icon={Package} colorClass="blue" />
                <StatCard title="Prices" value={stats.total_prices} icon={Tag} colorClass="emerald" />
                <StatCard title="Categories" value={stats.products_by_group.length} icon={Layers} colorClass="purple" />
            </div>

            <div className="charts-grid">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                >
                    <h2 className="chart-title">Products by Group</h2>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.products_by_group}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="group_name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card"
                >
                    <h2 className="chart-title">Distribution</h2>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.products_by_group}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {stats.products_by_group.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
