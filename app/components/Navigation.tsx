'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { name: '文本工具', path: '/' },
    { name: '视频工具', path: '/video' },
    { name: 'AI 工具', path: '/ai' },
    { name: '图片工具', path: '/image' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-1000">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-4 px-2 ${
                pathname === item.path
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 