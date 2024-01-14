import { useContext, useEffect, useState } from 'react';
import coverPost from '../../../assets/publishing-options.png'
import { isHomeContext } from '../../../utils/context';
import { useLocation, useParams } from 'react-router-dom';
import postService from '../../../services/postService';
import parse from 'html-react-parser';
import { Avatar, Button, Divider, Empty, Form, Input, List , Tooltip} from 'antd';
import profilDefault from "../../../assets/profile-default.png"
import commentService from '../../../services/commentService';
import notificationService from '../../../services/notificationService';
import {
    ArrowRightOutlined
} from "@ant-design/icons";
import { GESTION_IMAGE, GESTION_COLOR_AVATAR } from '../../../utils';

const { TextArea } = Input

function Post() {
    const { id } = useParams()
    const { state : { post }} = useLocation()
    const {setIsHome} = useContext(isHomeContext)
    const [form] = Form.useForm()
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([])

    setIsHome(false)

    const getPost = () => {
        postService.getPost(id)
            .then((res) => {
                // setPost(res.data)
                // console.log(post);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const getComments = () =>{
        commentService.getcomments(post._id)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    } 

    useEffect(() => {
        getPost()
        getComments()
    })


      const onFinish = (values) => {        
        const data = {
            ...values,
            post: post._id
        }

        setLoader(true);
        commentService.postComment(data)
        .then((res) => {
            notificationService.messageSuccess("Commentaire ajouté")            
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
    
    
    return(
        <>
            <div className="container">
                <article className="content">
                    <figure className="post-feature-image">
                        <img
                            src={GESTION_IMAGE[post?.category[0]._id]}
                            alt={'image post'}
                        />
                    </figure>
                    <section className='post-full-content' style={{backgroundColor:'transparent'}}>
                        <h1 className='content-title'>{ post.title }</h1>
                        <div className='mb-10'>{
                            post.users.map((item, index) => {
                                return (
                                    <span key = {item._id} className='text-2xl'>
                                        <Avatar
                                            style={{
                                                
                                                backgroundColor: GESTION_COLOR_AVATAR[index],
                                            }}
                                            >
                                            <span>{`${item.name.split(" ")[0][0]}`} </span>
                                        </Avatar>
                                        <span className={'mx-2 uppercase'}>{item.name}</span>
                                    </span>
                                )
                            })
                        
                        }</div>
                        <section className='content-body load-external-scripts'>
                            <p>
                                {post.resume}
                            </p>
                            <div>
                                {parse(post.content)}
                            </div>
                            {
                                data.length != 0 ? (
                                    <>
                                        <Divider>Commentaires</Divider>
                                        <div>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={data}
                                                renderItem={(item, index) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                    avatar={<Avatar src={profilDefault} />}
                                                    title={ <div className='flex justify-between'>
                                                                <span>{item.email}</span>
                                                                <span>{ new Date(item?.date)
                                                                    .toLocaleDateString('fr-FR', {day: "numeric", month: "numeric", year: "numeric"}) }</span>
                                                            </div> }
                                                    description={ item.content }
                                                    />
                                                </List.Item>
                                                )}
                                            />
                                        </div>
                                    </>
                                ) : null
                            }

                            <Divider>Laisser un commentaire</Divider>
                            <div>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="control-hooks"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="email"
                                        label="Email :"
                                        className={'mb-2'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Veuillez entrer une adresse mail valide !',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Entrer votre adresse mail " className={'rounded-lg'}/>
                                    </Form.Item>
                                    <Form.Item 
                                        name="content"
                                        label="Commentaire :" 
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Veuillez entre un commentaire !',
                                                // type: 'email'
                                            },
                                            ]}
                                        >
                                            <TextArea rows={5} placeholder="Entrer le commentaire"/>
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
                                                Envoyer
                                                <ArrowRightOutlined className={'align-middle'}/>
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                        </section>
                    </section>
                </article>
            </div>
        </>
    )
}

export default Post