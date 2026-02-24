import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function StorySearchFilters({ stories, onFiltersChange }) {
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const applyFilters = () => {
    const filtered = stories.filter((story) => {
      const matchesKeyword = keyword === '' ||
      story.title.toLowerCase().includes(keyword.toLowerCase()) ||
      story.content.toLowerCase().includes(keyword.toLowerCase());

      const storyDate = new Date(story.created_date);
      const matchesStartDate = startDate === '' || storyDate >= new Date(startDate);
      const matchesEndDate = endDate === '' || storyDate <= new Date(endDate);

      return matchesKeyword && matchesStartDate && matchesEndDate;
    });

    onFiltersChange(filtered);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleReset = () => {
    setKeyword('');
    setStartDate('');
    setEndDate('');
    onFiltersChange(stories);
  };

  React.useEffect(() => {
    applyFilters();
  }, [startDate, endDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 space-y-4">
      
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search stories by title or content..." className="bg-slate-200 text-slate-950 pl-12 px-3 py-1 text-base rounded-full flex h-9 w-full border shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-white/20 placeholder:text-gray-400" />


          </div>
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-8 hover:from-cyan-400 hover:to-blue-400">
            Search
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date Filter */}
        <div>
          <label className="text-slate-950 mb-2 text-xs font-semibold block">From Date</label>
          <div className="relative">
            <Calendar className="text-slate-950 lucide lucide-calendar absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)} className="bg-white/10 text-slate-950 pl-10 px-4 py-2 text-sm rounded-lg w-full border border-white/20" />


          </div>
        </div>

        {/* End Date Filter */}
        <div>
          <label className="text-slate-950 mb-2 text-xs font-semibold block">To Date</label>
          <div className="relative">
            <Calendar className="text-slate-950 lucide lucide-calendar absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)} className="bg-white/10 text-slate-950 pl-10 px-4 py-2 text-sm rounded-lg w-full border border-white/20" />


          </div>
        </div>
      </div>

      {/* Reset Button */}
      {(keyword || startDate || endDate) &&
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end">
          <Button
          onClick={handleReset}
          variant="outline"
          className="rounded-full gap-2 text-white border-white/30 hover:bg-white/10">
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        </motion.div>
      }
    </motion.div>);

}