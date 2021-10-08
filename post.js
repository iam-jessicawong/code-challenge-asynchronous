import { getPost, getRandomPic, getPostComments, getAuthor, getRandomProfile, createComment } from './helpers.js';

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const params = urlParams.get('post_id'); // tempat menampung parameter yang ada

const elPageTitle = document.querySelector('#page-title');
const elDetailBerita = document.querySelector('#detail-berita');
const elLoading = document.querySelector('#loading');
const elNotFound = document.querySelector('#not-found');
const elCardImg = document.querySelector('.card-img-top');
const elCardText = document.querySelector('.card-text');
const elCardAuthorImg = document.querySelector('#author-img');
const elCardAuthorName = document.querySelector('#author-name');
const elCardAuthorEmail = document.querySelector('#author-email');
const elListGroup = document.querySelector('#list-group');

const createListElement = (comment) => {
  const elListItem = document.createElement('div');
  /* const elListItemContainer = document.createElement('div');
  const elListItemTitle = document.createElement('div');
  const elListItemText = document.createElement('span');

  elListItem.classList.add('list-group-item');
  elListItemContainer.classList.add('ms-2', 'me-auto');
  elListItemTitle.classList.add('fw-bold');

  elListItemTitle.innerHTML = comment.email;
  elListItemText.innerHTML = comment.body;

  elListItemContainer.appendChild(elListItemTitle);
  elListItemContainer.appendChild(elListItemText);
  elListItem.appendChild(elListItemContainer); */

  elListItem.insertAdjacentHTML(
    "beforeend",
    `<div class="list-group-item d-flex justify-content-between">
      <div class="ms-2 me-auto">
        <div class="fw-bold">
          ${comment.email}
        </div>
        <span>${comment.body}</span>
      </div>
      <button
        type="button"
        class="btn btn-sm btn-outline-danger text-uppercase delete-btn"
        comment-id="${comment.id}"
      >
        delete
      </button>
    </div>`
  );

  return elListItem;
};


const renderPost = async () => {
  // EDIT HERE
  try {
    const post = await getPost(params)
    const comments = await getPostComments(params)
    const author = await getAuthor(post.userId)
    const img = await getRandomPic()
    const profPic = await getRandomProfile()
    
    console.log(post)
    console.log(author)

    elLoading.classList.add('d-none')
    elDetailBerita.classList.remove('d-none')
    elPageTitle.textContent = post.title
    elCardImg.setAttribute('src', img)
    elCardText.textContent = post.body
    elCardAuthorImg.setAttribute('src', profPic)
    elCardAuthorName.textContent = author.name
    elCardAuthorName.href = `/author.html?author_id=${author.id}`
    elCardAuthorEmail.textContent = author.email
    
    comments.map(comment => elListGroup.appendChild(createListElement(comment)))

    /* // DELETE COMMENT
    const elBtnDelete = document.querySelectorAll(".delete-btn")
    console.log(elBtnDelete) */
    
  } catch (error) {
    throw elNotFound.classList.remove("d-none")
  }
};

renderPost();

const elFormComment = document.getElementById("form-new-comment")
elFormComment.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById("namme")
  const email = document.getElementById("email")
  const body = document.getElementById("body")
  const post_id = Number(params)

  const comment = {
    post_id: post_id,
    name: name.value,
    email: email.value,
    body: body.value
  }

  createComment(comment)

})