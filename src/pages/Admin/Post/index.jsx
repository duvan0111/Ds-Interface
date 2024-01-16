import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
  CheckOutlined, 
  CloseOutlined
} from "@ant-design/icons";
import { Button, Space, Switch, Table, Tag } from 'antd';
import userService from '../../../services/userService';
// import CreateOrEditUser from './createOrEdit';
import notificationService from '../../../services/notificationService';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import postService from '../../../services/postService';
import localstorageService, { UTILS_APP } from '../../../services/localstorageService';
import { GESTION_COLOR_TAG } from '../../../utils';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function PostAdmin() {
  const [data, setData]= useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()


  const getPosts = () => {
    setLoading(true);
    postService.getPosts()
      .then((res) => {
        const newData = res.data.filter((elt) => elt.status !== "EN COURS")
        setData(newData)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false))
  }

  const getUserPost = (id) => {
    setLoading(true);
    userService.getUserPost(id)
      .then((res) => {
        const tab = res.data.map((item) => {
          return item.post
        })
        setData(tab)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false))
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

  const IsPublished = (id, isIt) => {
    const data = {
      status: isIt ? "PUBLIER" : "TERMINER"
    }

    setLoader(true);

    postService.updatePost(id, data)
    .then((res) => {
      console.log(res);
      // const newData = data.filter((elt) => elt._id !== id)
      // setData([...newData, res.data])
      notificationService.messageSuccess("effectué");
    })
    .catch((err) => {
      try {
        notificationService.notifyError(err.response.data.message);
      } catch (error) {
        notificationService.notifyError("Une erreur s'est produite");
      }
    })
    .finally(() => {
      setLoader(false);
    });
  }

  useEffect(() => {
    const user = localstorageService.get(UTILS_APP.USER)
    setUser(user)
    user?.role == UTILS_APP.ROLES.ADMIN ? getPosts() : getUserPost(user._id)
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
    user?.role == UTILS_APP.ROLES.ADMIN ? (
      {
        title: 'Publier',
        render: (_, record) => (
          <Space direction="vertical">
            <Switch 
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              loading={loader}
              defaultChecked = { record.status == "PUBLIER" }
              // { record.status == "PUBLIER" ? defaultChecked : null}// defaultChecked
              // checked = { record.status == "PUBLIER" }
              onChange={(item) => {
                IsPublished(record._id, item)
              }}
            />
          </Space>
        )
      }) : (
        {
          title: 'status',
          dataIndex: 'status',
          render: (text) => (
            <>
              {/* {text == 'EN COURS' ? <Tag color='geekblue' key={text}>{text.toLowerCase()}</Tag>: <Tag color='green' key={text}>{text.toLowerCase()}</Tag>} */}
              <Tag color={GESTION_COLOR_TAG[text]} key={text}>{text.toLowerCase()}</Tag>
            </>
          )
        }
    ),
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
          {user?.role != UTILS_APP.ROLES.ADMIN ? (
             <>
                <Button
                  type={"text"}
                  onClick={() => navigate(`/admin/post/edit/${record._id}`, { state : {post : record }})}
                  icon={<EditOutlined />}
                />
                <DeleteConfirmation onConfirm={deleteUser} record={record}/>
             </>
              
          ) : null}
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