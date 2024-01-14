import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Table, Tag } from 'antd';
import userService from '../../../services/userService';
// import CreateOrEditUser from './createOrEdit';
import notificationService from '../../../services/notificationService';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import postService from '../../../services/postService';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function PostAdmin() {
  const [data, setData]= useState([])
  const [loading, setLoading] = useState(false);
  const [postUser, setPostUser] = useState([])
  const navigate = useNavigate()


  const getPosts = () => {
    setLoading(true);
    postService.getPosts()
      .then((res) => {
        console.log(res);
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false))
  }

  const getPostUsers = (id) => {
    setLoading(true);
    postService.getPostUsers(id)
      .then((res) => {
        console.log(res.data);
        setPostUser(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false))
    
    return postUser
  }

  const deleteUser = (item) => {
    postService.deletePost(item._id)
      .then((res) => {
        const newData = data.filter((elt) => elt._id !== item._id);
        setData(newData);
        notificationService.messageSuccess("suppression effectuer")
      })
      .catch((err) => {
        try { 
          notificationService.notifyError(err.data.message);
        } catch (error) {
          notificationService.notifyError("Une erreur est survenue");
        }
      });
  }

  useEffect(() => {
    getPosts()
  }, [])
  

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className='font-bold'>{text}</span>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'resume',
      dataIndex: 'resume',
      key: 'resume'
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          {text == 'EN COURS' ? <Tag color='geekblue' key={text}>{text.toLowerCase()}</Tag>: <Tag color='green' key={text}>{text.toLowerCase()}</Tag>}
        </>
      )
    },
    {
      title: 'Auteur(s)',
      render: (_, record) => (
        <div>
          {record.users.map((item) => {
            return <span >{`${item.name}, `}</span>
          })}
        </div>
      )
      
    },
    {
      title: 'Categories',
      render: (_, record) => (
        record.category[0].name
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex">
          <Button
            type={"text"}
            onClick={() => navigate(`/post/${record._id}`, { state : {post : record }})}
            icon={<EyeOutlined />}
          />
          
          <Button
            type={"text"}
            onClick={() => navigate(`/admin/post/edit/${record._id}`, { state : {post : record }})}
            icon={<EditOutlined />}
          />
          
          <DeleteConfirmation onConfirm={deleteUser} record={record}/>
        </div>
        )
    }
  ];

    return (
      <>
      <div className={'flex justify-end'}>
        <Button
            className={'bg-sky-600 mb-5'}
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => navigate('/admin/post/new')}
        >
            Ajouter
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        onChange={onChange} 
        loading={loading}
        className='overflow-x-auto'
      />;
      
    </>
    );
} 


export default PostAdmin