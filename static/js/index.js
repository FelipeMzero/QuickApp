document.getElementById("playlistForm").addEventListener("submit", function(event) {
    event.preventDefault();
    extractPlaylistInfo();
});

function extractPlaylistInfo() {
    var playlistLink = document.getElementById("playlistLink").value;

    // Extrair nome de usuário e senha da playlistLink
    var username = playlistLink.match(/username=([^&]*)/)[1];
    var password = playlistLink.match(/password=([^&]*)/)[1];

    // Definir outras informações
    var playlistName = "Cloud";
    var host = "http://srv.cldplay.in";
    var playlistEpgUrl = "http://srv.cldplay.in/xmltv.php?username=" + username + "&password=" + password + "&type=m3u_plus&output=ts";

    // Exibir informações extraídas na página
    document.getElementById("playlistName").innerText = playlistName;
    document.getElementById("host").innerText = host;
    document.getElementById("username").innerText = username;
    document.getElementById("password").innerText = password;
    document.getElementById("playlistEpgUrl").innerText = playlistEpgUrl;

    document.getElementById("playlistInfo").style.display = "block";

    // Adicionar botão de exportar para arquivo de texto
    var exportButton = document.createElement("button");
    exportButton.innerText = "Exportar para TXT";
    exportButton.addEventListener("click", function() {
        exportToTxt(playlistName, host, username, password, playlistEpgUrl);
    });
    document.getElementById("playlistInfo").appendChild(exportButton);

    // Adicionar botão para atualizar a página
    var reloadButton = document.createElement("button");
    reloadButton.innerText = "Atualizar Página";
    reloadButton.addEventListener("click", function() {
        location.reload();
    });
    document.getElementById("playlistInfo").appendChild(reloadButton);

    // Tornar áreas clicáveis para copiar
    var elementsToCopy = document.querySelectorAll("#playlistName, #host, #username, #password, #playlistEpgUrl");
    elementsToCopy.forEach(function(element) {
        element.style.cursor = "pointer";
        element.addEventListener("click", function() {
            copyToClipboard(element.innerText);
        });
    });
}

function exportToTxt(playlistName, host, username, password, playlistEpgUrl) {
    var textToSave = "Nome da Playlist: " + playlistName + "\n" +
                    "Host: " + host + "\n" +
                    "Username: " + username + "\n" +
                    "Password: " + password + "\n" +
                    "Playlist EPG URL: " + playlistEpgUrl;

    var blob = new Blob([textToSave], {type: "text/plain"});
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "playlist_info.txt";
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
}

function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copiado para a área de transferência!");
}
