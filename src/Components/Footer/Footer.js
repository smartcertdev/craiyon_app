import React from 'react'
import { Container, Button } from 'reactstrap';

import MediumIcon from "../../Assets/Images/medium_icon.png";
import DiscordIcon from "../../Assets/Images/discord_icon.png";
import TwitterIcon from "../../Assets/Images/twitter_icon.png";
import OpenseaIcon from "../../Assets/Images/opensea_icon.png";

import RedditIcon from "../../Assets/Images/reddit_icon.png";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <Container>
                    <div className="top_view">
                        <p className="medium_font">Join the r/ConeHeads Conemunity!</p>
                        <p>The latest news, AI models, and fun memes from the community!</p>
                        <a href="https://www.reddit.com/r/ConeHeads/" className="btn btn_primary"><img src={RedditIcon} alt="Reddit Icon" className="img-fluid" /> Cone</a>
                    </div>
                    <div className="bottom_view">
                        <div className="social_links">
                            <a href="https://twitter.com/BitCone_CONE" target="_blank" rel="noreferrer">
                                <img src={TwitterIcon} alt="Twitter icon" className="img-fluid" />
                            </a>
                            <a href="https://bitcone.medium.com/" target="_blank" rel="noreferrer">
                                <img src={MediumIcon} alt="Medium icon" className="img-fluid" />
                            </a>
                            <a href="https://discord.com/invite/fHeXGeFMH2" target="_blank" rel="noreferrer">
                                <img src={DiscordIcon} alt="Discord icon" className="img-fluid" />
                            </a>
                            <a href="https://opensea.io/theBitCone?tab=created" target="_blank" rel="noreferrer">
                                <img src={OpenseaIcon} alt="Opensea icon" className="img-fluid" />
                            </a>
                        </div>

                        <a href="https://bitcone.lol" className="btn btn_secondary" rel="noreferrer">Bitcone.lol</a>

                        <div className="links_view">
                            <p>© 2023 bitcone.ai. All rights reserved.</p>
                        </div>
                    </div>
                </Container>
            </footer>
        </>
    )
}

export default Footer