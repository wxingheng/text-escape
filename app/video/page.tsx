'use client'
import { useState, useEffect } from 'react'

export default function VideoTools() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [outputFormat, setOutputFormat] = useState('mp4')
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 清理视频URL
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [videoUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setError(null)

      // 创建新的视频URL
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
      const newVideoUrl = URL.createObjectURL(file)
      setVideoUrl(newVideoUrl)
    }
  }

  const handleConvert = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    setProgress(0)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('format', outputFormat)

    try {
      const response = await fetch('/api/video/convert', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '转换失败')
      }

      // 获取转换后的文件
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // 创建下载链接
      const a = document.createElement('a')
      a.href = url
      a.download = `converted.${outputFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      setProgress(100)
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换过程中发生错误')
      setProgress(0)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">视频工具</h1>
      
      <div className="space-y-8">
        {/* 视频转换工具 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">视频格式转换</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">选择视频文件</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                disabled={isConverting}
              />
            </div>

            {videoUrl && (
              <div className="mt-4">
                <div className="relative" style={{ width: '1200px', height: '699px' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-lg flex items-center justify-center">
                    <video
                      src={videoUrl}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg"
                      controls
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  视频预览 - {selectedFile?.name}
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">输出格式</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={isConverting}
              >
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="mov">MOV</option>
                <option value="avi">AVI</option>
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleConvert}
              disabled={!selectedFile || isConverting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isConverting ? '转换中...' : '开始转换'}
            </button>

            {progress > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">转换进度: {progress}%</p>
              </div>
            )}
          </div>
        </div>

        {/* 视频压缩工具 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">视频压缩</h2>
          <p className="text-gray-600 mb-4">即将推出...</p>
        </div>

        {/* 视频剪辑工具 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">视频剪辑</h2>
          <p className="text-gray-600 mb-4">即将推出...</p>
        </div>
      </div>
    </div>
  )
} 