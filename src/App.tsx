import React, { useEffect, useState } from 'react';
import PostComponent from './Post';
import PostCreateFormComponent from './PostCreateForm';


// интерфейс описывает тип объекта c одним постом
// эти поля взяты с https://jsonplaceholder.typicode.com/comments
export interface IPost {
  body: string,
  id: number,
  title: string,
  userId: number
}

// export default может быть только один в модуле
// импортируется без фигурных скобок
export default function App() {
  // заведем состояние, где будем хранить список постов, который придет от сервера
  // https://ru.reactjs.org/docs/hooks-intro.html
  // https://ru.reactjs.org/docs/hooks-overview.html
  // setPost функция, которая будет обновлять значение переменной post
  // в useState можно описать тип нашего состояния useState<тип нашего состяния>
  const [posts, setPosts] = useState<Array<IPost>>([]); // вначале состояние пустой массив

  // эффект после успешного ренднра компонента
  // выполнится один раз после того как компонет будет монтирован в HTML
  // https://ru.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // Готовый промис из JS для выполнения AJAX запросов на сервер
    // https://learn.javascript.ru/fetch
    // когда компонент отрисовался на странице отправляем запрос на сервер за данными

    // Fetch Асинхронный код!
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET'
    }).then((response: Response) => {
        console.log('response from FIRST .then()', response);
        return response.json() // вернет Promise для получения из ответа JSON'а
    }).then((data: Array<IPost>) => {
      console.log('response from SECOND .then', data);
      // когда данные пришли, обновим состояние со списком постов
      // data будет хранить массив постов, каждый пост этот объект, который описан интерфейсом с типом IPost
      setPosts(data);
    });
    console.log('!!promise finish');
  }, [/* зависимости эффекта, у этого эффекта нет зависимостей поэтому он выполнится один раз */]);

  console.log('render app component');



  return (
    <div className="page">
      <h1 className="pageTitle">Demo project</h1>
      <div className="content">

        {/* компонет с формой для создания поста */}
        <PostCreateFormComponent />

        <div className="postsWrap">
          <h2 className="postsTitle">Post</h2>
          <div className="list">
            

            {
              posts.length === 0 ?
              
                <h2>Нет постов</h2> :

                posts.map((post: IPost, index: number) => {
                  return (
                    <PostComponent key={index} data={post} />
                  )
                })

            }
            
          </div>
        </div>
      </div>
    </div>
  );
}