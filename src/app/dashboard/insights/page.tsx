"use client";

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Search, Plus, Filter, Edit2, Trash2, Eye, Copy, ChevronRight, Home, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'sonner';

const statusOptions = ['All Status', 'Published', 'Draft'];

export default function InsightsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [viewMode, setViewMode] = useState('table');

  // Fetch data from Convex
  const allInsights = useQuery(api.insights.getInsights, {});
  const categories = useQuery(api.categories.getCategories, { activeOnly: true });
  const deleteInsight = useMutation(api.insights.deleteInsight);

  const isLoading = allInsights === undefined || categories === undefined;

  // Create categories list for filter
  const categoryOptions = ['All Categories', ...(categories?.map(cat => cat.name) || [])];

  const filteredInsights = useMemo(() => {
    if (!allInsights) return [];
    
    return allInsights.filter(insight => {
      const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (insight.authorName || insight.author).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All Categories' || insight.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || 
                           insight.status === statusFilter.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allInsights, searchTerm, categoryFilter, statusFilter]);

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        className={status === 'published' 
          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleDelete = async (insightId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteInsight({ id: insightId as any });
        toast.success('Insight deleted successfully');
      } catch (error) {
        toast.error('Failed to delete insight');
      }
    }
  };

  const ActionButtons = ({ insight }: { insight: any }) => (
    <div className="flex gap-2">
      <Link href={`/insights/${insight._id}`}>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10" title="View">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={`/dashboard/insights/${insight._id}/edit`}>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10" title="Edit">
          <Edit2 className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10" title="Duplicate">
        <Copy className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10" 
        title="Delete"
        onClick={() => handleDelete(insight._id, insight.title)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/5">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-5xl font-light text-white mb-3 tracking-tight">
                Insights Management
              </h1>
              <p className="text-lg text-white/60 mb-4">
                Manage and organize all Live & Learn Hub insights
              </p>
              <div className="flex items-center text-sm text-white/50">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-white/50 mr-2"></div>
                  <span>{isLoading ? "Loading..." : `${allInsights?.length || 0} total insights`}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <Link href="/dashboard/insights/new">
                <Button className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Insight
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white/5 border border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  placeholder="Search insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/20"
                />
              </div>

              {/* Category Filter */}
              <div className="min-w-[180px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/20">
                    <SelectValue className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-white/10 shadow-xl rounded-xl">
                    {categoryOptions.map((category) => (
                      <SelectItem 
                        key={category} 
                        value={category}
                        className="px-4 py-3 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="min-w-[140px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/20">
                    <SelectValue className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-white/10 shadow-xl rounded-xl">
                    {statusOptions.map((status) => (
                      <SelectItem 
                        key={status} 
                        value={status}
                        className="px-4 py-3 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex border border-white/10 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className={`rounded-none px-6 py-3 ${
                    viewMode === 'table' 
                      ? 'bg-white text-black' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none px-6 py-3 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-black' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Grid
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70 text-lg">
            {isLoading ? (
              <span className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-white/50" />
                Loading insights...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white/50"></div>
                Showing <span className="text-white font-semibold">{filteredInsights.length}</span> of <span className="text-white font-semibold">{allInsights?.length || 0}</span> insights
              </span>
            )}
          </p>
        </div>

        {/* Content */}
        {viewMode === 'table' ? (
          <Card className="bg-white/5 border border-white/10">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10 hover:bg-white/5">
                    <TableHead className="w-12 text-white/70"></TableHead>
                    <TableHead className="text-white/70 font-semibold">Title</TableHead>
                    <TableHead className="text-white/70 font-semibold">Category</TableHead>
                    <TableHead className="text-white/70 font-semibold">Author</TableHead>
                    <TableHead className="text-white/70 font-semibold">Date</TableHead>
                    <TableHead className="text-white/70 font-semibold">Status</TableHead>
                    <TableHead className="w-32 text-white/70 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-white/50" />
                      </TableCell>
                    </TableRow>
                  ) : filteredInsights.length > 0 ? (
                    filteredInsights.map((insight) => (
                      <TableRow key={insight._id} className="hover:bg-white/5 border-b border-white/5">
                        <TableCell>
                          {insight.featuredImage ? (
                            <img
                              src={insight.featuredImage}
                              alt={insight.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                              <Eye className="h-4 w-4 text-white/50" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">{insight.title}</div>
                          <div className="text-sm text-white/60 mt-1 max-w-xs truncate">
                            {insight.excerpt}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-white/10 text-white/70 border-white/20">{insight.category}</Badge>
                        </TableCell>
                        <TableCell className="text-white/70">{insight.authorName || insight.author}</TableCell>
                        <TableCell className="text-white/70">{formatDate(insight.createdAt)}</TableCell>
                        <TableCell>{getStatusBadge(insight.status)}</TableCell>
                        <TableCell>
                          <ActionButtons insight={insight} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-white/60">
                        No insights found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-white/50" />
              </div>
            ) : filteredInsights.length > 0 ? (
              filteredInsights.map((insight) => (
                <Card key={insight._id} className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200">
                  <CardContent className="p-0">
                    {insight.featuredImage ? (
                      <img
                        src={insight.featuredImage}
                        alt={insight.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-white/10 rounded-t-lg flex items-center justify-center">
                        <Eye className="h-12 w-12 text-white/30" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-white/10 text-white/70 border-white/20 text-xs">
                          {insight.category}
                        </Badge>
                        {getStatusBadge(insight.status)}
                      </div>
                      <h3 className="font-semibold text-white mb-2 font-display">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-white/60 mb-3 line-clamp-2">
                        {insight.excerpt}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-white/50">{insight.authorName || insight.author}</span>
                        <span className="text-sm text-white/50">{formatDate(insight.createdAt)}</span>
                      </div>
                      <ActionButtons insight={insight} />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Filter className="h-12 w-12 mx-auto mb-4 text-white/30" />
                <h3 className="text-lg font-semibold text-white mb-2">No insights found</h3>
                <p className="text-white/60">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}