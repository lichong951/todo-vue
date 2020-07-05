create table todo(
 id int(10) not null auto_increment,
 name text default null comment '任务',
 deadline timestamp default null comment '预期时间',
 content text default null comment '文章内容',
 status text default null comment '当前状态',
 createTime timestamp default null comment '发布时间',
 primary key(id)
)engine=InnoDB AUTO_INCREMENT=1 comment '任务表';
