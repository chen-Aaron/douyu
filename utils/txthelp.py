# -*- coding:utf-8*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import os
import os.path
import time



##########################合并同一个文件夹下多个txt################
def MergeTxt(filepath,outfile):
    k = open(filepath+outfile, 'a+')
    for parent, dirnames, filenames in os.walk(filepath):
        for filepath in filenames:
            txtPath = os.path.join(parent, filepath)  # txtpath就是所有文件夹的路径
            f = open(txtPath)
            ##########换行写入##################
            k.write(f.read()+"\n")

    k.close()

    print "finished"

__all__ = common.packet(__name__)

if __name__ == '__main__':
    filepath="../libs/"
    outfile="result.txt"
    MergeTxt(filepath,outfile)
    time2 = time.time()
    print u'总共耗时：' + str(time2 - time1) + 's'