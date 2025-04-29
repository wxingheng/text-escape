'use client'

export default function FriendLinks() {
  const links = [
    {
      name: 'Markdown转图片工具',
      url: 'https://md2img.jcommon.top',
      icon: '📝'
    },
    // 可以在这里添加更多友情链接
  ]

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
        <span>友情链接：</span>
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-blue-600"
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
} 