'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const NewProfile = ( { params }) => {

  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  
    const router = useRouter();
    
    const { data : session} = useSession();

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
        if (session?.user.id === params.id) {
            router.push('/profile');
        }
        if (params?.id) fetchPosts()
      }, [params.id])

  return (
    <Profile 
        name= {userName}
        desc= {`Welcome to this profile's personalized profile page`}
        data={posts}
    />
  )
}

export default NewProfile