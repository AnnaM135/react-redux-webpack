import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentRepo, getContibutors } from '../actions/repos.js';
import "./card.less"

const Card = (props) => {
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contibutors, setContibutors] = useState([])
    useEffect(() => {
        getCurrentRepo(username, reponame, setRepo)
        getContibutors(username, reponame, setContibutors)
    }, [])
    return (
        <div>
            <button onClick = {() => props.history.goBack()} className="back-btn">BACK</button>
            <div className="card">
                <img src={repo.owner.avatar_url} alt={repo.owner.avatar_url} />
                <div className="name">{repo.name}</div>
                <div className="stars">{repo.stargazers_count}</div>
            </div>
            {
                contibutors.map((c, index) => (
                    <div key={index}>{index+1}. {c.login}</div>
                ))
            }
        </div>
    )
}
export default Card
