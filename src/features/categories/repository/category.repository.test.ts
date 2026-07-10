import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CategoryRepository } from './category.repository';
import { createClient } from '@/lib/supabase/server';

// Mock the supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('CategoryRepository', () => {
  let repository: CategoryRepository;
  let mockSupabase: any;
  let mockChain: any;

  beforeEach(() => {
    repository = new CategoryRepository();
    
    mockChain = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };

    mockSupabase = {
      from: vi.fn().mockReturnValue(mockChain),
    };

    (createClient as any).mockResolvedValue(mockSupabase);
  });

  it('✓ Create', async () => {
    const mockCategory = { id: '1', name: 'Software', path: '/software/' };
    mockChain.single.mockResolvedValue({ data: mockCategory, error: null });

    const result = await repository.createCategory({ name: 'Software', path: '/software/' });
    
    expect(mockSupabase.from).toHaveBeenCalledWith('categories');
    expect(mockChain.insert).toHaveBeenCalled();
    expect(result).toEqual(mockCategory);
  });

  it('✓ Update', async () => {
    const mockCategory = { id: '1', name: 'Updated Software' };
    mockChain.single.mockResolvedValue({ data: mockCategory, error: null });

    const result = await repository.updateCategory('1', { name: 'Updated Software' });
    
    expect(mockChain.update).toHaveBeenCalled();
    expect(mockChain.eq).toHaveBeenCalledWith('id', '1');
    expect(result).toEqual(mockCategory);
  });

  it('✓ Soft Delete', async () => {
    mockChain.eq.mockResolvedValue({ error: null });

    await repository.softDeleteCategory('1', 'user-123');
    
    expect(mockChain.update).toHaveBeenCalledWith(
      expect.objectContaining({ deleted_by: 'user-123' })
    );
  });

  it('✓ Checks active children properly', async () => {
    mockChain.is.mockResolvedValue({ count: 2, error: null });

    const hasChildren = await repository.hasActiveChildren('1');
    
    expect(mockChain.select).toHaveBeenCalledWith('*', { count: 'exact', head: true });
    expect(hasChildren).toBe(true);
  });

  it('✓ Bulk update uses loop fallback', async () => {
    mockChain.eq.mockResolvedValue({ error: null });

    await repository.bulkUpdateCategories([
      { id: '1', path: '/new/path/' },
      { id: '2', path: '/new/path/child/' }
    ]);
    
    expect(mockChain.update).toHaveBeenCalledTimes(2);
  });
});
