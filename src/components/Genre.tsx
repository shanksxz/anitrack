

const Genre = ({genre} : {
    genre: string
}) => {
  return (
    <span className='p-1 px-2 rounded-sm bg-[#7330e6] text-white mr-2'>
        {genre}
    </span>
  )
}

export default Genre