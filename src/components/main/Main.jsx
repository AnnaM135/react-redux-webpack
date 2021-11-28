import React, {useEffect, useState} from 'react'
import "./main.less"
import {useDispatch, useSelector} from "react-redux"
import {getRepos} from "../actions/repos"
import Repo from './repo/Repo.jsx'
import { createPages } from '../../utils/pagesCreator.js'
import { setCurrentPage } from '../../reducers/reposReducers.js'
import { Redirect } from 'react-router-dom'

function Main() {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const isFetchError = useSelector(state => state.repos.isFetchError)


    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    const [searchValue, setSearchValue] = useState("")


    useEffect(() =>{
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandler() {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }



    return (
        <div>
            {
                isFetchError &&
                <div className="alert alert-danger" role="alert">
                    Something went wrong.
                </div>
            }
            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="input repo name" className="search-input" />
                <button onClick={() => searchHandler()} className="search-btn">Search</button>
            </div>
            {
                isFetching === false 
                ?
                repos.map((repo, index) => (
                    <Repo key = {index} repo={repo} />
                ))
                :
                <div className="fetching"></div>
            }

            <div className="pages">
                {
                    pages.map((page, index) => (
                        <span 
                        key = {index} 
                        className= {currentPage == page ? "current-page" : "page"}
                        onClick={() => dispatch(setCurrentPage(page))}>{page}</span>
                    ))
                }
            </div>

        </div>
    )
}

export default Main
