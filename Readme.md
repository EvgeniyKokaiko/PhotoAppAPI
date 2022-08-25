# Photo Application API

#### Technologies:

- Node.js
- Express.js
- Multer
- PostgreSQL
- Docker & Docker-Compose
- Typescript


### To run application:

```
// First - install dependencies:
   npm install
// To run application - make sure, that you have installed PostgreSQL database, and if it's true
// Edit .env file and write out your own credentials
// And then - start application:
    npm run dev
```

## DOCS:

### Constants
@url - api url \
@required - required field \
@len - length of string \
@multipart - is multipart/form-data \
@return - data which returns from endpoint \
@example:: - example of request \
@query - url queries

#### POSTS
##### Add post

@url/api/posts/add POST @multipart \
image: File // @len 3 - 100 \
title: string //@len 5 - 100 | @required \
url: string \
album_id: number // @required (belongs to album table)
thumbnail: string \

@example::

{
    image: File,
    title: "hello5",
    album_id: 7,
    url?: https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg,
    thumbnail?: https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg
}

@return {
    "statusCode": 200,
    "statusMessage": "OK",
    "data": {
    "created_at": "2022-08-25T18:24:11.625Z",
    "updated_at": "2022-08-25T18:24:11.625Z",
    "id": 2,
    "title": "hello5",
    "album_id": 7,
    "url": "85bff191-aa3a-40ef-8906-d14e1c74ac5e.png",
    "thumbnail": "85bff191-aa3a-40ef-8906-d14e1c74ac5e.png"
    }
}

##### Get posts

@url/api/posts/get GET

@query:: \
limit - limit of items; \
offset - offset of items; \
album_id - find by album id;

@return {
"statusCode": 200,
"statusMessage": "OK",
"data": [
    {
        "id": 1,
        "album_id": 7,
        "title": "hello5",
        "url": "0593ad9c-97a7-49a1-87d6-0aa1a31be68e.png",
        "thumbnail": "0593ad9c-97a7-49a1-87d6-0aa1a31be68e.png",
        "created_at": "2022-08-25T18:24:06.935Z",
        "updated_at": "2022-08-25T18:24:06.935Z"
    },
    {
        "id": 2,
        "album_id": 7,
        "title": "hello5",
        "url": "85bff191-aa3a-40ef-8906-d14e1c74ac5e.png",
        "thumbnail": "85bff191-aa3a-40ef-8906-d14e1c74ac5e.png",
        "created_at": "2022-08-25T18:24:11.625Z",
        "updated_at": "2022-08-25T18:24:11.625Z"
    }
]}

##### Delete post

@url/api/remove/:id DELETE 

@example::
http://192.168.1.90:8080/api/posts/remove/1

@return {
    "statusCode": 200,
    "statusMessage": "OK",
    "data": {
    "id": 1,
    "album_id": 7,
    "title": "hello5",
    "url": "0593ad9c-97a7-49a1-87d6-0aa1a31be68e.png",
    "thumbnail": "0593ad9c-97a7-49a1-87d6-0aa1a31be68e.png",
    "created_at": "2022-08-25T18:24:06.935Z",
    "updated_at": "2022-08-25T18:24:06.935Z"
    }
}

##### Update post

@url/api/posts/update/:id PUT @multipart \
image: File // @len 3 - 100 \
title: string //@len 5 - 100 | @required \
url: string \
album_id: number // @required (belongs to album table)
thumbnail: string \

@example::

{
image: File,
title: "hello5",
album_id: 7,
url?: https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg,
thumbnail?: https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg
}

@return {
"statusCode": 200,
"statusMessage": "OK",
"data": {
"title": "hello5",
"album_id": "7",
"url": "0d799801-956d-4c19-8e34-33272774c2a8.png",
"thumbnail": "0d799801-956d-4c19-8e34-33272774c2a8.png"
}
}

#### ALBUMS
##### Add album

@url/api/albums/add POST
name: string // @len 5 - 100 | @required

@example::

{
    name: 'nature',
}

@return {
    "statusCode": 200,
    "statusMessage": "OK",
    "data": {
    "id": 10,
    "name": "nature",
    "updatedAt": "2022-08-25T18:35:03.413Z",
    "createdAt": "2022-08-25T18:35:03.413Z"
    }
}

##### Get albums

@url/api/albums/get GET


@return {
"statusCode": 200,
"statusMessage": "OK",
"data": [
    {
    "id": 3,
    "name": "girls",
    "created_at": "2022-08-24T16:16:14.294Z",
    "updated_at": "2022-08-24T16:16:14.294Z"
    },
    {
    "id": 5,
    "name": "freedom",
    "created_at": "2022-08-24T16:16:14.294Z",
    "updated_at": "2022-08-24T16:16:14.294Z"
    },
]
}

##### Delete album

@url/api/albums/remove/:id DELETE

@example::
http://192.168.1.90:8080/api/albums/remove/1

@return {
    "statusCode": 200,
    "statusMessage": "OK"
}

##### Update album

@url/api/update/:id PUT \
name: string // @len 5 - 100 | @required

@example::

{
    "name": "nature"
}

@return {
"statusCode": 200,
"statusMessage": "OK",
"data": [ 0 ]
}
