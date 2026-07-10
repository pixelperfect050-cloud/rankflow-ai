import { ArticleService } from '@/features/articles/service/article.service'
import { AuthService } from '@/features/auth/service/auth.service'
import { WorkspaceRepository } from '@/features/workspaces/repository/workspace.repository'
import { redirect } from 'next/navigation'
import ArticleListClient from './article-list-client'

export default async function ArticleManagerPage() {
  const auth = new AuthService();
  const { user } = await auth.getUser();
  if (!user) redirect('/admin/login');

  const workspaceRepo = new WorkspaceRepository();
  const workspaces = await workspaceRepo.getUserWorkspaces(user.id);
  
  if (workspaces.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        <h2>No workspace found.</h2>
      </div>
    );
  }

  const workspaceId = workspaces[0].id;
  
  const articleService = new ArticleService();
  const articles = await articleService.listWorkspaceArticles(workspaceId);

  return (
    <ArticleListClient initialArticles={articles} />
  )
}
