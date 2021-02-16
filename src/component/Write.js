import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from 'Config'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function Write() {
    const editorRef = useRef()
    const [EditorCon, setEditorCon] = useState()

    const { register, handleSubmit, errors } = useForm();

    const [FileList, setFileList] = useState()
    const handleUpload = ({ fileList }) => {
        setFileList(fileList)
    }


    const onSubmit = data => {
            console.log(editorRef.current.getInstance().getHtml())
            setEditorCon(editorRef.current.getInstance().getHtml())
            let formData = new FormData();
            formData.append('title',data.title)
            formData.append('desc',EditorCon)
            if(FileList){
            FileList.forEach(file => {
                formData.append('bf_file[]', file.originFileObj)
            });
            }
            const config = {
                headers: {
                "content-type": "multipart/form-data"
                }
            };
            axios.post(`${API_URL}/Backend/handling.php`,formData,config)
            .then(res => {
                console.log(res)
            }) 
    };



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="제목" name="title" ref={register({required: true})} />
                <Editor
                        previewStyle="vertical"
                        height="300px"
                        initialEditType="wysiwyg"
                        placeholder="글쓰기(이미지는 하단 업로드 버튼으로 첨부)"
                        ref={editorRef}
                    />
                <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    className="upload-list-inline"
                    onChange={handleUpload}
                    maxCount={5}
                >
                <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <input type="submit" />
            </form>
        </>
    )
}

export default Write
