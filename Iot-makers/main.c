// "main.c" iot makers 플랫폼 연동위한 'tt'실행파일 만들기위한 대표 소스코드//
// 1. IoT Makers 플랫폼 연동 및 플랫폼으로 터치센서 이벤트 값 전송

#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <signal.h>
#include "iotmakers.h"

#define TC1 4  // BCM_GPIO 23
#define MAXTIMINGS 85

static int local_loop = (0);

static void SigHandler(int sig)
{
	switch(sig)
	{+++++++++++++++++++																																+ 
		case SIGINT :
			printf("accept signal SIGINT[%d]\n", sig);
			im_stop_service();
			local_loop = (0);
			break;
		default :
			;
	};
	return;
} 

static void set_SigHandler()
{
	signal(SIGINT,   SigHandler);	
	signal(SIGTERM,  SigHandler);	
}

static void mycb_numdata_handler(char *tagid, double numval)
{
	// !!! USER CODE HERE
	printf("tagid=[%s], val=[%f]\n", tagid, numval);
}

int main()
{
	int i;
	int rc;

	set_SigHandler();

	printf("im_init()\n");
	rc = im_init_with_config_file("./config.txt");
	if ( rc < 0  )	{
		printf("fail im_init()\n");
		return -1;
	}

	im_set_loglevel(LOG_LEVEL_DEBUG);
	im_set_numdata_handler(mycb_numdata_handler);
	im_set_strdata_handler(mycb_strdata_handler);

	printf("im_start_service()...\n");
	rc = im_start_service();
	if ( rc < 0  )	{
		printf("fail im_start_service()\n");
		return -1;
	}

    // Raspberry pi wiringPiSetup...
	
	if(wiringPiSetup() == -1) exit(1);

	local_loop = (1);
	while(local_loop == (1)) 
	{
		delay(1000);
		
		// TC value send ...
		// 터치센서 값 플랫폼 전송
		pinMode(TC1, INPUT);  
		if(digitalRead(TC1)==0)
		{
			// printf("Not Detect !!\n");
			im_send_numdata("Touch", 0, 0);  
		}
		else
		{
			printf("Detected !!\n");
			im_send_numdata("Touch", 1, 0);  
		}
	}

	printf("im_stop_service()\n");
	im_stop_service();

	printf("im_release()\n");
	im_release();

	return 0;
}
