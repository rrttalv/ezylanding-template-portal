
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
  let str = ' '
  if(attributes){
    attributes.forEach(attr => {
      const [key, val] = attr.split(':')
      if(!key || !val){
        return
      }
      str += `${key.trim()}="${val.trim()}" ` 
    })
  }else{
    str = ''
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


const getChildren = (elem, templateId, clientBuild = false, rawHTML = false) => {
  const { children, className, domID, tagName } = elem
  const style = getElementStyle(elem.style)
  const attributes = getElementAttributes(elem.attributes)
  const elementClass = getClass(className)
  const id = getID(domID)
  let str = ''
  const elemVarString = `${style}${attributes}${id}${elementClass}`
  const childString = `${children && children.length ? children.map(child => getChildren(child, templateId, clientBuild, rawHTML)).join('') : ''}`
  switch(elem.type){
    case 'section':
      str += `<section${elemVarString}>${childString}</section>\n`
      return str
    case 'form':
      str += `<form${elemVarString}>${childString}</form>\n`
      return str
    case 'div':
      str += `<div${elemVarString}>${childString}</div>\n`
      return str
    case 'svg':
      const regex = /<svg /ig
      const formattedContent = elem.content.replace(regex, `<svg${elemVarString} `)
      const svg = formattedContent.split('\n').join('')
      str += svg
      return str
    case 'link':
      let href = ''
      if(clientBuild){
        if(elem.href.includes('http') || elem.href.includes('mailto')){
          href = elem.href
        }else{
          if(elem.href.indexOf('#') === 0){
            href = elem.href
          }else{
            if(rawHTML){
              if(elem.href === '/'){
                href = 'index.html'
              }else{
                href = elem.href.indexOf('/') === 0 ? elem.href.replace('/', '') + '.html' : `${elem.href}.html`
              }
            }else{
              if(elem.href === '/'){
                href = elem.href
              }else{
                href = elem.href.indexOf('/') === 0 ? elem.href + '.html' : `/${elem.href}.html`
              }
            }
          }
        }
      }else{
        const hrefValue = elem.href.indexOf('/') === 0 ? elem.href.slice(1, elem.href.length) : elem.href
        const templatePath = `${process.env.APP_URL}/templates/template-preview/${templateId}`
        if(elem.href === '#'){
          href = '#'
        //If the href is an external link
        }else if(elem.href.includes('http') || elem.href.includes('www')){
          href = elem.href
        }else{
          href = `${templatePath}/${hrefValue}`
        }
        if(elem.href === '/'){
          href = `${templatePath}`
        }
      }
      str += `<a${elemVarString}${attributes}href="${href}">${elem.content ? elem.content : ''}${childString}</a>`
      return str
    case 'list':
      str += `<ul${elemVarString}${attributes}>${childString}</ul>`
      return str
    case 'listItem':
      str += `<li${elemVarString}${attributes}>${childString}</li>`
      return str
    case 'text':
      str += `<${tagName}${elemVarString}${attributes}>${elem.content}</${tagName}>`
      return str
    case 'img':
      str += `<img${elemVarString}${attributes}src="${elem.src}"/>`
      return str
    case 'input':
      str += `<input${elemVarString}${attributes}placeholder="${elem.placeholder ? elem.placeholder : `Text input`}"/>`
      return str
    case 'textarea':
      str += `<textarea${elemVarString}${attributes}placeholder="${elem.placeholder ? elem.placeholder : `Text input`}"></textarea>`
      return str
    case 'button':
      str += `<button${elemVarString}${attributes}>${children && children.length ? childString : elem.content}</button>`
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
    pageString += getStyleImports(cssFiles, palette)
  }
  pageString += '</head>\n'
  pageString += '<body>\n'
  targetPage.elements.forEach(element => {
    pageString += getChildren(element, templateId, clientBuild, buildProps.rawHTML)
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
    overflow-x: hidden;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }\n</style>\n`)
  styles.forEach(style => (
    styleTags.push(`\n<style type="text/css">\n${style.content}\n</style>\n`)
  ))
  styleTags.push(`\n<style type="text/css" id="PALETTES">${compilePaletteStr(palette)}</style>\n`)
  return styleTags.join('\n')
}

const getStyleImports = (styles, palette) => {
  const styleTags = []
  styles.forEach(style => {
    const name = style.name.includes('.css') ? style.name : style.name + '.css'
    styleTags.push(`<link rel="stylesheet" type="text/css" href="css/${name}"/>`)
  })
  styleTags.push(`<link rel="stylesheet" type="text/css" href="css/palette.css"/>`)
  return styleTags.join('\n')
}

const extractSVG = (elements) => {
  let svgContent = []
  elements.forEach(element => {
    if(element.type === 'svg'){  
      svgContent.push({
        content: element.content,
        name: element.fileName ? element.fileName : element.id + '.svg'
      })
    }
    if(element.children && element.children.length){
      svgContent = [...svgContent, ...extractSVG(element.children)]
    }
  })
  return svgContent
}

const getSVGFiles = template => {
  let svgFiles = []
  template.pages.forEach(page => {
    svgFiles = [...svgFiles, ...extractSVG(page.elements)]
  })
  return svgFiles
}

const compileFullTemplate = (template, frameworkId, templateId, buildProps = {}) => {
  const templateFiles = []
  const cssFiles = []
  template.pages.forEach(page => {
    //frameworkId, template, templateId
    const compiledPage = compileTemplatePage(frameworkId, template, templateId, page.route, true, buildProps)
    const fileName = page.route === '/' ? '/index.html' : page.route.replaceAll(/\//ig, '') + '.html'
    templateFiles.push({
      fileName,
      content: compiledPage
    })
  })
  template.cssFiles.forEach(file => {
    const rawName = buildProps.rawHTML ? file.name : '_' + file.name.replace(/.css/ig, '')
    const fileName = buildProps.rawHTML ? file.name : `${rawName}.scss`
    cssFiles.push({
      fileName,
      rawName,
      content: file.content
    })
  })
  cssFiles.push({
    fileName: buildProps.rawHTML ? `palette.css` : '_palette.scss',
    rawName: '_palette',
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
  getSVGFiles,
  compileTemplatePage,
  compileFullTemplate
}