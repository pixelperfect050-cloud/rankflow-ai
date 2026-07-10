import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaService } from './media.service';
import { MediaRepository } from '../repository/media.repository';
import { IStorageAdapter } from '../storage/storage.adapter';
import crypto from 'crypto';

// Mock dependencies
vi.mock('../repository/media.repository');

// A simple mock for storage adapter
class MockStorage implements IStorageAdapter {
  upload = vi.fn().mockResolvedValue('url');
  delete = vi.fn().mockResolvedValue(undefined);
  getPublicUrl = vi.fn().mockReturnValue('url');
  getSignedUrl = vi.fn().mockResolvedValue('signed-url');
}

describe('MediaService', () => {
  let service: MediaService;
  let mockRepo: vi.Mocked<MediaRepository>;
  let mockStorage: MockStorage;

  beforeEach(() => {
    mockRepo = new MediaRepository() as vi.Mocked<MediaRepository>;
    mockStorage = new MockStorage();
    
    service = new MediaService();
    (service as any).repository = mockRepo;
    (service as any).storage = mockStorage;
  });

  it('✓ fast upload pipeline creates DB records and triggers background job', async () => {
    const buffer = Buffer.from('fake-image-data');
    mockRepo.createAsset.mockResolvedValue({ id: 'new-asset-id' } as any);
    mockRepo.createJob.mockResolvedValue({ id: 'job-id' } as any);
    
    // We mock the triggerProcessingJob so it doesn't actually try to import sharp in tests
    const spy = vi.spyOn(service as any, 'triggerProcessingJob').mockResolvedValue(undefined);

    await service.uploadMedia('ws-1', 'user-1', buffer, 'test.png', 'image/png');

    // Should upload original
    expect(mockStorage.upload).toHaveBeenCalled();
    // Should create asset
    expect(mockRepo.createAsset).toHaveBeenCalledWith(
      expect.objectContaining({ filename: expect.stringContaining('.png') })
    );
    // Should create job
    expect(mockRepo.createJob).toHaveBeenCalledWith('new-asset-id');
    // Should trigger processing (async)
    expect(spy).toHaveBeenCalled();
  });
});
