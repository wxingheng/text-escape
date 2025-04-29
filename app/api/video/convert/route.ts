import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const outputFormat = formData.get('format') as string

    if (!file) {
      return NextResponse.json(
        { error: '未找到文件' },
        { status: 400 }
      )
    }

    // 创建临时文件
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tempInputPath = join('/tmp', file.name)
    const tempOutputPath = join('/tmp', `converted_${Date.now()}.${outputFormat}`)

    await writeFile(tempInputPath, buffer)

    // 使用 ffmpeg 进行转换
    try {
      await execAsync(`ffmpeg -i ${tempInputPath} ${tempOutputPath}`)
      
      // 读取转换后的文件
      const convertedFile = await readFile(tempOutputPath)
      
      // 清理临时文件
      await unlink(tempInputPath)
      await unlink(tempOutputPath)

      return new NextResponse(convertedFile, {
        headers: {
          'Content-Type': `video/${outputFormat}`,
          'Content-Disposition': `attachment; filename="converted.${outputFormat}"`,
        },
      })
    } catch (error) {
      console.error('转换失败:', error)
      return NextResponse.json(
        { error: '视频转换失败' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('处理请求失败:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
} 