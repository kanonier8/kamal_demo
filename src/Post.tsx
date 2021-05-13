import React, { useState } from 'react';
import { IPost } from './App';

// пример передаваемого props с названием data:
// {
//     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//     id: 1
//     title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
//     userId: 1
// }

interface IProps {
    data: IPost
}

// props объект: { data: { body: 'some body', id: 123, title: 'some title', userId: 123 } }
// props описан интерфейсом IProps
export default function Post(props: IProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false); // вернет массив [<состояние>, <функция чтобы изменить состояние>]

    const handleDeleteClick = (id: number): void => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
            .then((response: Response) => {
                console.log('user deleted')
                return 'data from promise'
            })
            .then((data: string) => {
                console.log(data)
                return fetch('https://jsonplaceholder.typicode.com/posts')
            })
            .then((response: Response) => {
                return response.json()
            })
            .then((response) => {
                return response
            })
    };


    const handleEditClick = (): void => {
        // меняю состояние isEdit
        setIsEdit(!isEdit)
    };

    console.log('render', isEdit)

    return (
        <div className="post">
            <h3 className="postTitle">
                {
                    isEdit ?
                        <input type="text" value={props.data.title} /> :
                        props.data.title
                }
            </h3>
            <p className="postBody">
                {
                    isEdit ?
                        <textarea value={props.data.body} /> :
                        props.data.body
                }                
            </p>
            <div className="postControls">
                <button onClick={() => handleDeleteClick(props.data.id)} className="postDeleteBtn">
                    delete
                </button>
                <button onClick={handleEditClick} className="postDeleteBtn">
                    edit
                </button>
            </div>
        </div>
    )
}