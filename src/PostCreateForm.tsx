import React from 'react';

export default function PostCreateForm() {
    console.log('render Form component')
    return (
        <form className="form">
          <input type="text" placeholder="Enter title..."/>
          <textarea cols={30} rows={10} placeholder="Enter description..."/>
          <button>add post</button>
        </form>
    )
}