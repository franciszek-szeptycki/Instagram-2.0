import {ChangeEvent, useEffect, useState} from "react";
import {useQuery} from "react-query";
import {Search} from "../assets/icons";
import API from "../features/API";
import "./SearchEngine.sass"

export default ({setHashtag}: { setHashtag?: any }) => {

    const [inputValue, setInputValue] = useState("")
    const [options, setOptions] = useState<SearchType[]>()
    const [isLoading, setIsLoading] = useState(false)

    const loadOptions = useQuery("load-search-engine-content", () => API("GET",
        `/api/search/${setHashtag ? "hashtag" : "user"}/${inputValue}`, null), {
        onSuccess: ({data}: { data: SearchType[] }) => {
            setOptions(data)
            setIsLoading(false)
        }
    })

    useEffect(() => {loadOptions.refetch()}, [inputValue])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        setInputValue(e.target.value)
    }

    const handleOptionClick = (id: number) => {
        if(setHashtag) {
            setHashtag(id)
            setInputValue("")
        } else window.location.assign(`/user/${id}`)
    }

    return (
        <div className="search-eng-wrapper" >
            <label className="search-eng" >
                <Search/><input onChange={handleInputChange} className="search-eng__input" />
                <ul className={`search-eng__ul ${inputValue ? "" : "hidden"}`} >
                    {isLoading ?
                        (<li>loading</li>) :
                        options ? options.map((item: SearchType, index: number) =>
                            (index < 7 && <li key={index} onClick={() => handleOptionClick(item.id)}>
                                {/*@ts-ignore*/}
                                {item.hashtag_name || item.user_name}</li>))
                            :
                            (<li>no results...</li>)}
                </ul>
            </label>
        </div>
    )
}

interface HashtagType {
    hashtag_name: string,
    id: number
}

interface UserType {
    user_name: string,
    id: number
}

type SearchType = UserType | HashtagType