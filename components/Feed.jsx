'use client'

import React, { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([])

  const [posts, setPosts] = useState([])

  const filterPrompts = (searchTerm) => {
    const regex = new RegExp(searchTerm, "i");

    return posts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.prompt) ||
      regex.test(item.tag)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const data = filterPrompts(e.target.value);
        setSearchedResults(data);
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const data = filterPrompts(tag);
    setSearchedResults(data);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, [])
  

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
      `<input 
        type="text"
        placeholder='Search for a tag or a username'
        value={searchText}
         onChange={handleSearchChange}
         required
         className='search_input peer'
      />`
      </form>
      <PromptCardList 
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed