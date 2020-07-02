import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

const MainPage = () => {
  return (
    <div className="container">
      <div className="main">
        <div className="main__header">
          <div className="header-title">AppCo</div>
          <div className="main__header__subtitle"><span>Brainstorming</span> for desired perfect Usability</div>
          <div className="main__header__description">
            Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!
          </div>
          <button className="main__header__button">
            <Link to="/stats">Views Stats</Link>
          </button>

          <div className="mobile"/>
        </div>

        <div className="main__adventages">
          <div className="main__adventages__title">Why <span>small business owners love</span> AppCo?</div>
          <div className="main__adventages__subtitle">
            Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!
          </div>
          <div className="card">
            <div className="card__design">
              <div className="card__design__img"></div>
              <div className="card__design__title">Clean Design</div>
              <div className="card__design__subtitle">Increase sales by showing true dynamics of your website.</div>
            </div>
            <div className="card__secure">
              <div className="card__secure__img"></div>
              <div className="card__secure__title">Secure Data</div>
              <div className="card__secure__subtitle">
                Build your online store’s trust using Social Proof & Urgency.
              </div>
            </div>
            <div className="card__retina">
              <div className="card__retina__img"></div>
              <div className="card__retina__title">Retina Ready</div>
              <div className="card__retina__subtitle">
                Realize importance of social proof in customer’s purchase decision.
              </div>
            </div>
          </div>
        </div>

        <div className="main__footer">
          <form>
            <input type="email" placeholder="Enter your email"/>
            <button>Subscribe</button>
          </form>

          <Footer/>
        </div>
      </div>

    </div>
  );
};

export default MainPage;
