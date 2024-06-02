const Genre = ({ genre }: { genre: string }) => {
    return (
        <span className="p-1 px-2 rounded-sm bg-accent_bg text-primary_text mr-2">
            {genre}
        </span>
    );
};

export default Genre;
