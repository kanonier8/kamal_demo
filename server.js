const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const PORT = 3001;

class ApiError {
    constructor(title, desc) {
        this.title = title;
        this.desc = desc;
    }
}

// вернуть список всех постов
app.get('/api/v1/posts', (req, res) => {
    res.json(posts);
});


// вернуть один пост по запрашиваемому ID
app.get('/api/v1/posts/:id', (req, res) => {
    const { id } = req.params;
    const targetPost = posts.find(post => post.id === parseInt(id));
    if (!targetPost) {
        res.status(404);
        res.send(new ApiError('Запрашиваевый пост не найден', `Пост с id: ${id}, не существует. Проверьте правильность переданных параметров`));
    } else {
        res.json(targetPost);
    }
});


// Удалить пост с запрошенным ID
app.delete('/api/v1/posts/:id', (req, res) => {
    const { id } = req.params;
    const targetPost = posts.find(post => post.id === parseInt(id));
    if (!targetPost) {
        res.status(404);
        res.send(new ApiError('Запрашиваевый пост не найден', `Пост с id: ${id}, не существует. Проверьте правильность переданных параметров`));
    } else {
        posts = posts.filter(post => post.id !== parseInt(id));
        res.json({ status: 'ok', desc: `Пост с id ${id}, успешно удален!` });
    }
});

// Создать новый пост
app.post('/api/v1/posts', (req, res) => {
    const { body } = req;
    checkPostBodyError(body, res, () => {
        const newPost = { ...body, id: uuidv4()};
        posts.unshift(newPost);
        res.json(newPost)
    });
});

// Обновить пост по запрошенному ID
app.put('/api/v1/posts/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const targetPost = posts.find(post => post.id === parseInt(id));
    if (!targetPost) {
        res.status(404);
        res.send(new ApiError('Запрашиваевый пост не найден', `Пост с id: ${id}, не существует. Проверьте правильность переданных параметров`));
    } else if (Object.keys(body).length === 0) {
            res.status(400);
            res.send(new ApiError('Ошибка обновления поста', 'Отсутствуют поля необходимо наличие полей title или desc'))
    } else if (body.id) {
        res.status(400);
        res.send(new ApiError('Ошибка обновления поста', 'Нельзя изменить ID post'))
    } else {
        posts = posts.map(post => post.id === parseInt(id) ? { ...post, ...body} : post);
        res.send({ status: 'ok', desc: `Пост с id ${id}, успешно обновлен!` })
    }
});

app.use((req, res) => {
    res.status(404);
    res.send('Запрашиваемого метода не сущетсвует!')
})


app.listen(PORT, () => {
    console.log(`
        Server has been stared on http://localhost:${PORT}
        Press Ctrl+C to stop
    `)
});

function checkPostBodyError(body, res, callback) {
    if (Object.keys(body).length === 0) {
        res.status(400);
        res.send(new ApiError('Ошибка добавлния поста', 'Отсутствуют поля title, desc'))
    } else if (!body.title) {
        res.status(400);
        res.send(new ApiError('Ошибка добавлния поста', 'Отсутствуют поля title'))
    } else if (!body.desc) {
        res.status(400);
        res.send(new ApiError('Ошибка добавлния поста', 'Отсутствуют поля desc'))
    } else {
        callback()
    }
}


let posts = [
    {
        id: 1,
        title: 'Post 1',
        desc: 'Some long body for post 1'
    },
    {
        id: 2,
        title: 'Post 2',
        desc: 'Some long body for post 2'
    },
    {
        id: 3,
        title: 'Post 3',
        desc: 'Some long body for post 3'
    },
    {
        id: 4,
        title: 'Post 4',
        desc: 'Some long body for post 4'
    },
    {
        id: 5,
        title: 'Post 5',
        desc: 'Some long body for post 5'
    },
    {
        id: 6,
        title: 'Post 6',
        desc: 'Some long body for post 6'
    },
    {
        id: 7,
        title: 'Post 7',
        desc: 'Some long body for post 7'
    }
];