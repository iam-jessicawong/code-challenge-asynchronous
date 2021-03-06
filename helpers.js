export const getPosts = async () => {
  // EDIT HERE
  const url = "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=16"
  let response = await fetch(url)
  let data = await response.json()
  return data
};

export const getPost = async (post_id) => {
  // EDIT HERE
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${post_id}`
    let response = await fetch(url)
    let data = await response.json()
    return data
  } catch(error) {
    /* console.log("Not Found")
    return "Not Found" */
    throw error
  }
};

export const getPostComments = async (post_id) => {
  // EDIT HERE
  try {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${post_id}`
    let response = await fetch(url)
    let data = await response.json()
    return data
  } catch(error) {
    throw error
  }
};

export const getAuthor = async (user_id) => {
  // EDIT HERE
  try {
    const url = `https://jsonplaceholder.typicode.com/users/${user_id}`
    let response = await fetch(url)
    let data = await response.json()
    return data
  } catch(error) {
    throw error
  }
};

export const getPostsByAuthor = async (author_id) => {
  // EDIT HERE
  try {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${author_id}`
    let response = await fetch(url)
    let data = await response.json()
    return data
  } catch (error) {
    throw error
  }
};

export const getRandomPic = async () => {
  try {
    const image = await fetch('https://source.unsplash.com/random/720x480');
    return image.url;
  } catch (error) {
    console.log('getRandomPic', error);
    throw error;
  }
};

export const getRandomProfile = async () => {
  try {
    const image = await fetch('https://source.unsplash.com/480x480/?profile');
    return image.url;
  } catch (error) {
    console.log('getRandomProfile', error);
    throw error;
  }
};

export const createComment = async (comment) => {
  const url = "https://jsonplaceholder.typicode.com/comments"
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  
  if(response.status === 201) {
    alert('berhasil menambahkan komentar')
  }
  else {
    alert('gagal menambahkan komentar')
  }
}

export const removeComment = async (comment_id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${comment_id}`, {
    method: 'DELETE',
  });
  console.log(response)
}