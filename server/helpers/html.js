
const frameworkMap = {
  bootstrap: {
    start: [
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" crossorigin="anonymous">'
    ],
    end: [
      '<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>'
    ]
  }
}

const camelToDash = str => str
  .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
  .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

const getElementStyle = style => {
  let str = ''
  const keys = Object.keys(style)
  if(keys.length){
    str += ` style="`
  }
  keys.forEach(key => {
    const dashKey = camelToDash(key)
    str += `${dashKey}: ${style[key]};`
  })
  if(keys.length){
    str += '" '
  }
  return str
}

const getElementAttributes = attributes => {
  let str = ''
  if(attributes){

  }
  return str
}

const getClass = name => {
  let str = ' '
  if(name && name.length){
    str = ` class="${name}" ` 
  }
  return str
}

const getID = id => {
  let str = ''
  if(id && id.length){
    str = ` id=${id} `
  }
  return str
}


const getChildren = (elem, templateId, clientBuild = false) => {
  const { children, className, domID, tagName } = elem
  const style = getElementStyle(elem.style)
  const attributes = getElementAttributes(elem.attributes)
  const elementClass = getClass(className)
  const id = getID(domID)
  let str = ''
  const elemVarString = `${style}${attributes}${id}${elementClass}`
  const childString = `${children && children.length ? children.map(child => getChildren(child, templateId, clientBuild)).join('') : ''}`
  switch(elem.type){
    case 'section':
      str += `<section${elemVarString}>${childString}</section>\n`
      return str
    case 'div':
      str += `<div${elemVarString}>${childString}</div>\n`
      return str
    case 'svg':
      const regex = /<svg /ig
      const svg = elem.content.replace(regex, `<svg ${elemVarString} `)
      str += svg
      return svg
    case 'link':
      let href = ''
      if(clientBuild){
        if(elem.href.includes('http')){
          href = elem.href
        }else{
          if(elem.href.indexOf('#') === 0){
            href = elem.href
          }else{
            href = elem.href.indexOf('/') === 0 ? elem.href + '.html' : `/${elem.href}.html`
          }
        }
      }else{
        const hrefValue = elem.href.indexOf('/') === 0 ? elem.href.slice(1, elem.href.length) : elem.href
        const templatePath = `${process.env.APP_URL}/templates/template-preview/${templateId}`
        let href = ''
        if(elem.href === '#'){
          href = '#'
        }else{
          href = `${templatePath}/${hrefValue}`
        }
        if(elem.href === '/'){
          href = `${templatePath}`
        }
      }
      str += `<a${elemVarString}href="${href}">${elem.children && elem.children.length && !elem.content ? childString : elem.content}</a>`
      return str
    case 'list':
      str += `<ul${elemVarString}>${childString}</ul>`
      return str
    case 'listItem':
      str += `<li${elemVarString}>${childString}</li>`
      return str
    case 'text':
      str += `<${tagName}${elemVarString}>${elem.content}</${tagName}>`
      return str
    case 'img':
      str += `<img${elemVarString}src="${elem.src}"/>`
      return str
    case 'input':
      str += `<input${elemVarString}placeholder="${elem.placeholder ? elem.placeholder : `Text input`}"/>`
      return str
    case 'textarea':
      str += `<textarea${elemVarString}placeholder="${elem.placeholder ? elem.placeholder : `Text input`}"></textarea>`
      return str
    case 'button':
      str += `<button${elemVarString}>${children && children.length ? childString : elem.content}</button>`
    default:
      str += ''
      return str
  }
}

const compileTemplatePage = (frameworkId, template, templateId, targetRoute, clientBuild = false, buildProps = {}) => {
  const targetPage = template.pages.find(({ route }) => route === targetRoute)
  if(!targetPage){
    return '<div>404 - Page does not exist</div>'
  }
  const { start, end } = frameworkMap[frameworkId]
  let pageString = '<html lang="en"><head><meta charset="utf-8">'
  const { metaTitle, metaDescription } = targetPage.routeMeta
  const { cssFiles, pages, palette } = template
  pageString += `<title>${metaTitle}</title>`
  start.forEach(tag => {
    pageString += tag
  })
  //If its not the final build then add CSS and other inline tags
  if(!clientBuild){
    pageString += getStyles(cssFiles, palette)
  }
  //Need to include the paths to local css files into the head
  if(clientBuild && buildProps.rawHTML){

  }
  pageString += '</head>\n'
  pageString += '<body>\n'
  targetPage.elements.forEach(element => {
    pageString += getChildren(element, templateId, clientBuild)
  })
  pageString += '</body>\n'
  end.forEach(tag => {
    pageString += tag
  })
  pageString += '\n</html>'
  return pageString
}

const compilePaletteStr = palette => {
  let str = '\n:root {'
  palette.forEach(item => {
    str += `\n  ${item.var}: ${item.value};`
  })
  str += '\n}'
  return str
}

const getStyles = (styles, palette) => {
  const styleTags = []
  styleTags.push(`\n<style type="text/css">
  html {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
  }\n</style>\n`)
  styles.forEach(style => (
    styleTags.push(`\n<style type="text/css">\n${style.content}\n</style>\n`)
  ))
  styleTags.push(`\n<style type="text/css" id="PALETTES">${compilePaletteStr(palette)}</style>\n`)
  return styleTags.join('\n')
}

const compileFullTemplate = (template, frameworkId, templateId, buildProps = {}) => {
  const templatePages = []
  const cssFiles = []
  template.pages.forEach(page => {
    //frameworkId, template, templateId
    const compiledPage = compileTemplatePage(frameworkId, template, templateId, page.route, true, buildProps)
    const fileName = page.route === '/' ? 'index.html' : page.route.replaceAll(/\//ig, '') + '.html'
    templateFiles.push({
      fileName,
      content: compiledPage
    })
  })
  template.cssFiles.forEach(file => {
    const rawName = file.name.replace(/.css/ig, '')
    const fileName = buildProps.rawHTML ? file.name : `_${rawName}.scss`
    cssFiles.push({
      fileName,
      rawName,
      content: file.content
    })
  })
  cssFiles.push({
    fileName: buildProps.rawHTML ? `palette.css` : '_palette.scss',
    content: compilePaletteStr(template.palette)
  })
  if(!buildProps.rawHTML){
    let appScssContent = ''
    cssFiles.forEach(file => {
      appScssContent += `@import '${file.rawName}';\n`
    })
    cssFiles.push({
      fileName: 'app.scss',
      rawName: 'app',
      content: appScssContent
    })
  }
  return { templateFiles, cssFiles }
}

module.exports = { 
  compileTemplatePage,
  compileFullTemplate
}