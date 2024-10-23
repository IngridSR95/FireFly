document.getElementById('searchButton').addEventListener('click', async () => {
    const searchArt = document.getElementById('search-art').value;
    const searchSong = document.getElementById('search-song').value;
    const resultDiv = document.getElementById('result');

    const vagalumeKey = "cc5a9a0d7ea464ebc3546f267aa7b8c0";

    resultDiv.innerHTML = `<p>Carregando...</p>`

    if (!searchArt || !searchSong) {
        resultDiv.innerHTML = "<p>Por favor, preencha ambos os campos.</p>";
        return;
    }

    const apiUrlVagalume = `https://api.vagalume.com.br/search.php?art=${searchArt}&mus=${searchSong}&apikey=${vagalumeKey}`;

    fetch(apiUrlVagalume).then(response => response.json()).then(data => {
        if (data.type === 'notfound') {
            resultDiv.innerHTML = `<p>Letra não encontrada.</p>`;
        } else if (data.mus && data.mus.length > 0) {
            resultDiv.innerHTML = `<h3>${searchSong} - ${searchArt}</h3><pre>${data.mus[0].text}</pre>`;
        } else {
            resultDiv.innerHTML = "<p>Não foi possível encontrar a letra para esta música.</p>";
        }
    }).catch(error => {
        console.error('Erro ao buscar letra:', error);
        resultDiv.innerHTML = "<p>Ocorreu um erro ao buscar a letra. Tente novamente mais tarde.</p>";
    });
});