export const Header=()=>{
    return(
        <div className="header">
            <input type="search" value="" placeholder="Search"/>

            <div className="header-list">
                <p>Home</p>
                <p>Trending</p>
                <p>TV Shows</p>
                <p>Movies</p>
                <p>LogOut</p>
            </div>
        </div>
    )
}