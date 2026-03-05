import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, CreditCard, MessageSquare, Trash2, Plus, Edit2, LogOut } from 'lucide-react';

interface TitleProps {
    userId: number;
    email: string;
    onOpenCard: (cardId?: number, cardData?: any) => void;
    onLogout: () => void;
}

export function Dashboard({ userId, email, onOpenCard, onLogout }: TitleProps) {
    const [userName, setUserName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [cards, setCards] = useState<any[]>([]);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, cardsRes] = await Promise.all([
                fetch(`http://localhost:3001/api/users/${userId}`),
                fetch(`http://localhost:3001/api/cards/${userId}`)
            ]);
            const userData = await userRes.json();
            const cardsData = await cardsRes.json();
            setUserName(userData?.name || 'User');
            setCards(Array.isArray(cardsData) ? cardsData : []);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateName = async () => {
        try {
            await fetch(`http://localhost:3001/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName })
            });
            setIsEditingName(false);
        } catch (err) {
            console.error('Failed to update name');
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to permanently delete your account and all cards?')) return;
        try {
            await fetch(`http://localhost:3001/api/users/${userId}`, { method: 'DELETE' });
            onLogout();
        } catch (err) {
            console.error('Failed to delete account');
        }
    };

    const handleDeleteCard = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!window.confirm('Delete this card?')) return;
        try {
            await fetch(`http://localhost:3001/api/cards/${id}`, { method: 'DELETE' });
            setCards(cards.filter(c => c.id !== id));
        } catch (err) {
            console.error('Failed to delete card');
        }
    };

    const handleFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback) return;
        try {
            await fetch(`http://localhost:3001/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, message: feedback })
            });
            alert('Feedback submitted successfully!');
            setFeedback('');
        } catch (err) {
            alert('Failed to submit feedback.');
        }
    };

    if (isLoading) return <div className="h-screen w-screen flex items-center justify-center bg-[#050508] text-emerald-500">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#050508] p-6 lg:p-12 text-white font-sans overflow-auto">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-3xl font-light">My <span className="font-bold text-emerald-500">Dashboard</span></h1>
                        <p className="text-sm text-white/40 mt-2">{email}</p>
                    </div>
                    <button onClick={onLogout} className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile & Feedback */}
                    <div className="space-y-8 lg:col-span-1">
                        {/* Profile Section */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <User className="text-emerald-500 w-5 h-5" />
                                <h2 className="text-lg font-semibold tracking-wide">User Profile</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Display Name</label>
                                    {isEditingName ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={userName}
                                                onChange={e => setUserName(e.target.value)}
                                                className="flex-1 bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                            />
                                            <button onClick={handleUpdateName} className="bg-emerald-500/20 text-emerald-400 px-3 py-2 rounded-xl text-sm hover:bg-emerald-500/40 transition">Save</button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center bg-black/20 rounded-xl px-4 py-3 border border-white/5">
                                            <span>{userName}</span>
                                            <button onClick={() => setIsEditingName(true)} className="text-white/40 hover:text-emerald-400"><Edit2 className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 mt-4 border-t border-white/5">
                                    <button onClick={handleDeleteAccount} className="flex items-center gap-2 text-red-400/80 hover:text-red-400 text-sm transition-colors py-2">
                                        <Trash2 className="w-4 h-4" />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <MessageSquare className="text-blue-400 w-5 h-5" />
                                <h2 className="text-lg font-semibold tracking-wide">Developer Feedback</h2>
                            </div>
                            <form onSubmit={handleFeedback} className="space-y-4">
                                <textarea
                                    value={feedback}
                                    onChange={e => setFeedback(e.target.value)}
                                    placeholder="Tell us what features you'd like to see next!"
                                    className="w-full h-24 bg-black/30 border border-white/10 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                                ></textarea>
                                <button type="submit" className="w-full bg-blue-500/20 text-blue-400 rounded-xl py-2 text-sm font-semibold hover:bg-blue-500/30 transition-colors">
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between bg-white/5 rounded-3xl p-6 border border-white/10">
                            <div className="flex items-center gap-3">
                                <CreditCard className="text-violet-400 w-6 h-6" />
                                <div>
                                    <h2 className="text-lg font-semibold">My 3D Cards</h2>
                                    <p className="text-xs text-white/40 mt-1">You have created {cards.length} out of 3 allowed cards.</p>
                                </div>
                            </div>

                            <button
                                onClick={() => onOpenCard()}
                                disabled={cards.length >= 3}
                                className="bg-violet-500 hover:bg-violet-400 disabled:bg-white/10 disabled:text-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Create New
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {cards.map((card, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    key={card.id}
                                    onClick={() => onOpenCard(card.id, card.card_data)}
                                    className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-3xl cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 z-10">
                                        <button onClick={(e) => handleDeleteCard(e, card.id)} className="text-white/20 hover:text-red-400 transition-colors pb-2 pl-2">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="h-32 rounded-xl bg-black/40 mb-4 border border-white/5 flex items-center justify-center overflow-hidden relative">
                                        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-emerald-500 to-blue-500" />
                                        <span className="relative z-10 font-bold tracking-widest uppercase text-white/50">Card {idx + 1}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg truncate pr-8">{card.card_data?.name || 'Untitled Card'}</h3>
                                    <p className="text-xs text-white/40 mt-1 truncate">{card.card_data?.title || 'No Title'}</p>
                                </motion.div>
                            ))}

                            {cards.length === 0 && (
                                <div className="sm:col-span-2 text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
                                    <CreditCard className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                    <p className="text-white/40">You haven't designed any cards yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
