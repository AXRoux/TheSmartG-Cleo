"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  File, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Trash2,
  Copy,
  Download,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Mock media data - in a real app, this would come from Convex
const mockMedia = [
  {
    id: '1',
    name: 'hero-video.mp4',
    type: 'video',
    size: '15.2 MB',
    url: 'https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQ8z92S0eidGSYEVmvlntLbaIKrwqkf57O3UBZ',
    uploadedAt: new Date('2024-01-15'),
    dimensions: '1920x1080'
  },
  {
    id: '2',
    name: 'wellness-image.jpg',
    type: 'image',
    size: '2.1 MB',
    url: '/api/placeholder/400/300',
    uploadedAt: new Date('2024-01-14'),
    dimensions: '1200x800'
  },
  {
    id: '3',
    name: 'community-photo.jpg',
    type: 'image',
    size: '1.8 MB',
    url: '/api/placeholder/400/300',
    uploadedAt: new Date('2024-01-13'),
    dimensions: '1000x667'
  },
  {
    id: '4',
    name: 'presentation.pdf',
    type: 'document',
    size: '5.4 MB',
    url: '#',
    uploadedAt: new Date('2024-01-12'),
    dimensions: null
  }
];

export default function MediaLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dragActive, setDragActive] = useState(false);

  const filteredMedia = mockMedia.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      // In a real app, you would upload to your storage service
      toast.success(`${file.name} uploaded successfully!`);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const copyToClipboard = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    toast.success(`${name} URL copied to clipboard!`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const formatFileSize = (size: string) => size;
  const formatDate = (date: Date) => date.toLocaleDateString();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/5">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">Media Library</h1>
                <p className="text-sm text-white/60">Manage your images, videos, and documents</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <Card className="mb-8 bg-white/5 border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Upload className="h-5 w-5" />
              <span>Upload Media</span>
            </CardTitle>
            <CardDescription className="text-white/60">
              Drag and drop files here or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-white/50 bg-white/10' 
                  : 'border-white/20 hover:border-white/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto text-white/40 mb-4" />
              <p className="text-lg font-medium text-white mb-2">
                Drop files here to upload
              </p>
              <p className="text-sm text-white/50 mb-4">
                Supports images, videos, and documents up to 50MB
              </p>
              <Label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer border-white/20 text-white/70 hover:text-white hover:bg-white/5">
                  Browse Files
                </Button>
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-6 bg-white/5 border border-white/10">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                  <Input
                    placeholder="Search media files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-white/50" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-white/10 rounded-md px-3 py-2 text-sm bg-white/5 text-white"
                >
                  <option value="all">All Files</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="document">Documents</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-white/60">
            Showing {filteredMedia.length} of {mockMedia.length} files
          </p>
        </div>

        {/* Media Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-white/10 rounded-t-lg overflow-hidden">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <File className="h-16 w-16 text-white/40" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {getFileIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                      <span className="text-xs text-white/50">{formatFileSize(item.size)}</span>
                    </div>
                    
                    <h3 className="font-medium text-white truncate mb-1">
                      {item.name}
                    </h3>
                    
                    {item.dimensions && (
                      <p className="text-xs text-white/50 mb-2">{item.dimensions}</p>
                    )}
                    
                    <p className="text-xs text-white/50 mb-3">
                      {formatDate(item.uploadedAt)}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(item.url, item.name)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {filteredMedia.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center">
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={item.name}
                              className="h-full w-full object-cover rounded-lg"
                            />
                          ) : (
                            getFileIcon(item.type)
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-white">{item.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-white/50">
                            <Badge variant="outline" className="text-xs">
                              <span className="capitalize">{item.type}</span>
                            </Badge>
                            <span>{formatFileSize(item.size)}</span>
                            {item.dimensions && <span>{item.dimensions}</span>}
                            <span>{formatDate(item.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(item.url, item.name)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {filteredMedia.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No media found</h3>
              <p className="text-white/60">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'Upload your first media file to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
