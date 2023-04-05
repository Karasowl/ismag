import './Mailchimp.css'
import { useState } from 'react'

 
function Mailchimp() {

  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


    return (
      <div className="mailchimp">
        {/* Begin Mailchimp Signup Form */}
        <div id="mc_embed_signup">
          <form
            action="https://gmail.us20.list-manage.com/subscribe/post?u=b8857f8cacf5dadfb6ad35c33&amp;id=e704b91629&amp;f_id=00b20beaf0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_self"
          >
            <div id="mc_embed_signup_scroll">
              <h2>¿Te gusta lo que hago?</h2>
              <div className="indicates-required">
                <span className="asterisk">*</span>
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">
                  Pon tu correo y te mantendré al tanto:<span className="asterisk">*</span>
                </label>
                <input
             type="email"
                value={email}
                onChange={handleEmailChange}
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                required
                />
                <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
              </div>
              <div id="mce-responses" className="clear foot">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                ></div>
              </div>{" "}
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
              <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                <input
                  type="text"
                  name="b_b8857f8cacf5dadfb6ad35c33_e704b91629"
                  tabindex="-1"
                  value=""
                />
              </div>
              <div className="optionalParent">
                <div className="clear foot">
                  <input
                    type="submit"
                    value="Suscribirme"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  />
                  <p className="brandingLogo">
                    <a
                      href="http://eepurl.com/hSSXxT"
                      title="Mailchimp - email marketing made easy and fun"
                    >
                      <img
                        src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"
                        alt="Mailchimp logo"
                      />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form> 
        </div>
        {/*End mc_embed_signup*/}
        </div>
    );
}

export default Mailchimp;
  