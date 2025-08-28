"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';


import { CalendarIcon, SaveIcon, XIcon, CheckIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';

interface InsightFormData {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publicationDate: string;
  status: 'published' | 'draft';
  featuredImage?: string;
  content: string;
}

interface InsightFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<InsightFormData>;
  onSubmit: (data: InsightFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CATEGORIES = [
  'Personal Growth',
  'Wellness',
  'Leadership',
  'Community',
  'Purpose',
  'Mindset'
];

const MAX_TITLE_LENGTH = 100;
const MAX_EXCERPT_LENGTH = 300;

export const InsightForm: React.FC<InsightFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<InsightFormData>({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || '',
    author: initialData?.author || '',
    publicationDate: initialData?.publicationDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'draft',
    featuredImage: initialData?.featuredImage || '',
    content: initialData?.content || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InsightFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges || mode === 'create') return;

    const autoSaveTimer = setTimeout(() => {
      setAutoSaveStatus('saving');
      // Simulate auto-save API call
      setTimeout(() => {
        setAutoSaveStatus('saved');
        setHasUnsavedChanges(false);
        setTimeout(() => setAutoSaveStatus('idle'), 2000);
      }, 1000);
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData, hasUnsavedChanges, mode]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof InsightFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title must be ${MAX_TITLE_LENGTH} characters or less`;
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length > MAX_EXCERPT_LENGTH) {
      newErrors.excerpt = `Excerpt must be ${MAX_EXCERPT_LENGTH} characters or less`;
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.publicationDate) {
      newErrors.publicationDate = 'Publication date is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof InsightFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setSubmitStatus('idle');
    
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setHasUnsavedChanges(false);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit]);

  const handleSaveDraft = useCallback(async () => {
    const draftData = { ...formData, status: 'draft' as const };
    setFormData(draftData);
    
    try {
      await onSubmit(draftData);
      setSubmitStatus('success');
      setHasUnsavedChanges(false);
    } catch (error) {
      setSubmitStatus('error');
    }
  }, [formData, onSubmit]);

  const AutoSaveIndicator = () => {
    if (autoSaveStatus === 'saving') {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4 animate-spin" />
          Saving...
        </div>
      );
    }
    
    if (autoSaveStatus === 'saved') {
      return (
        <div className="flex items-center gap-2 text-sm text-green-400">
          <CheckIcon className="h-4 w-4" />
          Auto-saved
        </div>
      );
    }
    
    if (hasUnsavedChanges) {
      return (
        <div className="flex items-center gap-2 text-sm text-yellow-400">
          <AlertCircleIcon className="h-4 w-4" />
          Unsaved changes
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-medium">
            {mode === 'create' ? 'Create New Insight' : 'Edit Insight'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === 'create' 
              ? 'Share your knowledge and insights with the community' 
              : 'Update your insight content and settings'
            }
          </p>
        </div>
        <AutoSaveIndicator />
      </div>

      {submitStatus === 'success' && (
        <Alert className="border-green-400 bg-green-400/10">
          <CheckIcon className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            Insight {mode === 'create' ? 'created' : 'updated'} successfully!
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertCircleIcon className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            There was an error {mode === 'create' ? 'creating' : 'updating'} the insight. Please check the form and try again.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter insight title..."
                  maxLength={MAX_TITLE_LENGTH}
                  className={errors.title ? 'border-destructive' : ''}
                  aria-describedby={errors.title ? 'title-error' : 'title-help'}
                  aria-invalid={!!errors.title}
                />
                <div className="flex justify-between items-center">
                  {errors.title && (
                    <span id="title-error" className="text-sm text-destructive" role="alert">
                      {errors.title}
                    </span>
                  )}
                  <span 
                    id="title-help" 
                    className={`text-sm ${formData.title.length > MAX_TITLE_LENGTH * 0.8 ? 'text-yellow-400' : 'text-muted-foreground'} ml-auto`}
                  >
                    {formData.title.length}/{MAX_TITLE_LENGTH}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author" className="text-sm font-medium">
                  Author <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Enter author name..."
                  className={errors.author ? 'border-destructive' : ''}
                  aria-invalid={!!errors.author}
                />
                {errors.author && (
                  <span className="text-sm text-destructive" role="alert">
                    {errors.author}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Write a brief description of your insight..."
                rows={3}
                maxLength={MAX_EXCERPT_LENGTH}
                className={errors.excerpt ? 'border-destructive' : ''}
                aria-describedby={errors.excerpt ? 'excerpt-error' : 'excerpt-help'}
                aria-invalid={!!errors.excerpt}
              />
              <div className="flex justify-between items-center">
                {errors.excerpt && (
                  <span id="excerpt-error" className="text-sm text-destructive" role="alert">
                    {errors.excerpt}
                  </span>
                )}
                <span 
                  id="excerpt-help" 
                  className={`text-sm ${formData.excerpt.length > MAX_EXCERPT_LENGTH * 0.8 ? 'text-yellow-400' : 'text-muted-foreground'} ml-auto`}
                >
                  {formData.excerpt.length}/{MAX_EXCERPT_LENGTH}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger 
                    id="category"
                    className={errors.category ? 'border-destructive' : ''}
                    aria-invalid={!!errors.category}
                  >
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <span className="text-sm text-destructive" role="alert">
                    {errors.category}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicationDate" className="text-sm font-medium">
                  Publication Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="publicationDate"
                  type="date"
                  value={formData.publicationDate}
                  onChange={(e) => handleInputChange('publicationDate', e.target.value)}
                  className={errors.publicationDate ? 'border-destructive' : ''}
                  aria-invalid={!!errors.publicationDate}
                />
                {errors.publicationDate && (
                  <span className="text-sm text-destructive" role="alert">
                    {errors.publicationDate}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'published' | 'draft') => handleInputChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Draft</Badge>
                        <span>Draft</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="published">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-xs">Published</Badge>
                        <span>Published</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display">Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="url"
              placeholder="Enter image URL"
              value={formData.featuredImage}
              onChange={(e) => handleInputChange('featuredImage', e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Upload a featured image for your insight. Recommended size: 1200x630px
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display">
              Content <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Start writing your insight..."
              rows={15}
              className="min-h-[400px]"
            />
            {errors.content && (
              <span className="text-sm text-destructive mt-2 block" role="alert">
                {errors.content}
              </span>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-border">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting || loading}
              className="flex items-center gap-2"
            >
              <XIcon className="h-4 w-4" />
              Cancel
            </Button>
            
            {mode === 'edit' && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
                disabled={isSubmitting || loading}
                className="flex items-center gap-2"
              >
                <SaveIcon className="h-4 w-4" />
                Save Draft
              </Button>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="flex items-center gap-2"
          >
            {isSubmitting || loading ? (
              <>
                <ClockIcon className="h-4 w-4 animate-spin" />
                {mode === 'create' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              <>
                <CheckIcon className="h-4 w-4" />
                {formData.status === 'published' 
                  ? (mode === 'create' ? 'Publish Insight' : 'Update & Publish')
                  : (mode === 'create' ? 'Save Draft' : 'Update Draft')
                }
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};