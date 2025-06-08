function loadData() {
    fetch("data.json").then(r => r.json()).then(data => {
        data.scriptApi["server"].forEach(server => {
            const div = document.getElementById("versionServerModules")
            const p = document.createElement("p")
            
            p.textContent = server.version
            div.appendChild(p)
        })
    })
}

loadData()