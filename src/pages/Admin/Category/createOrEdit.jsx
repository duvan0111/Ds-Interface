import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import {
    ArrowRightOutlined
} from "@ant-design/icons";
import { UTILS_APP } from "../../../services/localstorageService";
import userService from "../../../services/userService";
import notificationService from "../../../services/notificationService";
import categoryService from "../../../services/categoryService";

const { TextArea } = Input

function CreateOrEditUser({isModalOpen, onCancel, setData, oldData, editData}) {
    const [form] = Form.useForm()
    const [loader, setLoader] = useState(false);


    const onFinish = (values) => {        
        const data = {
            ...values,
            // role : 'editeur'
        }

        setLoader(true);

        if(Object.keys(editData).length === 0){
            categoryService.postCategory(data)
            .then((res) => {
                notificationService.messageSuccess("Editeur ajouté avec succès ")
                setData([...oldData, res.data])
                onCancel()
                form.resetFields();
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
        else{
            categoryService.updateCategory(editData._id, data)
            .then((res) => {
                notificationService.messageSuccess("Editeur modifié avec succès");
                const newData = oldData.filter((elt) => elt._id !== editData._id)
                setData([...newData, res.data])
                onCancel()
                form.resetFields();
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
        
    }
    
    return (
        <Modal title={Object.keys(editData).length === 0? "Enregister" : "Modifier"} open={isModalOpen} onCancel={() => onCancel()} footer={null} width={UTILS_APP.MODAL_DEFAULT_SIZE}>
            <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                initialValues={{
                    name:editData.name,
                    description: editData.description
                }}
            >
                <Form.Item
                    name="name"
                    label="Nom "
                    className={'mb-2'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Entrer le nom " className={'rounded-lg'}/>
                </Form.Item>
                <Form.Item 
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your description !',
                            // type: 'email'
                        },
                        ]}
                    >
                        <TextArea rows={5} placeholder="Entrer la description"/>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-between">
                        <Button htmlType="button" onClick={() => onCancel()}
                                className="mr-2 px-4 font-semibold border-[#F5F6F7] text-black bg-[#F5F6F7]">
                            Annuler
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-sky-600"
                            loading={loader}
                        >
                            {Object.keys(editData).length === 0? "Enregister" : "Modifier"}
                            <ArrowRightOutlined className={'align-middle'}/>
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateOrEditUser