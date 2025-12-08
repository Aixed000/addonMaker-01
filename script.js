function slideSidebar() {
  const bar = document.getElementById("sidebar");
  const blurSb = document.getElementById("blurSidebar");
  
  document.body.classList.toggle("openSb");
  
  if (bar.style.left === "0px") {
    bar.style.left = "-50%";
    blurSb.style.opacity = 0;
    blurSb.style.pointerEvents = "none";
  } else {
    bar.style.left = "0px";
    blurSb.style.opacity = 1;
    blurSb.style.pointerEvents = "auto";
  }
}

function showPage(page) {
  const content = document.getElementById('main-middlebar');
  
  if (page === 'home') {
    document.getElementById('home').style.background = "var(--card-bg)"
    document.getElementById('mani').style.background = "var(--bg)"
    document.getElementById('ts').style.background = "var(--bg)"
    content.innerHTML = `
      <h1>Welcome to Add-on Creator</h1>
      <a>You can create and customize your own add-ons quickly and conveniently. Please note that this website is still in beta, so some features may not be available yet, and there may be some bugs. We apologize for any inconvenience.</a>
    `;
  } else if (page === 'manigen') {
    document.getElementById('home').style.background = "var(--bg)"
    document.getElementById('mani').style.background = "var(--card-bg)"
    document.getElementById('ts').style.background = "var(--bg)"
    content.innerHTML = `
    <div class="mani-setting">
        <h4>Add-on name</h4>
        <input type="text" id="mani_name" placeholder="name">
        <h4>Description</h4>
        <input type="text" id="mani_des" placeholder="description">
        <h4>Add-on version</h4>
        <div class="addon-ver">
          <input type="number" id="mani_ver1" placeholder="0">
          <input type="number" id="mani_ver2" placeholder="0">
          <input type="number" id="mani_ver3" placeholder="0">
        </div>
        <h4>Script entry</h4>
        <input type="text" id="mani_scriptentry" placeholder="index.js">
        <h4>Minecraft version</h4>
        <div class="menu-choice">
          <button onclick="loadChoices('minecraft_version')" class="btn-open-ch" id="btn_minecraft_version">Versions +</button>
          <div class="choices" id="minecraft_version"></div>
        </div>
        <h4>ServerAPI version</h4>
        <a>The API version matches the latest version of Minecraft, but it may vary depending on the game you're using. (Last updated on 29/11/2025)</a>
        <div class="menu-choice">
          <button onclick="loadChoices('server_ui_version')" class="btn-open-ch" id="btn_server_ui_version">Server UI +</button>
          <div class="choices" id="server_ui_version"></div>
        </div>
          <div class="menu-choice">
          <button onclick="loadChoices('server_version')" class="btn-open-ch" id="btn_server_version">Server +</button>
          <div class="choices" id="server_version"></div>
        </div>
        
        <button onclick="downloadManifest('bp')" class="btn_download">Downdload BP</button>
        <button onclick="downloadManifest('rp')" class="btn_download">Downdload RP</button>
      </div>
    `;
  } else if (page === 'comts') {
    document.getElementById('home').style.background = "var(--bg)"
    document.getElementById('mani').style.background = "var(--bg)"
    document.getElementById('ts').style.background = "var(--card-bg)"
    content.innerHTML = `
    <h1>Coming Soon</h1>
    `;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  showPage('home')
})

let jsonData = null;

const selectFunc = {
  "minecraft_version": select_minecraft_version,
  "server_version": select_server_version,
  "server_ui_version": select_server_ui_version
}


async function loadChoices(key) {
  const box = document.getElementById(key);
  box.classList.toggle("open");

  if (box.dataset.loaded === "true") return;

  if (!jsonData) {
    const res = await fetch("data.json");
    jsonData = await res.json();
  }
  
  const list = jsonData[key];
  const fn = selectFunc[key]
  
  list.forEach(item => {
    let text = "";

    if (Array.isArray(item)) {
      text = item.join(".");
    } 
    else {
      text = item;
    }
    
    const btn = document.createElement("button");
    btn.className = "choice-item";
    btn.textContent = text;
    btn.onclick = () => {
      fn(item)
      console.log(`btn_${key}`)
      document.getElementById(`btn_${key}`).textContent = `${text} +`
    }

    box.appendChild(btn);
  });

  box.dataset.loaded = "true";
}

let maniName = 'null'
let maniDes = 'null'
let maniSiptEntry = 'index.js'
let maniAdnver = [0, 0, 1]
let maniMcVersion = [1, 20, 0]
let maniSver = '1.0.0'
let maniSUIver = '1.0.0'

function select_minecraft_version(v) {
  if (Array.isArray(v)) {
    maniMcVersion = v
  }
}

function select_server_version(v) {
  maniSver = v
}
function select_server_ui_version(v) {
  maniSUIver = v
}

function generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
}

function downloadManifest(type) {
  
  maniName = document.getElementById("mani_name").value
  maniDes = document.getElementById("mani_des").value
  maniAdnver = [
    Number(document.getElementById("mani_ver1").value),
    Number(document.getElementById("mani_ver2").value),
    Number(document.getElementById("mani_ver3").value)
    ]
  maniSiptEntry = document.getElementById("mani_scriptentry").value == '' ? 'index.js' : document.getElementById("mani_scriptentry").value.endsWith('.js') ? document.getElementById("mani_scriptentry").value : document.getElementById("mani_scriptentry").value+'.js'
  
  const depUUIDBP = generateUUID()
  const depUUIDRP = generateUUID()
  
  const manifestBP = {
    format_version: 2,
    header: {
      name: maniName,
      description: maniDes,
      min_engine_version: maniMcVersion,
      version: maniAdnver,
      uuid: depUUIDBP
    },
    modules: [
      {
        description: "Behavior",
        type: "data",
        version: maniAdnver,
        uuid: generateUUID()
      },
      {
        type: "script",
        entry: maniSiptEntry,
        version: maniAdnver,
        uuid: generateUUID()
      }
      ],
      dependencies: [
        {
          uuid: depUUIDRP,
          version: maniAdnver
        },
        {
          module_name: "@minecraft/server",
          version: maniSver
        },
        {
          module_name: "@minecraft/server-ui",
          version: maniSUIver
        }
      ]
    }
      
  const manifestRP = {
    header: {
      name: maniName,
      description: maniDes,
      min_engine_version: maniMcVersion,
      version: maniAdnver,
      uuid: depUUIDRP
    },
    modules: [
      {
        description: "Resource",
        type: "resources",
        version: maniAdnver,
        uuid: generateUUID()
      }
      ],
      dependencies: [
        {
          uuid: depUUIDBP,
          version: maniAdnver
        }
      ]
    }
    
  if (type === 'bp') {
    const blob = new Blob([JSON.stringify(manifestBP, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifest.json";
    a.click();
  
    URL.revokeObjectURL(url);
  } else if (type === "rp") {
    const blob = new Blob([JSON.stringify(manifestRP, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifest.json";
    a.click();
    
    URL.revokeObjectURL(url);
  }
}
