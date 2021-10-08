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
    console.log("Not Found")
    return "Not Found"
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

  }
};

export const getPostsByAuthor = async (author_id) => {
  // EDIT HERE
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
