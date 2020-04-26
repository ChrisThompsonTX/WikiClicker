let Eve = "";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchform').addEventListener("submit", (e) => {
        e.preventDefault();
        Eve = e.target["0"].value;
        handleSearch(e.target["0"].value);
        data(dataGraph);
    });

    document.getElementById('reset').onclick = () => {
        document.getElementById('counter').innerHTML = 0;
        reset();
    };

    document.getElementById('demo').onclick = () => {
        Eve = "wikipedia";
        handleSearch("wikipedia");
        data(dataGraph);
    };



});