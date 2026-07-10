import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CategoryService } from './category.service';
import { CategoryRepository } from '../repository/category.repository';

vi.mock('../repository/category.repository');

describe('CategoryService', () => {
  let service: CategoryService;
  let mockRepo: vi.Mocked<CategoryRepository>;

  beforeEach(() => {
    mockRepo = new CategoryRepository() as vi.Mocked<CategoryRepository>;
    service = new CategoryService();
    // Inject mock
    (service as any).categoryRepository = mockRepo;
  });

  describe('generateUniqueSlug', () => {
    it('✓ generates simple slug if no collisions', async () => {
      mockRepo.getCategoriesByWorkspace.mockResolvedValue([]);
      
      const slug = await service.generateUniqueSlug('ws-1', 'AI Chatbots!');
      expect(slug).toBe('ai-chatbots');
    });

    it('✓ appends counter if collision exists', async () => {
      mockRepo.getCategoriesByWorkspace.mockResolvedValue([
        { slug: 'ai-chatbots' } as any,
        { slug: 'ai-chatbots-2' } as any
      ]);
      
      const slug = await service.generateUniqueSlug('ws-1', 'AI Chatbots!');
      expect(slug).toBe('ai-chatbots-3');
    });
  });

  describe('createCategory', () => {
    it('✓ creates a root category correctly', async () => {
      mockRepo.getCategoriesByWorkspace.mockResolvedValue([]);
      mockRepo.createCategory.mockResolvedValue({ id: 'new-id', path: '/software/' } as any);

      await service.createCategory('ws-1', 'Software', null, null);
      
      expect(mockRepo.createCategory).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Software',
          slug: 'software',
          path: '/software/',
          depth: 0,
        })
      );
    });

    it('✓ creates a nested category correctly', async () => {
      mockRepo.getCategoriesByWorkspace.mockResolvedValue([]);
      mockRepo.getCategoryById.mockResolvedValue({ id: 'parent-1', depth: 0, path: '/software/' } as any);
      mockRepo.createCategory.mockResolvedValue({ id: 'new-id', path: '/software/ai/' } as any);

      await service.createCategory('ws-1', 'AI', 'parent-1', null);
      
      expect(mockRepo.createCategory).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'AI',
          slug: 'ai',
          path: '/software/ai/',
          depth: 1,
        })
      );
    });
  });

  describe('moveCategory', () => {
    it('✓ throws error if circular dependency detected', async () => {
      mockRepo.getCategoryById.mockImplementation(async (id) => {
        if (id === 'parent-1') return { id: 'parent-1', slug: 'software', path: '/software/', depth: 0 } as any;
        if (id === 'child-1') return { id: 'child-1', slug: 'ai', path: '/software/ai/', depth: 1 } as any;
        return null;
      });

      // Try to move software into ai
      await expect(service.moveCategory('ws-1', 'parent-1', 'child-1')).rejects.toThrow(/Circular dependency/);
    });

    it('✓ recursively updates paths', async () => {
      mockRepo.getCategoryById.mockImplementation(async (id) => {
        if (id === 'ai') return { id: 'ai', slug: 'ai', path: '/software/ai/', depth: 1 } as any;
        if (id === 'tools') return { id: 'tools', slug: 'tools', path: '/tools/', depth: 0 } as any;
        return null;
      });

      mockRepo.getDescendantsByPath.mockResolvedValue([
        { id: 'ai', path: '/software/ai/', depth: 1 } as any, // the category itself
        { id: 'chatbots', path: '/software/ai/chatbots/', depth: 2 } as any, // descendant
      ]);

      await service.moveCategory('ws-1', 'ai', 'tools');

      // AI category update
      expect(mockRepo.updateCategory).toHaveBeenCalledWith('ai', {
        parent_id: 'tools',
        depth: 1,
        path: '/tools/ai/'
      });

      // Descendants update
      expect(mockRepo.bulkUpdateCategories).toHaveBeenCalledWith([
        { id: 'chatbots', path: '/tools/ai/chatbots/', depth: 2 }
      ]);
    });
  });

  describe('deleteCategory', () => {
    it('✓ throws if category has active children', async () => {
      mockRepo.hasActiveChildren.mockResolvedValue(true);
      await expect(service.deleteCategory('1', 'user-1')).rejects.toThrow(/child categories/);
    });

    it('✓ throws if category has active tools', async () => {
      mockRepo.hasActiveChildren.mockResolvedValue(false);
      mockRepo.hasActiveArticles.mockResolvedValue(false);
      mockRepo.hasActiveTools.mockResolvedValue(true);
      await expect(service.deleteCategory('1', 'user-1')).rejects.toThrow(/active tools/);
    });

    it('✓ performs soft delete if safe', async () => {
      mockRepo.hasActiveChildren.mockResolvedValue(false);
      mockRepo.hasActiveArticles.mockResolvedValue(false);
      mockRepo.hasActiveTools.mockResolvedValue(false);
      
      await service.deleteCategory('1', 'user-1');
      expect(mockRepo.softDeleteCategory).toHaveBeenCalledWith('1', 'user-1');
    });
  });
});
