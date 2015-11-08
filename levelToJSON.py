#!/usr/bin/python2
import os,sys
import json
import PIL.Image as Image

def main():
    img = Image.open(sys.argv[1])
    w = img.size[0]
    h = img.size[1]

    print "var walls = ["

    for i in range(h):
        row = []
        for j in range(w):
            pix = img.getdata()[i*w + j]
            if pix[0] < 128:
                row.append(False)
            else:
                row.append(True)
        if i < h - 1:
            print json.dumps(row) + ","
        else:
            print json.dumps(row)
            
    print "];"

main()