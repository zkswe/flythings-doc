#/bin/python3
import sys
import os

for md in os.listdir('.'):
    if not md.endswith('.md'):
        continue
    os.system("sed -i \'s/C++/c++/g\' %s" % md)
