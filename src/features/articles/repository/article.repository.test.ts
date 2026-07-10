import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArticleRepository } from './article.repository';
import { createClient } from '@/lib/supabase/server';

// Mock the supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('ArticleRepository', () => {
  let repository: ArticleRepository;
  let mockSupabase: any;

  beforeEach(() => {
    repository = new ArticleRepository();
    
    // Setup generic supabase mock chain
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };

    mockSupabase = {
      from: vi.fn().mockReturnValue(mockChain),
    };

    (createClient as any).mockResolvedValue(mockSupabase);
  });

  it('✓ Create', async () => {
    const mockArticle = { id: '1', title: 'New Article' };
    mockSupabase.from().single.mockResolvedValue({ data: mockArticle, error: null });

    const result = await repository.createArticle({ title: 'New Article' });
    
    expect(mockSupabase.from).toHaveBeenCalledWith('articles');
    expect(mockSupabase.from().insert).toHaveBeenCalled();
    expect(result).toEqual(mockArticle);
  });

  it('✓ Update', async () => {
    const mockArticle = { id: '1', title: 'Updated' };
    mockSupabase.from().single.mockResolvedValue({ data: mockArticle, error: null });

    const result = await repository.updateArticle('1', { title: 'Updated' });
    
    expect(mockSupabase.from().update).toHaveBeenCalled();
    expect(mockSupabase.from().eq).toHaveBeenCalledWith('id', '1');
    expect(result).toEqual(mockArticle);
  });

  it('✓ Publish', async () => {
    mockSupabase.from().eq.mockResolvedValue({ error: null });

    await repository.publishArticle('1');
    
    expect(mockSupabase.from().update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'published' })
    );
  });

  it('✓ Soft Delete', async () => {
    mockSupabase.from().eq.mockResolvedValue({ error: null });

    await repository.softDeleteArticle('1', 'user-id');
    
    expect(mockSupabase.from().update).toHaveBeenCalledWith(
      expect.objectContaining({ deleted_by: 'user-id' })
    );
  });

  it('✓ Restore', async () => {
    mockSupabase.from().eq.mockResolvedValue({ error: null });

    await repository.restoreArticle('1');
    
    expect(mockSupabase.from().update).toHaveBeenCalledWith(
      expect.objectContaining({ deleted_at: null, deleted_by: null })
    );
  });
});
