# encoding=utf-8
import jieba

import codecs

jieba.load_userdict('./dict/yyf.txt')

def readFile(filename):
    content = ""
    try:
        fo = codecs.open(filename, "r", "utf-8")
        
        print "读取文件名:", filename
        
        for line in fo.readlines():
            content += line.strip()
            print "字数", len(content)
        
    except IOError as e:
        print "文件不存在或者文件读取失败"
        return ""
    else:
        fo.close()
        return content

#@see 写入文件内容 (数组会使用writelines进行写入)
#@params toFile文件名
#   content 内容
def writeFile(toFile, content):
    try:
        fo = codecs.open(toFile, "wb", "utf-8")
        print "文件名", toFile

        if type(content) == type([]):
            fo.writelines(content+',')
        else:
            fo.write(content)
    except IOError:
        print "没有找到文件或文件读取失败"
    else:
        print "文件写入成功"
        fo.close();


# 读取源文件（sourceFile）内容
rawContent = readFile('./test/test.txt')
# 结巴分词
seg_list = jieba.cut(rawContent, cut_all=False)
# 把分词结果写到目标文件（targetFile）中，这里是用空格分割，也可以改成其他符号
writeFile('./test/cut.txt', " ".join(seg_list))
    