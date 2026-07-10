import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductService } from './product.service';
import { ProductRepository } from '../repository/product.repository';

vi.mock('../repository/product.repository');

describe('ProductService Intelligence Score', () => {
  let service: ProductService;
  let mockRepo: vi.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepo = new ProductRepository() as vi.Mocked<ProductRepository>;
    service = new ProductService();
    (service as any).repository = mockRepo;
  });

  it('✓ Calculates score correctly for a completely empty product', async () => {
    mockRepo.getProductById.mockResolvedValue({ id: '1', name: 'Empty Tool' } as any);
    mockRepo.getPricingPlans.mockResolvedValue([]);

    await service.calculateIntelligenceScore('1');

    expect(mockRepo.updateIntelligenceScores).toHaveBeenCalledWith('1', expect.objectContaining({
      completeness_score: 0,
      overall_score: 0
    }));
  });

  it('✓ Calculates score correctly for a partially complete product', async () => {
    mockRepo.getProductById.mockResolvedValue({
      id: '1',
      name: 'Partial Tool',
      website_url: 'https://example.com',
      logo_id: 'logo-uuid',
      tagline: 'A great tool',
      slug: 'partial-tool'
    } as any);
    mockRepo.getPricingPlans.mockResolvedValue([{ id: 'plan-1' } as any]);

    await service.calculateIntelligenceScore('1');

    // Expected score:
    // website_url: 5
    // logo_id: 5
    // tagline: 10
    // slug (>3): 10
    // pricing plan: 10
    // Total = 40
    expect(mockRepo.updateIntelligenceScores).toHaveBeenCalledWith('1', expect.objectContaining({
      completeness_score: 40,
      overall_score: 40
    }));
  });
});
