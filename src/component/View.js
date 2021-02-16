import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from 'Config'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
 
function View({ViewList, onModify, ModifyMode}) {

    const editorRef = useRef()
    const [InItEditor, setInItEditor] = useState()
    const [ListInfo, setListInfo] = useState()
    const [FileList2, setFileList2] = useState()
    const handleUpload2 = ({ fileList }) => {
        setFileList2(fileList)
    }       
    let photoEa;
    useEffect(() => {
        let body = {
            idx:ViewList.idx
        }
        axios.post(`${API_URL}/Backend/view.php`,body)
        .then(res => {
            let filiList = []
            setListInfo(res.data.data[0])
            setInItEditor(res.data.data[0].desc)
            if(res.data.data[0].bf_img){
                res.data.data[0].bf_img.map((img,idx) => {
                    filiList.push({
                        uid:idx,
                        name:img.bf_name,
                        status:'done',
                        url:img.bf_file,
                        originFileObj:{
                            uid:idx,
                            name:img.bf_name,
                            status:'done',
                            url:img.bf_file
                        }
                    })                 
                })
                setFileList2(filiList)
            }
        })            
    }, [ViewList])
    if(ListInfo && ListInfo.bf_img){
        photoEa = 5-ListInfo.bf_img.length
    }

    const onModifySubmit = () => {
        onModify()
    }

    const { register, handleSubmit, errors } = useForm();
    const onSubmit2 = data => {
        console.log(FileList2)
        return;
        let formData = new FormData();
        if(FileList2){
        FileList2.forEach(file => {
            formData.append('bf_file[]', file.originFileObj)
        });
        }
        console.log(editorRef.current.getInstance().getHtml())
        formData.append('title',data.title)
        formData.append('desc',editorRef.current.getInstance().getHtml())
        formData.append('choice','u')
        formData.append('idx',ViewList.idx)
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
     
    
    if(ListInfo && !ModifyMode){
    return (
        <>
            {ListInfo.title}
            {ListInfo.bf_img &&                
                ListInfo.bf_img.map((img,idx) => (
                    <>
                        <img key={idx} src={img.bf_file} />
                    </>
                ))                    
            }
            <Button onClick={onModifySubmit}>수정</Button>
        </>
    )
    }else if(ListInfo && ModifyMode){
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit2)}>
                    <input type="text" placeholder="제목" name="title" ref={register({required: true})} defaultValue={ListInfo.title} />
                    <Editor
                        initialValue={InItEditor}
                        previewStyle="vertical"
                        height="300px"
                        initialEditType="wysiwyg"
                        placeholder="글쓰기"
                        ref={editorRef}
                    />
                    {
                    ListInfo.bf_img &&
                        <>
                        <Upload
                            beforeUpload={() => false}
                            listType="picture"
                            defaultFileList={FileList2}
                            className="upload-list-inline"
                            onChange={handleUpload2}
                            maxCount={5}
                        >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        </>
                    }
                    {/* {ListInfo.bf_img && 
                        ListInfo.bf_img.map((img,idx) => (
                            <>
                                <input key={idx} type="file" id={`img${idx}`} />
                                <label htmlFor={`img${idx}`}><img src={img.bf_file} /></label>                                
                            </>
                        ))                    
                    }
                    {[...Array(photoEa)].map((n, idx) => {
                        return (
                            <>
                                <input key={idx} type="file" id={`img${(5-photoEa)+idx}`} />
                                <label htmlFor={`img${(5-photoEa)+idx}`}></label>  
                            </>
                        )
                    })} */}
                    
                    <input type="submit" />
                </form>
            </>
        )
    }else{
        return(
            <>
                loading...
            </>
        )
    }
}

export default View
