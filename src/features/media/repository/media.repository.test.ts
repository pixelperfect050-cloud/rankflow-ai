import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaRepository } from './media.repository';
import { createClient } from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('MediaRepository', () => {
  let repository: MediaRepository;
  let mockSupabase: any;
  let mockChain: any;

  beforeEach(() => {
    repository = new MediaRepository();
    
    mockChain = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };

    mockSupabase = {
      from: vi.fn().mockReturnValue(mockChain),
    };

    (createClient as any).mockResolvedValue(mockSupabase);
  });

  it('✓ Creates an asset', async () => {
    const mockAsset = { id: '1', filename: 'test.jpg' };
    mockChain.single.mockResolvedValue({ data: mockAsset, error: null });

    const result = await repository.createAsset({ filename: 'test.jpg' });
    
    expect(mockSupabase.from).toHaveBeenCalledWith('media_assets');
    expect(mockChain.insert).toHaveBeenCalled();
    expect(result).toEqual(mockAsset);
  });

  it('✓ Soft Delete prevents if usage is > 0', async () => {
    // Mock getUsage
    vi.spyOn(repository, 'getUsage').mockResolvedValue([
      { id: '1', media_asset_id: 'asset-1', model_type: 'article', model_id: 'article-1', created_at: '' }
    ]);

    await expect(repository.softDeleteAsset('asset-1', 'user-1'))
      .rejects.toThrow(/actively used in 1 places/);
  });

  it('✓ Soft Delete proceeds if usage is 0', async () => {
    vi.spyOn(repository, 'getUsage').mockResolvedValue([]);
    mockChain.eq.mockResolvedValue({ error: null }); // update success

    await repository.softDeleteAsset('asset-1', 'user-1');
    expect(mockChain.update).toHaveBeenCalledWith(
      expect.objectContaining({ deleted_by: 'user-1' })
    );
  });
});
