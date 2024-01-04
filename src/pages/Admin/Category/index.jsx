import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Table } from 'antd';
import userService from '../../../services/userService';
import CreateOrEditUser from './createOrEdit';
import notificationService from '../../../services/notificationService';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import categoryService from '../../../services/categoryService';


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


function Category() {
  const [data, setData]= useState([])
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (data) => {
    data ? setEditData(data) : setEditData({})
    setIsModalOpen(true);
  };
  
  const onCancel = () => {
    setIsModalOpen(false)
  };

  const getCategories = () => {
    setLoading(true);
    categoryService.getCategories()
      .then((res) => {
        console.log(res);
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false))
  }

  const deleteUser = (item) => {
    categoryService.deleteCategory(item._id)
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
    getCategories()
  }, [])
  

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex">
          {/* <Button
            type={"text"}
            // onClick={() => toggleModal(record)}
            icon={<EyeOutlined />}
          /> */}
          
          <Button
            type={"text"}
            onClick={() => showModal(record)}
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
                onClick={() => showModal()}
            >
                Ajouter
            </Button>
          </div>
          <Table columns={columns} dataSource={data} onChange={onChange} loading={loading}/>;
          {
            isModalOpen && 
            (<CreateOrEditUser 
              isModalOpen={isModalOpen} 
              onCancel = {onCancel} 
              setData={setData}
              oldData = {data}
              editData={editData}
              />)
          }
        </>
    );
} 


export default Category