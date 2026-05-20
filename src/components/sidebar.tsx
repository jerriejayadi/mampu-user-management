'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Users, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()
  const { setTheme } = useTheme()

  return (
    <aside className="flex flex-col items-center w-14 min-h-screen py-4 gap-4 border-r border-border bg-card shrink-0">
      <span className="text-primary font-bold text-sm">M</span>

      <nav className="flex flex-col gap-2 flex-1">
        <Link
          href="/users"
          title="Users"
          className={cn(
            'flex items-center justify-center w-9 h-9 rounded-md transition-colors',
            pathname.startsWith('/users')
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <Users size={18} />
        </Link>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        onClick={() => setTheme(
          document.documentElement.classList.contains('dark') ? 'light' : 'dark'
        )}
        title="Toggle theme"
      >
        <Sun size={16} className="hidden dark:block" />
        <Moon size={16} className="dark:hidden" />
      </Button>
    </aside>
  )
}
