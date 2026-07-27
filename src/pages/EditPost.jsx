import React, { useEffect, useState } from 'react'
import { Container, PostForm } from "../Components"
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import { SAMPLE_POSTS } from '../utils/sampleData';

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((res) => {
                if (res) {
                    setPost(res)
                } else {
                    const found = SAMPLE_POSTS.find(p => p.$id === slug);
                    if (found) setPost(found);
                    else navigate('/')
                }
            }).catch(() => {
                const found = SAMPLE_POSTS.find(p => p.$id === slug);
                if (found) setPost(found);
                else navigate('/')
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className="py-16 text-center text-slate-400">Loading post editor...</div>
    )
}

export default EditPost;