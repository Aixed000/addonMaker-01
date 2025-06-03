function generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
}

function loadData() {
      fetch("data.json").then(r => r.json()).then(data => {
            const selectVersionMCPE = document.getElementById("type_version_minecraft")
            const selectVersionScript = document.getElementById("type_version_script_server")
            
            data.minecraft.forEach(mcpe => {
                  const option = document.createElement("option")
                  option.value = `${mcpe.version}`
                  option.textContent = `${mcpe.version[0]}.${mcpe.version[1]}.${mcpe.version[2]}`
                  selectVersionMCPE.appendChild(option)
                  
            })
      })
}

loadData()

function generateManifest() {
      
      
      
      const typeMani = document.getElementById("type_mani").value
      
      const vOne = parseInt(document.getElementById("vOne").value) || 1
      const vTwo = parseInt(document.getElementById("vTwo").value) || 0
      const vThree = parseInt(document.getElementById("vThree").value) || 0
      
      const minecraftVersion = JSON.parse(document.getElementById("type_version_minecraft").value) || JSON.parse("[1,21,80]")
      
      const nameManifest = document.getElementById("name").value || ""
      const desSctipManifest = document.getElementById("description").value || ""
      
      let entryScript = document.getElementById("script_entry").value || "main.js";
      entryScript = entryScript.endsWith(".js") ? "scripts/"+entryScript : "scripts/"+entryScript + ".js"
      const serverUiVersion = document.getElementById("type_version_script_server").value || "1.19.0"
      const serverVersion = document.getElementById("type_version_script_server-ui").value || "1.3.0"
      
      const dependencieUuidBP = generateUUID()
      const dependencieUuidRP = generateUUID()
      
      const behaviorMani = {
            format_version: 2,
            header: {
                name: nameManifest,
               description: desSctipManifest,
               min_engine_version: minecraftVersion,
               version: [vOne, vTwo, vThree],
               uuid: dependencieUuidBP
            },
            modules: [
            {
                description: "Behavior",
                type: "data",
                version: [vOne, vTwo, vThree],
                uuid: generateUUID()
            },
            {
                type: "script",
                entry: entryScript,
                version: [vOne, vTwo, vThree],
                uuid: generateUUID()
            }
            ],
        dependencies: [
          {
              uuid: dependencieUuidRP,
              version: [vOne, vTwo, vThree]
          },
          {
              module_name: "@minecraft/server",
              version: serverVersion
          },
          {
              module_name: "@minecraft/server-ui",
              version: serverUiVersion
          }
        ]
      }
      
      const resourceMani = {
            header: {
                name: nameManifest,
               description: desSctipManifest,
               min_engine_version: minecraftVersion,
               version: [vOne, vTwo, vThree],
               uuid: dependencieUuidRP
            },
            modules: [
            {
                description: "Resource",
                type: "resources",
                version: [vOne, vTwo, vThree],
                uuid: generateUUID()
            }
            ],
            dependencies: [
            {
              uuid: dependencieUuidBP,
              version: [vOne, vTwo, vThree]
            }
            ]
      }
      
      if (typeMani == "behavior") {
            document.getElementById("texttocopyBehav").innerText = JSON.stringify(behaviorMani, null , 2)
            document.getElementById("texttocopyRes").innerText = ""
      } else if (typeMani == "resource" ) {
            document.getElementById("texttocopyRes").innerText = JSON.stringify(resourceMani, null , 2)
            document.getElementById("texttocopyBehav").innerText = ""
      } else if (typeMani == "behavior/resource") {
            document.getElementById("texttocopyBehav").innerText = JSON.stringify(behaviorMani, null , 2)
            document.getElementById("texttocopyRes").innerText = JSON.stringify(resourceMani, null , 2)
      }
}

function copyText(typeCopy) {
      if (typeCopy == "BP") {
            const text = document.getElementById("texttocopyBehav").innerText
            navigator.clipboard.writeText(text).then(() => {
                  alert("copy")
            })
      }
      if (typeCopy == "RP") {
            const text = document.getElementById("texttocopyRes").innerText
            navigator.clipboard.writeText(text).then(() => {
                  alert("copy")
                  })
      }
      }