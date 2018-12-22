import React from 'react'

import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  UserCell,
  CommunityCell,
  TagsCell,
  TimeStampCell,
} from '../../components'

import { OperationWrapper } from './styles'
import * as logic from './logic'

/* eslint-disable react/display-name */
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 80,
    fixed: 'left',
  },
  {
    title: '标题',
    width: 300,
    dataIndex: 'title',
    align: 'center',
    fixed: 'left',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: '作者',
    width: 200,
    dataIndex: 'author',
    align: 'center',
    render: author => {
      return <UserCell user={author} />
    },
  },
  {
    title: '社区',
    width: 150,
    dataIndex: 'communities',
    align: 'center',
    render: (communities, record) => {
      return (
        <CommunityCell
          array={communities}
          source={record}
          thread="JOB"
          onDelete={logic.unsetCommunity}
          onAdd={logic.setCommunity}
          withSetter
        />
      )
    },
  },
  {
    title: '标签',
    width: 250,
    dataIndex: 'tags',
    align: 'center',
    render: (tags, record) => (
      <TagsCell
        thread="JOB"
        source={record}
        onDelete={logic.unsetTag}
        onAdd={logic.setTag}
      />
    ),
  },
  {
    title: '浏览',
    width: 100,
    dataIndex: 'views',
    align: 'center',
  },
  {
    title: '评论',
    width: 100,
    dataIndex: 'commentsCount',
    align: 'center',
  },
  /*
     {
     title: '收藏',
     width: 100,
     dataIndex: 'favoritedCount',
     align: 'center',
     },
     {
     title: '点赞',
     width: 100,
     dataIndex: 'starredCount',
     align: 'center',
     },
   */
  {
    title: '时间戳',
    width: 120,
    align: 'center',
    render: (text, record) => <TimeStampCell data={record} />,
  },
  {
    title: '操作',
    width: 200,
    dataIndex: '',
    align: 'center',
    render: (text, record) => {
      return (
        <OperationWrapper>
          <Button
            size="small"
            type="primary"
            ghost
            onClick={logic.onEdit.bind(this, record)}
          >
            编辑
          </Button>
          <Space right="10px" />
          <Button
            size="small"
            type="red"
            ghost
            onClick={logic.onDelete.bind(this, record)}
          >
            删除
          </Button>
        </OperationWrapper>
      )
    },
  },
]

const VideosContent = ({ data, restProps: { communitiesLoading } }) => (
  <React.Fragment>
    {data ? (
      <div>
        <Table
          columns={columns}
          dataSource={data.entries}
          scroll={{ x: 2000 }}
          loading={TableLoading(communitiesLoading)}
          pagination={false}
        />
        <Pagi
          left="-10px"
          pageNumber={data.pageNumber}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
          onChange={logic.loadJobs}
        />
      </div>
    ) : null}
  </React.Fragment>
)

export default VideosContent