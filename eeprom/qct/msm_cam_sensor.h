#define MAX_SENSOR_NAME 32



struct eeprom_read_t {
	uint8_t *dbuffer;
	uint32_t num_bytes;
};

struct eeprom_write_t {
	uint8_t *dbuffer;
	uint32_t num_bytes;
};

struct eeprom_get_t {
	uint32_t num_bytes;
};
enum eeprom_cfg_type_t {
	CFG_EEPROM_GET_INFO,
	CFG_EEPROM_GET_CAL_DATA,
	CFG_EEPROM_READ_CAL_DATA,
	CFG_EEPROM_WRITE_DATA,
	CFG_EEPROM_GET_MM_INFO,
};


struct eeprom_get_cmm_t {
	uint32_t cmm_support;
	uint32_t cmm_compression;
	uint32_t cmm_size;
};


struct msm_eeprom_cfg_data {
	enum eeprom_cfg_type_t cfgtype;
	uint8_t is_supported;
	union {
		char eeprom_name[MAX_SENSOR_NAME];
		struct eeprom_get_t get_data;
		struct eeprom_read_t read_data;
		struct eeprom_write_t write_data;
		struct eeprom_get_cmm_t get_cmm_data;
	} cfg;
};




#define BASE_VIDIOC_PRIVATE	192
#define VIDIOC_MSM_EEPROM_CFG \
	_IOWR('V', BASE_VIDIOC_PRIVATE + 8, struct msm_eeprom_cfg_data)




