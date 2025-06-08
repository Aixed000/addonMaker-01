function loadData() {
    fetch("data.json").then(r => r.json()).then(data => {
        data.scriptApi["server"].forEach(ver => {
            const div = document.getElementById("versionServerModules")
            const p = document.createElement("p")
            
            p.textContent = ver
            div.appendChild(p)
        })
    })
}

loadData()