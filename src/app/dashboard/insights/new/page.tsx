"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, X, Save, Eye, Loader2, FileText, Clock, Target, Lightbulb, BookOpen, Zap, Bold, Italic, List, Quote, Type } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CreateInsightPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [authorBio, setAuthorBio] = useState('Entrepreneur and advocate for personal growth.');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const router = useRouter();
  const { user } = useAuth();
  
  // Fetch categories for dropdown
  const categories = useQuery(api.categories.getCategories, { activeOnly: true });
  const createInsight = useMutation(api.insights.createInsight);
  const initializeCategories = useMutation(api.initialize.initializeDatabase);

  // Debug: Log categories and user
  useEffect(() => {
    console.log('Dashboard - Categories loaded:', categories);
    console.log('Dashboard - User object:', user);
  }, [categories, user]);

  // Initialize categories if they don't exist
  const handleInitializeCategories = async () => {
    try {
      await initializeCategories();
      toast.success('Categories initialized successfully!');
    } catch (error) {
      toast.error('Failed to initialize categories');
      console.error('Categories initialization error:', error);
    }
  };

  // Calculate word count and reading time
  const calculateStats = useCallback((text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    setWordCount(wordCount);
    setReadingTime(readingTime);
  }, []);

  // Auto-generate excerpt from content
  const generateExcerpt = useCallback((content: string) => {
    if (!excerpt && content.length > 100) {
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const firstSentences = sentences.slice(0, 2).join('. ');
      if (firstSentences.length > 50 && firstSentences.length < 200) {
        setExcerpt(firstSentences + '.');
      }
    }
  }, [excerpt]);

  // Auto-save functionality (simplified - in production, you'd save drafts to Convex)
  const autoSave = useCallback(() => {
    if (autoSaveEnabled && (title || content) && title.length > 3) {
      // In a real app, save draft to Convex here
      setLastSaved(new Date());
      localStorage.setItem('insight-draft', JSON.stringify({
        title, content, excerpt, category, tags, featuredImage, status
      }));
    }
  }, [title, content, excerpt, category, tags, featuredImage, status, autoSaveEnabled]);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('insight-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || '');
        setContent(draft.content || '');
        setExcerpt(draft.excerpt || '');
        setCategory(draft.category || '');
        setTags(draft.tags || []);
        setFeaturedImage(draft.featuredImage || '');
        setStatus(draft.status || 'draft');
        toast.info('Draft restored from previous session');
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  // Update stats when content changes
  useEffect(() => {
    calculateStats(content);
    generateExcerpt(content);
  }, [content, calculateStats, generateExcerpt]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Helper function to insert formatting
  const insertFormatting = (prefix: string, suffix: string, placeholder: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newText = content.substring(0, start) + prefix + textToInsert + suffix + content.substring(end);
    
    setContent(newText);
    
    // Set cursor position after formatting
    setTimeout(() => {
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  // Helper function to format content for preview
  const formatPreviewContent = (text: string) => {
    if (!text) return <p className="text-gray-500 italic">Start writing to see preview...</p>;
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-gray-900">{line.substring(3)}</h2>);
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-gray-900 pl-6 italic text-gray-700 my-4 text-xl">
            {formatInlineText(line.substring(2))}
          </blockquote>
        );
      } else if (line.startsWith('• ')) {
        elements.push(
          <li key={index} className="ml-4 mb-2 text-lg leading-relaxed">
            {formatInlineText(line.substring(2))}
          </li>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed text-lg text-gray-700">
            {formatInlineText(line)}
          </p>
        );
      } else {
        elements.push(<br key={index} />);
      }
    });
    
    return <div className="prose prose-lg max-w-none">{elements}</div>;
  };

  // Helper function to format inline text (bold, italic)
  const formatInlineText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*|\*(.*?)\*/g);
    return parts.map((part, index) => {
      if (index % 3 === 1) {
        return <strong key={index}>{part}</strong>;
      } else if (index % 3 === 2) {
        return <em key={index}>{part}</em>;
      }
      return part;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in title and content');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setIsLoading(true);

    try {
      // Ensure the database is initialized (creates user and categories)
      const initResult = await initializeCategories(); // This is actually the initializeDatabase mutation
      
      // Use the logged-in user ID or the user ID from initialization
      let authorId = user?._id;
      
      if (!authorId) {
        // If no user is logged in, we need to get the initialized user ID
        // The initializeDatabase returns the user ID
        authorId = initResult?.userId || "jn737k33cksxew8vypzg3457s57petqv" as any; // Final fallback
      }
      
      const result = await createInsight({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || `${content.substring(0, 200)}...`,
        category: category,
        authorId: authorId as any,
        status: status,
        featuredImage: featuredImage || undefined,
        tags: tags,
        readTime: `${readingTime} min`,
        authorBio: authorBio.trim(),
      });

      toast.success(`Insight ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      
      // Clear the draft from localStorage after successful submission
      localStorage.removeItem('insight-draft');
      
      // Generate slug for the URL
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      if (status === 'published') {
        toast.success(`View your published insight at: /insights/${slug}`);
      }
      
      router.push('/dashboard/insights');
    } catch (error) {
      console.error('Error creating insight:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to create insight: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/insights">
                <Button variant="ghost" className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/5">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Insights</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">Create New Insight</h1>
                <p className="text-sm text-white/60">Share your knowledge with the Live & Learn Hub</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant={isPreviewMode ? "default" : "outline"}
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center space-x-2 ${
                  isPreviewMode 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </Button>
              <Button
                type="submit"
                form="insight-form"
                disabled={isLoading}
                className="bg-white text-black hover:bg-white/90 flex items-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isLoading ? 'Saving...' : 'Save Insight'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form id="insight-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Excerpt */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content Details</CardTitle>
                <CardDescription className="text-white/60">
                  Update the main content for your insight
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-white/70">
                    Title *
                  </Label>
                  <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a compelling title for your insight"
                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-sm font-medium text-white/70">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary of your insight (optional - will auto-generate if empty)"
                    className="mt-1 min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30"
          />
        </div>
        
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content" className="text-base font-medium text-white/70">
                      Content *
                    </Label>
                  </div>
                  
                  {!isPreviewMode ? (
                    <div className="space-y-3">
                      {/* Formatting Toolbar */}
                      <div className="flex flex-wrap items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('**', '**', 'Bold text')}
                          className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                          title="Bold"
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('*', '*', 'Italic text')}
                          className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                          title="Italic"
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6 bg-white/20" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('\n• ', '', 'List item')}
                          className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                          title="Bullet Point"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('\n> ', '', 'Quote text')}
                          className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                          title="Blockquote"
                        >
                          <Quote className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6 bg-white/20" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('\n## ', '', 'Heading')}
                          className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                          title="Heading"
                        >
                          <Type className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
                        placeholder={`Write your insight content here...

Formatting tips:
• Use **bold** for emphasis
• Use *italic* for subtle emphasis  
• Use bullet points with • 
• Use > for blockquotes
• Use ## for headings

Example:
## Key Takeaway
> "Boundaries protect your peace."

**Important:** Setting boundaries isn't about being *distant* - it's about protection.

• Protect your peace
• Protect your dignity  
• Protect your emotional well-being`}
                        className="min-h-[400px] resize-none font-mono text-sm bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30"
                        required
                      />
                    </div>
                  ) : (
                    <div className="min-h-[400px] p-6 border border-white/10 rounded-lg bg-white/5">
                      {formatPreviewContent(content)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Tags</CardTitle>
                <CardDescription className="text-white/60">
                  Add relevant tags to help categorize your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
        </div>
        
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-white/10 text-white/70 border-white/20 flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-4">
            {/* Writing Stats - Compact */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-white">
                  <BookOpen className="w-4 h-4" />
                  Writing Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{wordCount}</div>
                    <div className="text-xs text-white/60">Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{readingTime}</div>
                    <div className="text-xs text-white/60">Min Read</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-white/70">
                    <span>Progress</span>
                    <span>{Math.min(Math.round((wordCount / 500) * 100), 100)}%</span>
                  </div>
                  <Progress value={Math.min((wordCount / 500) * 100, 100)} className="h-1.5" />
                  <p className="text-xs text-white/50">Target: 500+ words for quality insight</p>
                </div>

                {lastSaved && (
                  <div className="flex items-center space-x-1 text-xs text-white/50">
                    <Clock className="h-3 w-3" />
                    <span>Saved: {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Author Bio */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Author Information</CardTitle>
                <CardDescription className="text-xs text-white/60">How you'll appear as the author</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="authorBio" className="text-sm font-medium text-white/70">Author Bio</Label>
                  <Textarea
                    id="authorBio"
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    placeholder="A brief description about yourself..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 resize-none text-sm"
                    rows={3}
                  />
                  <p className="text-xs text-white/40">
                    This will appear on your insight page
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Publish Settings - Enhanced */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Publish Settings</CardTitle>
                <CardDescription className="text-xs text-white/60">Control how your insight is published</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="status" className="text-sm font-medium text-white/70">Status</Label>
                  <Select value={status} onValueChange={(value: 'draft' | 'published') => setStatus(value)}>
                    <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/20">
                      <SelectValue className="text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-white/10 shadow-lg rounded-md">
                      <SelectItem 
                        value="draft"
                        className="px-3 py-2 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                      >
                        📝 Draft
                      </SelectItem>
                      <SelectItem 
                        value="published"
                        className="px-3 py-2 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                      >
                        🚀 Published
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-sm font-medium text-white/70">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/20">
                      <SelectValue placeholder="Select category" className="text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-white/10 shadow-lg rounded-md z-[9999]">
                      {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                          <SelectItem 
                            key={cat._id} 
                            value={cat.name}
                            className="px-3 py-2 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                          >
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <>
                          <SelectItem value="no-categories" disabled className="px-3 py-2 text-white/50">
                            {categories === undefined ? "Loading categories..." : "No categories found"}
                          </SelectItem>
                          {categories !== undefined && categories.length === 0 && (
                            <div className="p-2">
                              <Button 
                                type="button"
                                size="sm" 
                                onClick={handleInitializeCategories}
                                className="w-full text-xs"
                              >
                                Initialize Categories
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="featuredImage" className="text-sm font-medium text-white/70">Featured Image</Label>
                  <Input
                    id="featuredImage"
                    type="url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="Image URL"
                    className="h-8 text-sm bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30"
                  />
                  {featuredImage && (
                    <div className="mt-2">
                      <img 
                        src={featuredImage} 
                        alt="Preview" 
                        className="w-full h-16 object-cover rounded border border-white/10"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips - Compact */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-white">
                  <Lightbulb className="w-4 h-4" />
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-white/60">
                  <li className="flex items-start gap-1.5">
                    <Target className="w-3 h-3 mt-0.5 text-white/50" />
                    <span>Start with a compelling hook</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Target className="w-3 h-3 mt-0.5 text-white/50" />
                    <span>Use clear, concise language</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Target className="w-3 h-3 mt-0.5 text-white/50" />
                    <span>Include actionable takeaways</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Target className="w-3 h-3 mt-0.5 text-white/50" />
                    <span>End with a call to action</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-white/70">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-white/50">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
        </form>
      </div>
    </div>
  );
}