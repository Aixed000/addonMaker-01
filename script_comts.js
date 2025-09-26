async function pasteTs() {
  try {
    const codeTs = document.getElementById("codeTs")
    const text = await navigator.clipboard.readText()
    
    codeTs.textContent = text
    Prism.highlightElement(codeTs)
  } catch (err) {
    alert(err)
  }
}

function clearTs() {
  try {
    const codeTs = document.getElementById("codeTs")
    
    codeTs.textContent = ''
    Prism.highlightElement(codeTs)
  } catch (err) {
    alert(err)
  }
}
function clearJs() {
  try {
    const codeJs = document.getElementById("codeJs")
    
    codeJs.textContent = ''
    Prism.highlightElement(codeJs)
  } catch (err) {
    alert(err)
  }
}

async function compile() {
  const codeTs = document.getElementById("codeTs")
  const codeJs = document.getElementById("codeJs")
  
  try {
    const tsCode = codeTs.textContent
    
    const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2017 }
    }).outputText
    
    codeJs.textContent = jsCode
    Prism.highlightElement(codeJs)
    
  } catch (err) {alert("error :"+err)}
}

async function copy() {
  try {
    const codeJs = document.getElementById("codeJs")
    const text = codeJs.textContent
  
    await navigator.clipboard.writeText(text)
  } catch (err) {alert("Error: "+err)}
}