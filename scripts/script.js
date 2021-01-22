class FetchData {
    getResource = async url => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error('произошла ошибка ' + res.status);
        }
        return res.json();
        // console.log(res);
    }
    // в случае одной строки в функции можно не ставить {} и не писать return
    getPost = () => this.getResource('db/dataBase.json');
}


// const obj = new FetchData();

// obj.getPost().then((data) => {
// });

class Twitter {
    constructor({ listElem}) {
        const fetchData = new FetchData();
        this.tweets = new Posts();
        this.elements = {
            listElem: document.querySelector(listElem)
        }
        fetchData.getPost()
            .then(data => {
                data.forEach(this.tweets.addPost);
                this.showAllPost();
            });
    }
    //отрисовка постов
    renderPosts(tweets) {
        //очищаем содержимое предыдущей ленты
        this.elements.listElem.textContent = '';
        tweets.forEach(({id, userName, nickname, text, img, likes, getDate = 0}) => {
            this.elements.listElem.insertAdjacentHTML('beforeend', `
            <li>
                <article class="tweet">
                    <div class="row">
                        <img class="avatar" src="images/${nickname}.jpg" alt="Аватар пользователя ${userName}">
                        <div class="tweet__wrapper">
                            <header class="tweet__header">
                                <h3 class="tweet-author">${userName}
                                    <span class="tweet-author__add tweet-author__nickname">@${nickname}</span>
                                    <time class="tweet-author__add tweet__date">${getDate()}</time>
                                </h3>
                                <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
                            </header>
                            <div class="tweet-post">
                                <p class="tweet-post__text">${text}</p>
                                ${img ? 
                                    `<figure class="tweet-post__image">
                                        <img src="${img}" alt="здесь могло быть изображение ${nickname}">
                                    </figure>` :
                                    ''}
                            </div>
                        </div>
                    </div>
                    <footer>
                        <button class="tweet__like">
                            ${likes}
                        </button>
                    </footer>
                </article>
            </li>
            `);
        });
    }
    shwoUserPost() {

    }
    showLikedPost() {

    }
    showAllPost() {
        this.renderPosts(this.tweets.posts);
    }
    openModal() {

    }
}

class Posts {
    constructor({ posts = [] } = {}) {
        this.posts = posts;
    }
    addPost = (tweets) => {
        this.posts.push(new Post(tweets));
    }
    deletePost(id) {

    }
    likePost(id) {

    }
}
class Post {
    constructor({id, userName, nickname, postDate, text, img, likes = 0}) {
        this.id = id ? id : this.generateID();
        this.userName = userName;
        this.nickname = nickname;
        this.postDate = postDate ? new Date(postDate) : new Date();
        this.text = text;
        this.img = img;
        this.likes = likes;
        this.liked = false;
    }
    changeLike() {
        this.liked = !this.like;
        if(this.liked) {
            this.likes++;
        } else {
            this.likes--;
        }
    }
    generateID() {
        // + - translate Date to Int
        return (Math.random().toString(16).substring(2,9) + (+new Date).toString(16));
    }
    getDate = () => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return this.postDate.toLocaleString('ru-RU', options);
    };
}

const twitter = new Twitter({
    listElem: '.tweet-list'
});

