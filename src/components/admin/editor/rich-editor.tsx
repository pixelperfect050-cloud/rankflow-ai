'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, 
  Quote, Code, ImageIcon, Link2, Plus, GripVertical
} from 'lucide-react'

// Basic floating menu for standard formatting
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1 p-1 bg-white border border-slate-200 rounded-lg shadow-sm mb-4 sticky top-4 z-10 w-max">
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        isActive={editor.isActive('bold')} 
        icon={Bold} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        isActive={editor.isActive('italic')} 
        icon={Italic} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleStrike().run()} 
        isActive={editor.isActive('strike')} 
        icon={Strikethrough} 
      />
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
        isActive={editor.isActive('heading', { level: 2 })} 
        label="H2" 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
        isActive={editor.isActive('heading', { level: 3 })} 
        label="H3" 
      />
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()} 
        isActive={editor.isActive('bulletList')} 
        icon={List} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()} 
        isActive={editor.isActive('orderedList')} 
        icon={ListOrdered} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBlockquote().run()} 
        isActive={editor.isActive('blockquote')} 
        icon={Quote} 
      />
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      <MenuButton 
        onClick={() => {
          const url = window.prompt('URL')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }} 
        isActive={editor.isActive('link')} 
        icon={Link2} 
      />
      <MenuButton 
        onClick={() => {
          const url = window.prompt('Image URL')
          if (url) editor.chain().focus().setImage({ src: url }).run()
        }} 
        icon={ImageIcon} 
      />
    </div>
  )
}

const MenuButton = ({ onClick, isActive, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-slate-100 transition-colors ${isActive ? 'bg-slate-100 text-emerald-600' : 'text-slate-600'}`}
  >
    {Icon ? <Icon className="w-4 h-4" /> : <span className="text-sm font-semibold px-1">{label}</span>}
  </button>
)

export function RichEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-emerald-600 hover:underline' }
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-xl max-w-full h-auto' }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: 'border-collapse table-auto w-full' }
      }),
      TableRow,
      TableHeader.configure({ HTMLAttributes: { class: 'border border-slate-300 px-4 py-2 bg-slate-100 font-bold' } }),
      TableCell.configure({ HTMLAttributes: { class: 'border border-slate-300 px-4 py-2' } }),
    ],
    content: `
      <p>Start writing your next viral post here...</p>
      <h2>What is an AI Video Generator?</h2>
      <p>AI video generators are tools that use artificial intelligence to create or edit videos from text prompts, images, or raw footage.</p>
      
      <!-- Placeholder for Custom React Block (Tool Recommendation) -->
      <div class="p-6 border border-emerald-200 bg-emerald-50 rounded-xl my-6 flex items-center justify-between">
         <div>
            <div class="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Custom Block</div>
            <h3 class="text-lg font-bold text-slate-900">Tool Recommendation: Runway Gen-2</h3>
            <p class="text-slate-600 text-sm mt-1">This block will render as an interactive React Component (NodeView) in production.</p>
         </div>
         <button class="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg">Edit Data</button>
      </div>

      <blockquote>
        <p>This is a quote from a famous AI researcher.</p>
      </blockquote>
      
      <p>Press <code>/</code> for commands, or use the menu above.</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-slate prose-lg max-w-none focus:outline-none min-h-[500px]',
      },
    },
  })

  return (
    <div className="relative group">
      {/* Left side grip/plus button that shows on hover (Notion style) */}
      <div className="absolute -left-12 top-0 bottom-0 w-12 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col pt-16 items-center gap-2">
        <button className="p-1 text-slate-400 hover:text-slate-900 rounded hover:bg-slate-100">
          <Plus className="w-5 h-5" />
        </button>
        <button className="p-1 text-slate-400 hover:text-slate-900 rounded hover:bg-slate-100 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5" />
        </button>
      </div>

      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      
      {/* Slash command hint */}
      <div className="mt-8 pt-8 border-t border-slate-100">
        <p className="text-sm text-slate-400">
          Pro tip: Type <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">/tool</kbd> to insert a tool recommendation card.
        </p>
      </div>
    </div>
  )
}
