import React from 'react'
import {Button, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

function DeleteConfirmation(props) {
    const {label, content, onConfirm, record, title='Confirmation de suppression', description='Êtes-vous sûr de vouloir supprimer cet élément ?'} = props


    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={()=>onConfirm(record)}
            okText={'Oui'}
            cancelText="Non"
            okType={'danger'}
        >
            {content ? content : <Button icon={<DeleteOutlined className={'text-red-600'}/>}  type={'text'}/>} {label}
        </Popconfirm>
    )
}

DeleteConfirmation.prototype = {
    onConfirm: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
}
export default DeleteConfirmation
