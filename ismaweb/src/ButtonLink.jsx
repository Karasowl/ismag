import './ButtonLink.css';

function ButtonLink ({link, fabicon, nameButton, moreClasses}) {
    const classes = `btn-link ${moreClasses} ${fabicon}`;
  
    return (
      <a 
      href={link} target="_blank">
        <button 
        type="button" 
        className={classes}
        id={`${fabicon}_ButtonLink`}
        >
          <i className={`fab fa-${fabicon}`}></i> {nameButton}
        </button>
      </a>
    );
  }

export default ButtonLink;