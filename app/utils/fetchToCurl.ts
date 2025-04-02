interface RequestOptions extends RequestInit {
  url: string;
}

export function fetchToCurl(options: RequestOptions): string {
  const {
    method = 'GET',
    headers = {},
    body,
    url,
  } = options;

  // 开始构建 curl 命令
  let curlCommand = `curl '${url}'`;

  // 添加请求方法
  if (method !== 'GET') {
    curlCommand += ` -X ${method}`;
  }

  // 添加请求头
  Object.entries(headers).forEach(([key, value]) => {
    curlCommand += ` \\\n  -H '${key}: ${value}'`;
  });

  // 添加请求体
  if (body) {
    let bodyStr = '';
    if (typeof body === 'string') {
      bodyStr = body;
    } else if (body instanceof URLSearchParams) {
      bodyStr = body.toString();
    } else if (body instanceof FormData) {
      const formDataObj: Record<string, string> = {};
      body.forEach((value, key) => {
        formDataObj[key] = value.toString();
      });
      bodyStr = JSON.stringify(formDataObj);
    } else if (body instanceof Blob) {
      bodyStr = '[Blob data]';
    } else {
      bodyStr = JSON.stringify(body);
    }
    curlCommand += ` \\\n  -d '${bodyStr}'`;
  }

  return curlCommand;
} 