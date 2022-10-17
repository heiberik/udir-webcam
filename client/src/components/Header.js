const Header = () => {

    const headerContainer = {
        display: "flex",
        padding: "2rem",
        backgroundColor: "lightgreen"
    }

    const headerStyle = {
        fontSize: "4rem",
        padding: "0",
        margin: "0"
    }

    return (
        <header style={headerContainer}>
            <h1 style={headerStyle}> Webkamera </h1>
        </header>
    );
}

export default Header;
