const path=require("path"),fileIcons={".jpg":"mdi-file-image",".png":"mdi-file-image",".bmp":"mdi-file-image",".ico":"mdi-file-image",".exe":"mdi-application",".msi":"mdi-application",".apk":"mdi-android",".dmg":"mdi-apple",".jar":"mdi-language-java",".zip":"mdi-folder-zip",".rar":"mdi-folder-zip",".7z":"mdi-folder-zip",".gz":"mdi-folder-zip",".bz":"mdi-folder-zip",".iso":"mdi-disc",".doc":"mdi-file-word",".docx":"mdi-file-word",".wps":"mdi-file-word",".xls":"mdi-file-excel",".xlsx":"mdi-file-excel",".pdf":"mdi-file-pdf",".ppt":"mdi-file-powerpoint",".pptx":"mdi-file-powerpoint",".epub":"mdi-library",".chm":"mdi-library",".txt":"mdi-format-text",".html":"mdi-language-html5",".js":"mdi-language-javascript",".css":"mdi-file-code",".java":"mdi-language-java",".c":"mdi-language-c",".h":"mdi-language-c",".cpp":"mdi-language-cpp",".cs":"mdi-language-csharp",".md":"mdi-language-markdown",".php":"mdi-language-php",".py":"mdi-language-python",".rb":"mdi-language-ruby",".ts":"mdi-language-typescript",".xml":"mdi-xml",".json":"mdi-code-json",".mp3":"mdi-file-music",".flac":"mdi-file-music",".wav":"mdi-file-music",".mp4":"mdi-film",".avi":"mdi-film",".wmv":"mdi-film",".asf":"mdi-film",".3gp":"mdi-film",".mpg":"mdi-film",".mpeg":"mdi-film",".mov":"mdi-film",".m4v":"mdi-film",".mkv":"mdi-film",".flv":"mdi-film"},defaultFileIcon="mdi-file";module.exports={getIconForFileExtension(i){if(""===i||void 0===i)return"mdi-file";const m=fileIcons[i];return void 0===m?"mdi-file":m},getIconForFileName(i){if(""===i||void 0===i)return"mdi-file";const m=path.extname(i);return this.getIconForFileExtension(m)}};