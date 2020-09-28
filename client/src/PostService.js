import axios from 'axios';

const url = 'api/taskslist/';
/*eslint-disable no-async-promise-executor*/

class PostService {
    //get post
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await  axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        dateCreated: new Date(post.dateCreated)
                    }))
                );
            }catch (err) {
                reject(err);
            }
        })
    }
    //create post
    static insertPost(task) {
        return axios.post(url, {
            task
        });
    }

    //delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default PostService;