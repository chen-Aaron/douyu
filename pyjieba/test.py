# encoding=utf-8
import jieba.posseg as pseg
words = pseg.cut("今天还播吗 有人知道不")

for word,flag in words:
    print('%s, %s' %(word, flag))