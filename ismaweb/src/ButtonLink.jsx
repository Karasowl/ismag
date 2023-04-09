import './ButtonLink.css';

function ButtonLink ({link, fabicon, nameButton, moreClasses, inOnclick}) {
    const classes = `btn-link ${moreClasses}`;
  
    return (
      <a 
      href={link} target="_blank">
        <button 
        type="button" 
        className={classes}
        onClick={(event) => inOnclick(event, nameButton)}
        >
          <i className={`fab fa-${fabicon}`}></i> {nameButton}
        </button>
      </a>
    );
  }

export default ButtonLink;