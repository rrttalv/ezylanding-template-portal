import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

const Sidebar = props => {
  
  const [open, toggleOpen] = useState(false)

  const router = useRouter()

  const { className, content, style } = props

  return (
    <div style={style ? style : {}} className={`sidebar ${className} ${open ? 'open' : 'closed'}`}>
    <button onClick={() => toggleOpen(!open)} className="btn-none sidebar_toggle">
      <div />
      <div />
      <div />
    </button>
      <div className="sidebar_content">
        {
          content.map((item => {
            const { linkPath, icon, linkTitle, label } = item
            const itemClassName = router.asPath === item.linkPath ? ' active' : ''
            return (
              <div 
                key={linkPath}
                className={`sidebar_item${itemClassName}`}
              >
                <Link href={linkPath}>
                  <a title={linkTitle ? linkTitle : `Link to ${linkPath}`}>
                    {icon}
                    <span className="sidebar_item-label">
                      {label}
                    </span>
                  </a>
                </Link>
                {
                  item.subLinks ? (
                    <div className="sidebar_item-sublinks">
                      {
                        item.subLinks.map(nestedItem => {
                          return (
                            <Link key={nestedItem.linkPath} href={nestedItem.linkPath}>
                              <a title={nestedItem.linkTitle ? nestedItem.linkTitle : `Link to ${nestedItem.linkPath}`}>
                                <span className="sidebar_item-sublinks_label">
                                  {nestedItem.label}
                                </span>
                              </a>
                            </Link>
                          )
                        })
                      }
                    </div>
                  )
                  :
                  undefined
                }
              </div>
            )
          }))
        }
      </div>
    </div>
  )

}

export default Sidebar