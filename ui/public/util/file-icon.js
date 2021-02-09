
const path = require('path')

const fileIcons = {
  // 图片
  '.jpg': 'mdi-file-image',
  '.png': 'mdi-file-image',
  '.bmp': 'mdi-file-image',
  '.ico': 'mdi-file-image',
  // 应用
  '.exe': 'mdi-application',
  '.msi': 'mdi-application',
  '.apk': 'mdi-android',
  '.dmg': 'mdi-apple',
  '.jar': 'mdi-language-java',
  // 压缩文件
  '.zip': 'mdi-folder-zip',
  '.rar': 'mdi-folder-zip',
  '.7z': 'mdi-folder-zip',
  '.gz': 'mdi-folder-zip',
  '.bz': 'mdi-folder-zip',
  '.iso': 'mdi-disc',
  // 文档
  '.doc': 'mdi-file-word',
  '.docx': 'mdi-file-word',
  '.wps': 'mdi-file-word',
  '.xls': 'mdi-file-excel',
  '.xlsx': 'mdi-file-excel',
  '.pdf': 'mdi-file-pdf',
  '.ppt': 'mdi-file-powerpoint',
  '.pptx': 'mdi-file-powerpoint',
  '.epub': 'mdi-library',
  '.chm': 'mdi-library',
  '.txt': 'mdi-format-text',
  // 开发语言
  '.html': 'mdi-language-html5',
  '.js': 'mdi-language-javascript',
  '.css': 'mdi-file-code',
  '.java': 'mdi-language-java',
  '.c': 'mdi-language-c',
  '.h': 'mdi-language-c',
  '.cpp': 'mdi-language-cpp',
  '.cs': 'mdi-language-csharp',
  '.md': 'mdi-language-markdown',
  '.php': 'mdi-language-php',
  '.py': 'mdi-language-python',
  '.rb': 'mdi-language-ruby',
  '.ts': 'mdi-language-typescript',
  '.xml': 'mdi-xml',
  '.json': 'mdi-code-json',
  // 音乐
  '.mp3': 'mdi-file-music',
  '.flac': 'mdi-file-music',
  '.wav': 'mdi-file-music',
  // 视频
  '.mp4': 'mdi-film',
  '.avi': 'mdi-film',
  '.wmv': 'mdi-film',
  '.asf': 'mdi-film',
  '.3gp': 'mdi-film',
  '.mpg': 'mdi-film',
  '.mpeg': 'mdi-film',
  '.mov': 'mdi-film',
  '.m4v': 'mdi-film',
  '.mkv': 'mdi-film',
  '.flv': 'mdi-film'
}
const defaultFileIcon = 'mdi-file'
module.exports = {
  getIconForFileExtension (fileExtension) {
    if (fileExtension === '' || fileExtension === undefined) {
      return defaultFileIcon
    }
    const icon = fileIcons[fileExtension]
    if (icon === undefined) {
      return defaultFileIcon
    }
    return icon
  },
  getIconForFileName (fileName) {
    if (fileName === '' || fileName === undefined) {
      return defaultFileIcon
    }
    const extensionName = path.extname(fileName)
    return this.getIconForFileExtension(extensionName)
  }
}
