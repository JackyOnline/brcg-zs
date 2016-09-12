
 DROP TABLE IF EXISTS `gbl_value_mapping`;
 CREATE TABLE `gbl_value_mapping`
 (
    `busi_type`                                  varchar(3)           NOT NULL,
    `tab_name`                                   varchar(32)          NOT NULL,
    `field_name`                                 varchar(32)          NOT NULL,
    `descrip`                                    varchar(64)          NOT NULL,
    `key_id`                                     varchar(2)           NOT NULL,
    `key_val_cn`                                 varchar(32)          NOT NULL,
    `key_val_en`                                 varchar(32)          NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_gbl_value_mapping` PRIMARY KEY (`busi_type`, `key_id`)
 ); 
 

 DROP TABLE IF EXISTS `gbl_status`;
 CREATE TABLE `gbl_status`
 (
    `status_type`                                varchar(3)           NOT NULL,
    `descrip`                                    varchar(64)          NOT NULL,
    `key_id`                                     varchar(2)           NOT NULL,
    `key_val_cn`                                 varchar(32)          NOT NULL,
    `key_val_en`                                 varchar(32)          NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_gbl_status` PRIMARY KEY (`status_type`, `key_id`)
 ); 
 

 DROP TABLE IF EXISTS `account`;
 CREATE TABLE `account`
 (
    `_id`                                        varchar(64)          NOT NULL,
    `mobile`                                     varchar(32)          NULL,
    `password`                                   varchar(32)          NOT NULL,
    `username`                                   varchar(32)          NULL,
    `status`                                     varchar(2)           NULL,
    `acwsType`                                   varchar(2)           NULL,
    `regTime`                                    varchar(32)          NULL,
    `regIp`                                      varchar(32)          NULL,
    `thisLoginTime`                              varchar(32)          NULL,
    `thisLoginIp`                                varchar(32)          NULL,
    `lastLoginTime`                              varchar(32)          NULL,
    `lastLoginIp`                                varchar(32)          NULL,
    `spare1`                                     varchar(32)          NULL,
    `spare2`                                     varchar(32)          NULL,
    CONSTRAINT `PK_account` PRIMARY KEY (`_id`)
 );


 DROP TABLE IF EXISTS `lz_user_info`;
 CREATE TABLE `lz_user_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_name`                                  varchar(128)         NULL,
    `mobile`                                     varchar(32)          NULL,
    `image_url`                                  varchar(32)          NULL,
    `user_sex`                                   varchar(2)           NULL,
    `user_text`                                  varchar(256)         NULL,
    `login_status`                               varchar(2)           NULL,
    `login_longitude`                            varchar(128)         NULL,
    `login_latitude`                             varchar(128)         NULL,
    `code_image`                                 varchar(32)          NULL,
    `code_url`                                   varchar(32)          NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_user_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_user_login_info`;
 CREATE TABLE `lz_user_login_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `login_longitude`                            varchar(128)         NULL,
    `login_latitude`                             varchar(128)         NULL,
    `login_time`                                 datetime             NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_user_login_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_honour_info`;
 CREATE TABLE `lz_honour_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `honour_content`                             varchar(512)         NOT NULL,
    `honour_title`                               varchar(128)         NULL,
    `honour_url`                                 varchar(128)         NULL,
    `admire_quantity`                            integer              NULL,
    `evaluate_quantity`                          integer              NULL,
    `release_time`                               datetime             NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_honour_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_user_friend_info`;
 CREATE TABLE `lz_user_friend_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_a_id`                                  varchar(64)          NOT NULL,
    `user_b_id`                                  varchar(64)          NOT NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_user_friend_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_user_follow_info`;
 CREATE TABLE `lz_user_follow_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `follow_user_id`                             varchar(64)          NOT NULL,
    `follow_time`                                datetime             NOT NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_user_follow_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_user_notice_info`;
 CREATE TABLE `lz_user_notice_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `notice_type`                                varchar(2)           NOT NULL,
    `notice_user_id`                             varchar(64)          NOT NULL,
    `notice_content`                             varchar(256)         NULL,
    `operat_status`                              varchar(2)           NULL,
    `read_status`                                varchar(2)           NULL,
    `notice_time`                                datetime             NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_user_notice_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_user_blacklist_info`;
 CREATE TABLE `lz_user_blacklist_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `black_user_id`                              varchar(64)          NOT NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_user_blacklist_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_chat_info`;
 CREATE TABLE `lz_chat_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_a_id`                                  varchar(64)          NOT NULL,
    `user_b_id`                                  varchar(64)          NOT NULL,
    `chat_type`                                  varchar(2)           NOT NULL,
    `text_content`                               varchar(512)         NULL,
    `image_content`                              varchar(512)         NULL,
    `voice_content`                              varchar(512)         NULL,
    `send_time`                                  datetime             NOT NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_chat_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_honour_operate_info`;
 CREATE TABLE `lz_honour_operate_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `honour_id`                                  varchar(64)          NOT NULL,
    `operat_type`                                varchar(2)           NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `usered_id`                                  varchar(64)          NOT NULL,
    `operat_content`                             varchar(512)         NOT NULL,
    `release_time`                               datetime             NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_honour_operate_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_honour_attach_info`;
 CREATE TABLE `lz_honour_attach_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `honour_id`                                  varchar(64)          NOT NULL,
    `link_url`                                   varchar(128)         NOT NULL,
    `file_size`                                  integer              NULL,
    `file_ext`                                   varchar(12)          NULL,
    `upload_time`                                datetime             NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_honour_attach_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `lz_report_info`;
 CREATE TABLE `lz_report_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `user_id`                                    varchar(64)          NOT NULL,
    `report_type`                                varchar(2)           NOT NULL,
    `reported_user_id`                           varchar(64)          NULL,
    `honour_id`                                  varchar(64)          NULL,
    `report_reason`                              varchar(512)         NOT NULL,
    `link_url_one`                               varchar(128)         NOT NULL,
    `link_url_two`                               varchar(128)         NOT NULL,
    `link_url_three`                             varchar(128)         NOT NULL,
    `report_time`                                datetime             NOT NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_lz_report_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `op_keyword_info`;
 CREATE TABLE `op_keyword_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `keyword`                                    varchar(32)          NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_op_keyword_info` PRIMARY KEY (`seq_no`)
 );


 DROP TABLE IF EXISTS `op_map_info`;
 CREATE TABLE `op_map_info`
 (
    `seq_no`                                     varchar(64)          NOT NULL,
    `display_level`                              integer              NOT NULL,
    `map_range`                                  integer              NULL,
    `shownum`                                    integer              NULL,
    `display_status`                             varchar(2)           NOT NULL,
    `remarks`                                    varchar(256)         NULL,
    `source`                                     integer  default 0   NULL,
    `num1`                                       integer  default 0   NULL,
    `num2`                                       integer  default 0   NULL,
    `str1`                                       varchar(64)          NULL,
    `str2`                                       varchar(64)          NULL,
    `date1`                                      datetime             NULL,
    `date2`                                      datetime             NULL,
    `domain_no`                                  integer              NULL,
    `operator_id`                                varchar(32)          NULL,
    `operator_name`                              varchar(64)          NULL,
    `operat_time`                                datetime             NULL,
    `modifier_id`                                varchar(32)          NULL,
    `modifier_name`                              varchar(64)          NULL,
    `modifi_time`                                datetime             NULL,
    `data_status`                                varchar(2)           NULL,
    CONSTRAINT `PK_op_map_info` PRIMARY KEY (`seq_no`, `display_status`)
 ); 
 

