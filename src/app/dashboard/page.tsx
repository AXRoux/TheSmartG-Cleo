"use client";

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, FileText, FolderOpen, Camera, Plus, Settings, Calendar, Eye, TrendingUp, Activity, Loader2, ArrowLeft, LogOut } from 'lucide-react';

export default function DashboardHome() {
  // Fetch real data from Convex
  const insights = useQuery(api.insights.getInsights, { limit: 3, status: "published" });
  const stats = useQuery(api.insights.getInsightsStats);
  const { logout, user } = useAuth();
  
  const isLoading = insights === undefined || stats === undefined;
  return (
    <div className="min-h-screen">
      {/* Clean Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/5">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={logout}
            className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h1 className="text-5xl font-light text-white mb-3 tracking-tight">
              Welcome back, {isLoading ? "..." : "Vance"}
            </h1>
            <p className="text-lg text-gray-400 font-light">
              Ready to create something amazing today?
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <Link href="/dashboard/insights/new">
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" />
                Create New Insight
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-5 w-5 text-white/70" />
                <div className="text-2xl font-light text-white">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white/50" /> : stats?.total || 0}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Total Insights</p>
                <p className="text-xs text-white/60">
                  {isLoading ? "Loading..." : `+${stats?.thisMonth || 0} this month`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <FolderOpen className="h-5 w-5 text-white/70" />
                <div className="text-2xl font-light text-white">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white/50" /> : stats?.categories || 0}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Categories</p>
                <p className="text-xs text-white/60">Active categories</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-5 w-5 text-white/70" />
                <div className="text-2xl font-light text-white">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white/50" /> : stats?.thisMonth || 0}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">This Month</p>
                <p className="text-xs text-white/60">Content created</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Eye className="h-5 w-5 text-white/70" />
                <div className="text-2xl font-light text-white">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white/50" /> : stats?.published || 0}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Published</p>
                <p className="text-xs text-white/60">Live insights</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link href="/dashboard/insights/new" className="group">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Plus className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Create New Insight</h3>
                    <p className="text-sm text-white/60">Start writing your next insight</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/dashboard/insights" className="group">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Settings className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Manage Insights</h3>
                    <p className="text-sm text-white/60">Edit and organize your content</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/dashboard/media" className="group">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Camera className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Upload Images</h3>
                    <p className="text-sm text-white/60">Manage your media library</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Insights */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-white">Recent Insights</h2>
            <Link href="/dashboard/insights">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
                View All
              </Button>
            </Link>
          </div>
          
          <Card className="bg-white/5 border border-white/10">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-white/50" />
                </div>
              ) : insights && insights.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {insights.map((insight) => (
                    <div key={insight._id} className="p-6 hover:bg-white/5 transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white/10">
                          {insight.featuredImage ? (
                            <Image
                              src={insight.featuredImage}
                              alt={insight.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="h-5 w-5 text-white/50" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-white truncate">
                            {insight.title}
                          </h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-white/60">{insight.category}</span>
                            <span className="text-xs text-white/60">
                              {new Date(insight.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-xs px-2 py-1 rounded ${
                            insight.status === 'published' 
                              ? 'text-green-400 bg-green-400/10' 
                              : 'text-yellow-400 bg-yellow-400/10'
                          }`}>
                            {insight.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-white/30" />
                  <h3 className="text-lg font-medium text-white mb-2">No insights yet</h3>
                  <p className="text-white/60">Create your first insight to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}