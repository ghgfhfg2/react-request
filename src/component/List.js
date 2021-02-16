import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { API_URL } from 'Config'
import View from 'component/View'
function List() {

    const [boardList, setboardList] = useState()    
    useEffect(() => {
        axios.get(`${API_URL}/Backend/list.php`)
        .then(res => {
            setboardList(res.data.data)
        })
    }, [])


    const [ViewList, setViewList] = useState()
    const onViewModal = (e,list) => {
        setViewList(list)
        setOnView(true)
        setModifyMode(false)
    }

    const [OnView, setOnView] = useState(false)
    const [ModifyMode, setModifyMode] = useState(false)
    const onModify = () => {
        setModifyMode(!ModifyMode)
    }

    return (
        <>
            <ul>
                {
                boardList && boardList.map((list,index) => (
                <li key={index} onClick={(e) => onViewModal(e, list)}>
                    {`${list.title} : ${list.desc}`}
                </li>
                ))
                } 
            </ul>
            {OnView &&
                <View ViewList={ViewList} onModify={onModify} ModifyMode={ModifyMode} />
            }
        </>
    )
}

export default List
