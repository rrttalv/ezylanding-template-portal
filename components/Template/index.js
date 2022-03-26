import Link from "next/link"

const Template = (props) => {

  const { thumbnail, altTag, tags, title, frameworkId, _id, priceRange, previewURL } = props 
  return (
        <div className="template-card card-shadow">
            <Link href={`/templates/${_id}`}>
              <a className="template-link" title={`Link to ${title} HTML template details page`}>
                <div className="template-card_img">
                  <img src={thumbnail} alt={altTag ? altTag : `${title} template preview picture`} className="template-card_image" />
                </div>
                </a>
            </Link>
          <div className="template-card_body">
            <div className="template-card_meta">
            <Link href={`/templates/${_id}`}>
              <a className="template-link" title={`Link to ${title} HTML template preview page`}>
                <h3 className="template-card_title">{title}</h3>
              </a>
            </Link>
              <div className="template-card_bottom">
                <div className="template-card_tags">
                  <span className="template-card_tags_tag">
                    #{frameworkId}
                  </span>
                  {
                    tags.map((tag, idx) => (
                      <span key={idx} className="template-card_tags_tag">
                        #{tag}
                      </span>
                    ))
                  }
                </div>
                <div className="template-card_options">
                  <span className="template-card_price">
                    {priceRange}
                  </span>
                  <div className="template-card_options_buttons">
                    <Link href={`${previewURL}`}>
                      <a target={"_blank"} className="btn-bordered" title={`Link to ${title} HTML template preview page`}>
                        Preview
                      </a>
                    </Link>
                    <Link href={`/templates/${_id}`}>
                      <a className="btn-bordered" title={`Link to ${title} HTML template preview page`}>
                        Buy
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )

}

export default Template