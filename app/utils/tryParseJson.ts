export function tryParseJson(str: string): string {
    let result = str;
    try {
      result = JSON.parse(str);
    } catch {
      try {
        const start = str.indexOf("```json\n");
        const end = str.lastIndexOf("\n```");
        if (start !== -1 && end !== -1) {
          result = JSON.parse(str.substring(start + 8, end));
        }
      } catch (err) {
        console.warn("tryParseJson error", err);
      }
    }
    return typeof result === "string" ? result : JSON.stringify(result, null, 2);
  }