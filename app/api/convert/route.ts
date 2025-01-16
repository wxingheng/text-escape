import { NextRequest, NextResponse } from 'next/server';

// 递归处理 JSON 的函数
const deepParseJSON = (text: string | object): any => {
  if (typeof text !== 'string') return text;
  
  try {
    const parsed = JSON.parse(text);
    
    if (typeof parsed === 'object' && parsed !== null) {
      Object.keys(parsed).forEach(key => {
        if (typeof parsed[key] === 'string') {
          try {
            parsed[key] = deepParseJSON(parsed[key]);
          } catch (e) {
            // 如果解析失败，保持原值
          }
        }
      });
    }
    return parsed;
  } catch (e) {
    return text;
  }
};

// 转换函数
const convertText = (text: string, mode: 'escape' | 'unescape' | 'jsonParse' | 'jsonStringify') => {
  try {
    switch (mode) {
      case 'escape':
        return text.replace(/\n/g, '\\n').replace(/"/g, '\\"');
      case 'unescape':
        return text.replace(/\\n/g, '\n').replace(/\\"/g, '"');
      case 'jsonParse':
        return JSON.stringify(deepParseJSON(text), null, 2);
      case 'jsonStringify':
        return JSON.stringify(deepParseJSON(text));
      default:
        return text;
    }
  } catch (error) {
    throw new Error(`转换错误: ${(error as Error).message}`);
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, mode } = body;

    // 参数验证
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: '缺少必要的 text 参数或格式不正确' },
        { status: 400 }
      );
    }

    if (!mode || !['escape', 'unescape', 'jsonParse', 'jsonStringify'].includes(mode)) {
      return NextResponse.json(
        { error: '缺少必要的 mode 参数或格式不正确' },
        { status: 400 }
      );
    }

    // 执行转换
    const result = convertText(text, mode);

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 