import { getAuthor, getPostsByAuthor, getRandomPic } from "./helpers.js";

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const params = urlParams.get('author_id');

const elPageTitle = document.querySelector('#page-title');
const elPostList = document.querySelector('#post-list');
const elLoading = document.querySelector('#loading');
const elEmptyPost = document.querySelector('#empty-post');

const createPostElement = (thumbnail, post) => {
  const elCol = document.createElement('div');
  elCol.classList.add('col-12');
  elCol.insertAdjacentHTML(
    'beforeend',
    `<div class="card mb-3 w-100">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${thumbnail}" class="img-fluid rounded-start" alt="skilvul" />
        </div>
        <div class="col-md-8 d-flex justify-between">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <a href="/post.html?post_id=${post.id}" class="btn btn-primary w-100 stretched-link">Read More</a>
          </div>
        </div>
      </div>
    </div>`
  );

  return elCol
};

const renderPosts = async () => {
  // EDIT HERE
  try {
    const author = await getAuthor(params)

    if(Object.keys(author).length) {
      const posts = await getPostsByAuthor(author.id)
      elLoading.classList.add('d-none')
      
      if(posts.length) {
        elPageTitle.textContent = `${author.name} Posts`
        posts.map(async post => {
          let thumbnail = await getRandomPic()
          console.log(thumbnail)
          console.log(post)
          let div = createPostElement(thumbnail,post)
          elPostList.appendChild(div)
        })
        elPostList.classList.remove('d-none')
        
      } else {
        elEmptyPost.classList.remove('d-none')
      }
    }
  } catch (error) {
    throw error
  }
};

renderPosts();
