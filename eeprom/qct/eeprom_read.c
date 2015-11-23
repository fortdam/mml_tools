#include <stdio.h>
#include <string.h>
#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <sys/cdefs.h>
#include <sys/types.h>
#include <ctype.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <errno.h>
#include <asm/ioctl.h>
#include <unistd.h>
#include "msm_cam_sensor.h"
#include "msm_camsensor_sdk.h"

#include <malloc.h>



#define V4L2_EEPROM_SUBDEV "/dev/v4l-subdev9"
#define MAX_LEN 164

#define MAX_STR_LEN 30


#if 1

static int32_t eeprom_get_info(int fd)
{
  int32_t rc = 0;
 
  struct msm_eeprom_cfg_data cfg;
  
  uint8_t *buffer = NULL;

  int wfd = 0;
  int offset = 0;
  int i = 0;
  char *wbuf = malloc(MAX_STR_LEN);
  cfg.cfgtype = CFG_EEPROM_GET_INFO;
  cfg.is_supported = 0;
  rc = ioctl(fd, VIDIOC_MSM_EEPROM_CFG, &cfg);
  if (rc < 0) {
    printf("VIDIOC_MSM_EEPROM_CFG(%d) failed!", fd);
    return rc;
  }

    cfg.cfgtype = CFG_EEPROM_GET_CAL_DATA;
    rc = ioctl(fd, VIDIOC_MSM_EEPROM_CFG, &cfg);
    if (rc < 0) {
      printf("VIDIOC_MSM_EEPROM_CFG(%d) failed!", fd);
      goto ERROR;
    }
    printf("kernel returned num_bytes =%d\n", cfg.cfg.get_data.num_bytes);

    if (cfg.cfg.get_data.num_bytes) {
      buffer = (uint8_t *)malloc(cfg.cfg.get_data.num_bytes);
      if (!buffer) {
        printf("%s failed allocating memory\n",__func__);
        rc = -ENOMEM;
        goto ERROR;
      }

      cfg.cfgtype = CFG_EEPROM_READ_CAL_DATA;
      cfg.cfg.read_data.num_bytes = cfg.cfg.get_data.num_bytes;
      cfg.cfg.read_data.dbuffer = buffer;
      rc = ioctl(fd, VIDIOC_MSM_EEPROM_CFG, &cfg);
      if (rc < 0) {
        printf("CFG_EEPROM_READ_CAL_DATA(%d) failed!", fd);
        goto ERROR;
      }
      wfd = open("/cache/eeprom_data",O_RDWR|O_CREAT|O_TRUNC);
      if(wfd == -1){
      	printf("FAIL open /cache/eeprom_data failed\n");
      }
      for(i = 0;i < cfg.cfg.read_data.num_bytes; i++)
      {
	#if 1
	memset(wbuf,0,MAX_STR_LEN);
	sprintf(wbuf,"0x%x = 0x%x; ",i,buffer[i]);
	//printf("wbuf = %s\n",wbuf);
	write(wfd,wbuf,strlen(wbuf));
	offset += strlen(wbuf);
	memset(wbuf,0,MAX_STR_LEN);
       #else
	//printf("cfg.cfg.read_data.num_bytes  = 0x%x, cfg.cfg.get_data.num_bytes 0x%x\n",cfg.cfg.read_data.num_bytes, cfg.cfg.get_data.num_bytes);
	printf("i = 0x%x, buffer = 0x%x ", i, buffer[i]);
	#endif
		
      }
    }
  if(wbuf)
	free(wbuf);
  close(wfd);
  return 0;

ERROR:
  
  if (buffer)
    free(buffer);
  return rc;
}


#endif
















static int eeprom_open(const char * PATH)
{
    int fd = open(PATH, O_RDWR);
    if(fd == -1){
        printf("FAIL open %s failed\n", PATH);
        return -1;
    }
    printf("function %s open OK\n", PATH);
      
    return fd; 
}

#if 0
static int eeprom_write(int fd, const char* buf)
{
	int count = 0;
	int i = 0;
	count = strlen(buf);
	printf("xmhu write buf = %d\n", count);
	while(i < count)
	{
		write(fd, buf + i, 1);
		i ++;
	}
	return count;
}


static int eeprom_read(int fd, void * buf)
{
	int count = 0;
	printf("xmhu read\n");
	while(read(fd, buf + count,1))
	{
		printf("xmhu read buf = %c\n",((char *)buf)[count]);
		count++;
	}	
	return count;
}
#endif


int main(int argc, char ** argv)
{	
	int fd;
	//char wbuf[100] = "0123456789abcdefg";
	char rbuf[100] = {0};
	int i = 0;
	char * buf = NULL;
	printf("argc = %d \n",argc);
	for(i = 0;i < argc -1 ;i++)
        {
		printf("argv[%d] = %s, ", i+1,argv[i+1]);
	}
	printf("\n");
	printf("eeprom read start\n");
	fd = eeprom_open(V4L2_EEPROM_SUBDEV);
	//eeprom_read(fd, rbuf);
	eeprom_get_info(fd);
	close(fd);
	return 0;
}
