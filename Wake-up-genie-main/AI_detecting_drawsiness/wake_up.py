# file_name: wake_up.py
# file_function:
# 1. 눈깜빡임 쓰레드 실행
# 2. 구구단 쓰레드 실행


#========= Import library ===========#
import sys
from threading import Thread
sys.path.append('../GiGA_genie')
print(sys.path)
import call_genie as cg
import detector as det
#===================================#

def main():

	t = Thread(target=cg.main)
	th = Thread(target=det.main)
	t.deamon = True
	th.deamon = True
	t.start()
	th.start()



if __name__ == '__main__':
	main()
