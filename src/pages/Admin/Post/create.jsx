import { Button, Form, Input, Select, Typography } from "antd"
import { useEffect, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import {
    ArrowRightOutlined
} from "@ant-design/icons";
import notificationService from "../../../services/notificationService";
import categoryService from "../../../services/categoryService";
import userService from "../../../services/userService";
import postService from "../../../services/postService";
import { useNavigate } from "react-router-dom";

const { Title } = Typography
const { TextArea } = Input



const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

function CreatePost() {
    const [form] = Form.useForm()
    const [loader, setLoader] = useState(false);
    const editorRef = useRef(null);
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const options = [];
    const navigate = useNavigate()

    const getCategories = () => {
        categoryService.getCategories()
        .then((res) => {
            // console.log(res.data);
            setCategories(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getUsers = () => {
        userService.getUsers()
        .then((res) => {
            setUsers(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getCategories()
        getUsers()
    }, [])

    users.map((item) => {
        options.push({
            label: item.name,
            value: item._id
        })
    })

    const onFinish = (values) => {        
        const data = {
            ...values,
            content : editorRef.current ? editorRef.current.getContent() : null
        }
        console.log(data);

        setLoader(true);
        postService.postPost(data)
        .then((res) => {
            notificationService.messageSuccess("Editeur ajouté avec succès ")
            form.resetFields();
            navigate('/admin/post')
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

    return (
        <>
            <section>
                <Title><span className="text-sky-600">Nouvelle Article</span></Title>

                <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                initialValues={{
                    status: 'EN COURS',
                    // email: editData.email
                }}
            >
                <Form.Item
                    name="title"
                    label={<span className="text-sky-800 font-bold">Titre :</span>}
                    className={'mb-2'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Entrer le titre" className={'rounded-lg'}/>
                </Form.Item>
                    <br />

                <Form.Item 
                    name="resume"
                    label={<span className="text-sky-800 font-bold">Résumé :</span>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your resume !',
                            // type: 'email'
                        },
                        ]}
                    >
                        <TextArea rows={5} placeholder="Entrer le résumé"/>
                </Form.Item>   

                <br />             
                <Form.Item 
                    name='status'
                    label={<span className="text-sky-800 font-bold">Status :</span>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select status  !',
                            // type: 'email'
                        },
                    ]}
                    >
                    

                    <Select 
                        defaultValue={"EN COURS"}
                    >
                        <Select.Option value="EN COURS">EN COURS</Select.Option>
                        <Select.Option value="TERMINER">TERMINER</Select.Option>
                        {/* <Select.Option value="EN COURS">EN COURS</Select.Option> */}
                    </Select>
                </Form.Item>

                <br />         
                <Form.Item 
                    name='category'
                    label={<span className="text-sky-800 font-bold">Catégorie :</span>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select category!',
                            // type: 'email'
                        },
                    ]}
                    >
                    <Select >
                        {
                            categories.map( (item) => {
                               return <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                            })   
                        }
                    </Select>
                </Form.Item>
                
                <br />
                <Form.Item
                    name={'users'}
                    label={<span className="text-sky-700 font-bold">Participants :</span>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your participant !',
                            // type: 'email'
                        },
                    ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            // defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            options={options}
                            />
                    </Form.Item>
                
                <br />
                <Form.Item
                    label={<span className="text-sky-700 font-bold">Contenu :</span>}                    
                >
                <Editor
                    apiKey='tkpf3tvj9pe9bq9qfd4huak7hojg92ks8en2tcgx0nqmimkq'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={"<p>Rediger le contenu de l'article ici !!!</p>"}
                    init={{
                        plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                    }}
                    />
                    {/* <button onClick={log}>Log editor content</button> */}
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-between">
                        {/* <Button htmlType="button" onClick={() => onCancel()}
                                className="mr-2 px-4 font-semibold border-[#F5F6F7] text-black bg-[#F5F6F7]">
                            Annuler
                        </Button> */}
                        
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-sky-600"
                            loading={loader}
                        >
                            Soumettre{/* {Object.keys(editData).length === 0? "Enregister" : "Modifier"} */}
                            <ArrowRightOutlined className={'align-middle'}/>
                        </Button>
                    </div>
                </Form.Item>
            </Form>
            </section>
        </>
    )
}

export default CreatePost