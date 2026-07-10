import { ArticleRepository } from '../repository/article.repository';
import { Article } from '@/types';
import { env } from '@/config/env';

export class ArticleService {
  private repository: ArticleRepository;

  constructor() {
    this.repository = new ArticleRepository();
  }

  /**
   * Domain Logic: Create an article, automatically generating a slug from the title.
   */
  async createDraft(workspaceId: string, title: string, userId: string): Promise<Article> {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`; // Simple uniqueness

    const article = await this.repository.createArticle({
      workspace_id: workspaceId,
      title,
      slug: uniqueSlug,
      status: 'draft',
      author_id: userId,
    } as any); // Type assertion until full schema is mapped

    // Event Bus hook could go here (e.g., emit('ARTICLE_CREATED'))
    return article;
  }

  async publish(articleId: string): Promise<void> {
    await this.repository.publishArticle(articleId);
    
    // Domain Events
    // EventBus.emit('ARTICLE_PUBLISHED', { articleId });
  }

  async getArticle(id: string): Promise<Article | null> {
    return this.repository.getArticleById(id);
  }

  async listWorkspaceArticles(workspaceId: string): Promise<Article[]> {
    return this.repository.getArticlesByWorkspace(workspaceId);
  }
}
