import React from 'react'
import { Container, InputGroup, Input, Button } from 'reactstrap';

import FacebookIcon from "../../Assets/Images/facebook_icon.svg";
import InstagramIcon from "../../Assets/Images/insta_icon.svg";
import TwitterIcon from "../../Assets/Images/twitter_icon.svg";
import MailIcon from "../../Assets/Images/mail_icon.svg";
import HeartIcon from "../../Assets/Images/heart_icon.svg";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <Container>
                    <div className="top_view">
                        <p className="medium_font">Subscribe to our newsletter</p>
                        <p>The latest news, AI models, and fun memes from the community!</p>
                        <InputGroup className="generated_input">
                            <Input type="text" placeholder="Enter your email..." />
                            <Button color="transparent" className="btn_primary">Subscribe</Button>
                        </InputGroup>
                    </div>
                    <div className="bottom_view">
                        <div className="social_links">
                            <a href="#" target="_blank">
                                <img src={FacebookIcon} alt="Facebook icon" className="img-fluid" />
                            </a>
                            <a href="#" target="_blank">
                                <img src={InstagramIcon} alt="Instagram icon" className="img-fluid" />
                            </a>
                            <a href="#" target="_blank">
                                <img src={TwitterIcon} alt="Twitter icon" className="img-fluid" />
                            </a>
                            <a href="#" target="_blank">
                                <img src={MailIcon} alt="Mail icon" className="img-fluid" />
                            </a>
                        </div>

                        <Button color="transparent" className="btn_secondary"><img src={HeartIcon} alt="Heart icon" />Support Us</Button>

                        <div className="links_view">
                            <a href="#" target="_blank">Privacy</a>
                            <a href="#" target="_blank">Terms</a>
                            <p>© 2022 Craiyon LLC. All rights reserved.</p>
                        </div>
                    </div>
                </Container>
            </footer>
        </>
    )
}

export default Footer