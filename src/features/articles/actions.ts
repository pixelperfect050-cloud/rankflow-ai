'use server'

import { ArticleService } from './service/article.service'
import { revalidatePath } from 'next/cache'
import { AuthService } from '@/features/auth/service/auth.service'
import { WorkspaceRepository } from '@/features/workspaces/repository/workspace.repository'
import { Article } from '@/types'

export async function saveArticleAction(id: string | null, data: { title: string, content_json?: any, content_html?: string, status?: string }) {
  const auth = new AuthService();
  const { user } = await auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const workspaceRepo = new WorkspaceRepository();
  const workspaces = await workspaceRepo.getUserWorkspaces(user.id);
  if (workspaces.length === 0) throw new Error("No active workspace");
  
  const workspaceId = workspaces[0].id;
  const articleService = new ArticleService();

  let article;
  
  if (!id || id === 'new') {
    // Create new draft
    article = await articleService.createDraft(workspaceId, data.title || 'Untitled', user.id);
    if (data.content_json) {
       article = await articleService['repository'].updateArticle(article.id, { 
         content_json: data.content_json, 
         content_html: data.content_html,
         title: data.title
       });
    }
  } else {
    // Update existing
    article = await articleService['repository'].updateArticle(id, data as Partial<Article>);
  }

  revalidatePath('/admin/articles');
  revalidatePath(`/admin/articles/${article.id}`);
  
  return { success: true, article };
}

export async function publishArticleAction(id: string) {
  const auth = new AuthService();
  const { user } = await auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const articleService = new ArticleService();
  await articleService.publish(id);

  revalidatePath('/admin/articles');
  revalidatePath(`/admin/articles/${id}`);
  
  return { success: true };
}
