import { FormEvent, useState } from 'react';
import {useStore} from '../app/store'

const Login = () => {

    const [inputAccessToken, setInputAccessToken] = useState<string>('')
    const [errors, setErrors] = useState<string>("")
    const { setAccessToken } = useStore()

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()

        if(inputAccessToken === '') {
            setErrors('Please enter a token')
            return  ;
        } 

        localStorage.setItem('accessToken', inputAccessToken);
        setAccessToken(inputAccessToken);
        localStorage.setItem('mediaType', 'ANIME');
    }

  return (
        <form className='w-[350px] p-4 bg-[#282828] text-white rounded-sm flex flex-col gap-2' 
            onSubmit={handleSubmit}>
            <p className=" mb-1">
                Click <span className='rounded-sm underline'>
                    <a href="https://anilist.co/api/v2/oauth/authorize?client_id=16601&response_type=token" target="_blank" rel="noopener noreferrer">here</a>    
                </span> to start the authorization process. You will be
                redirected authorization. After authorization, AniList
                will give you a token copy and paste that below to complete the linking.
            </p>
            <input 
                placeholder="Enter Token"
                type="text" 
                className='border text-black border-black border-solid p-2 rounded-sm outline-none focus:border-blue-500'
                value={inputAccessToken}
                onChange={
                    (e) => {
                        setInputAccessToken(e.target.value)
                    }
                }
            />
            {errors && <span>{errors}</span> }
            <button type='submit'
                className='p-2 rounded-sm bg-black text-white'>
                Submit
            </button>
        </form>
  )
}

export default Login