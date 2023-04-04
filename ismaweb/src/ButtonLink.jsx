function ButtonLink ({link, fabicon, nameButton, moreClasses}) {
    const classes = `btn-link ${moreClasses}`;
  
    return (
      <a href={link} target="_blank">
        <button type="button" className={classes}>
          <i className={`fab fa-${fabicon}`}></i> {nameButton}
        </button>
      </a>
    );
  }

export default ButtonLink;