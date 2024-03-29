import React, { useState, useEffect, useRef } from 'react';
import {
    InputGroup, Input, Button, Accordion, AccordionBody, AccordionHeader, AccordionItem, Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';
import ImageIcon from "../../Assets/Images/image_icon.svg";
import StarIconLarge from "../../Assets/Images/staricon01.svg";
import StarIconSmall from "../../Assets/Images/staricon02.svg";
// import CameraIcon from "../../Assets/Images/camera_iocn.svg";
import DownloadIcon from "../../Assets/Images/download_icon.svg";
import CloseIcon from "../../Assets/Images/close_icon.svg";
import LeftGlowcone from "../../Assets/Images/left_glowcone.png";
import RightGlowcone from "../../Assets/Images/right_glowcone.png";
import LoaderGif from "../../Assets/Images/loader.gif";
import TextLogo from "../../Assets/Images/text_logo.png";
import Logo from '../../Assets/Images/logo.png';
import LogoText from '../../Assets/Images/text_logo.png';
import { Configuration, OpenAIApi } from "openai";
import Base64Downloader from 'react-base64-downloader';


// import classNames from 'classnames';

const Home = () => {
    const [isOpen, setIsOpen] = useState(true);

    // const Navbartoggle = () => setIsOpen(!isOpen);
    const scollToRef = useRef();

    //States
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState('');
    const [result, setResult] = useState("");
    const [prompt, setPrompt] = useState("");
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [intVal, setIntVal] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    //Accordian Toggle
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    useEffect(() => {
        if (running) {
            let intv = setInterval(() => {
                setTime(prevTime => (prevTime + 0.1));
            }, 200);
            setIntVal(intv);
        } else if (!running) {
            clearInterval(intVal);
            setTime(0);
        }
    }, [running]);

    //OpenAI API integration
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_VITE_OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    //Generate Image Button Function
    const generateImage = async () => {
        setResult("");
        if (prompt.length > 0) {
            setLoading(true);
            setRunning(true);

            const res = await openai.createImage({
                prompt: prompt,
                n: 3,
                size: "1024x1024",
                response_format: "b64_json"
            });

            setResult(res.data.data);

            setTimeout(() => {
                setRunning(false);
                setLoading(false);
                setTime(0);
            }, 1800);
        }
    };

    //Image Preview
    const imagePreview = (image) => {
        setPreviewImage(image);
        setShowPopup(true);
    }

    return (
        <>
            <header className="header">
                <Container>
                    <Navbar color="transparent" expand="md" container="">
                        <NavbarBrand href="/">
                            <img src={Logo} className="img-fluid" alt="Bitcone" />
                            <img src={LogoText} className="img-fluid" alt="Bitcone" />
                        </NavbarBrand>
                        {/* <NavbarToggler onClick={Navbartoggle} /> */}
                        <a href="/" className="btn btn_primary d-md-none d-inline-flex">Connect Wallet</a>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ms-auto" navbar>
                                <NavItem>
                                    <NavLink href="#" onClick={() => scollToRef.current.scrollIntoView()} className='d-md-inline-flex d-none'>FAQ</NavLink>
                                    <NavLink href="#" onClick={() => scollToRef.current.scrollIntoView()} className='btn btn_primary_outline d-md-none d-inline-flex'>FAQ</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://quickswap.exchange/#/swap/v2?currency0=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&currency1=0xbA777aE3a3C91fCD83EF85bfe65410592Bdd0f7c" target="_blank" className="btn btn_primary_outline">Buy BitCone</NavLink>
                                </NavItem>
                                <NavItem className='d-md-inline-flex d-none'>
                                    <NavLink href="/" className="btn btn_primary">Connect Wallet</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </header>

            <section className="generated_image_sec">
                <Container>
                    <div className="inner_view">
                        <div className="heading text-center">
                            <div className="heading_logo">
                                <img src={LeftGlowcone} alt="Glowcone" className="img-fluid mobile_left" />
                                <img className="img-fluid" src={TextLogo} alt="logo" />
                                <img src={RightGlowcone} alt="Glowcone" className="img-fluid mobile_right" />
                            </div>
                            <h1><img src={LeftGlowcone} alt="Glowcone" className="img-fluid" /><span>Use BitCone (CONE) to Generate<br className='d-md-none d-block' /> A.I. Images online from text</span><img src={RightGlowcone} alt="Glowcone" className="img-fluid" /></h1>
                            <p>And Directly Mint Them as NFT!</p>
                        </div>
                        <InputGroup className="generated_input">
                            <Input type="text" placeholder="Enter a prompt for the image you'd like to generate :)" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                            <Button color="transparent" className="btn_primary" onClick={generateImage} disabled={!prompt || loading}>
                                {loading ? "Creating..." : "Create Images"}
                            </Button>
                        </InputGroup>

                        {result.length > 0 ? <>
                            {!showPopup &&
                                <div className="results">
                                    {result.map((item, index) => {
                                        const imgUrl = 'data:image/png;base64,' + item.b64_json;
                                        return (
                                            <div className="result-image" key={index} onClick={() => imagePreview(imgUrl)}>
                                                <img className="img-fluid" src={imgUrl} alt="result" />
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            {showPopup &&
                                <div className="result_preview_image">
                                    <div className="close_img">
                                        <Base64Downloader className="btn btn-transparent" base64={previewImage} downloadName={prompt}>
                                            <img src={DownloadIcon} alt="Download icon" className="img-fluid" />
                                        </Base64Downloader>
                                        <Button type="button" color="transparent" onClick={() => setShowPopup(false)}>
                                            <img src={CloseIcon} alt="Close icon" className="img-fluid" />
                                        </Button>
                                    </div>
                                    <img className="img-fluid" src={previewImage} alt="result" />
                                </div>
                            }
                        </>
                            :
                            (
                                <>
                                    <div className="image_loader_view">
                                        {loading && <>
                                            <div className="loader">
                                                <img src={LoaderGif} alt="Loader" className="img-fluid" />
                                            </div>
                                            <div className="timer">{time.toFixed(1)}</div>
                                        </>}
                                        {!loading && <div className="img_icon_text mix-blend-screen d-flex align-items-center justify-content-center">
                                            <p>Set your creativity free!</p>
                                            <div className="star">
                                                <img src={ImageIcon} alt="Empty state illustration" height="80" width="80" className="img-fluid" />
                                                <img src={StarIconLarge} alt="Star icon" height="24" width="24" className="star01 img-fluid" />
                                                <img src={StarIconSmall} alt="Star icon 2" height="16" width="16" className="star02 img-fluid" />
                                            </div>
                                        </div>}
                                    </div>
                                </>
                            )
                        }


                        <div className="faqs_view" ref={scollToRef}>
                            <h2>Frequently asked questions</h2>

                            <Accordion open={open} toggle={toggle}>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="1">What is BitCone.ai?</AccordionHeader>
                                    <AccordionBody accordionId="1">
                                        <p>BitCone.ai is the first Dapp utility for BitCones (CONE)!</p>
                                        <p className="mb-0">Use BitCones to create 9 high quality A.I. generated images, then Mint them right to your wallet as an NFT!</p>
                                        <p>Just pay a small fee in (CONE) to use our A.I. model that can generate images from any text prompt!</p>
                                        <p>For each fee of 2,663,000 (CONE) tokens, 9 images will be generated by the A.I. for the prompt entered.</p>
                                        <p>If you are satisfied with any of the images presented, you can easily mint it as a NFT, directly from within the Dapp!</p>
                                        <p>(They will appear in your OpenSea profile)</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="2">How much does it cost to generate A.I. images?</AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <p>In order to support hosting costs, as well as API access for the A.I. used in the backend, a small fee is charged in BitCone (CONE) in order to access the A.I. image generation tool.</p>
                                        <p>Payment in BitCones (CONE) is only required in order to generate the A.I. image variants.</p>
                                        <p>The NFT minter is then free, aside from the Gas fee for Minting the NFT image to the Blockchain.</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="3">How can I turn my images generated into NFT?</AccordionHeader>
                                    <AccordionBody accordionId="3">
                                        <p>Liked 1 of more of the variants generated? You can then easily Mint the image into an NFT with Bitcone.ai, directly from the Dapp! </p>
                                        <p>Simple choose the desired image (1 at a time) and click “Mint” to deploy the NFT on to the Polygon blockchain!</p>
                                        <p>(Users must still pay the blockchain's gas minting Fee in (MATIC) in order to mint.)</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="4">Any tips to generate better images?</AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <p>Try to visualize your image idea in advance, and do your best to be specific.</p>
                                        <p>Here are a few examples of keywords that can be interesting to experiment with: “digital art”, "3D", "photorealistic", "high definition"…</p>
                                        <p>We've seen so many cool tricks from the conemunity, so you should definitely check what others do for inspiration and ask fellow Coners what they used!</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="5">How does the Minting and A.I. modeling work?</AccordionHeader>
                                    <AccordionBody accordionId="5">
                                        <p>The Dapp uses a web3 injection to connect your Wallet address to the blockchain for minting the NFT. </p>
                                        <p>The A.I. model used in generating images is a variation of OpenAI's generator: "DALL-E". The model is trained using <a className="underline" target="_blank" href="https://sites.research.google/trc" rel="noreferrer">Google TRC</a>.</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="6">Can you make larger images?</AccordionHeader>
                                    <AccordionBody accordionId="6">
                                        <p> Not at the moment but we plan to make it possible in the future.</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="7">Can I use the images generated through Bitcone.ai to Mint NFT?</AccordionHeader>
                                    <AccordionBody accordionId="7">
                                        <p>Yes! Images can be Minted as NFT right from within the Dapp.</p>
                                        <p className="mb-0">As long as images created respect other's copyright, feel free to use the generator as you wish for personal use. Whether you want to mint NFT for your own collection, share them with your friends in r/ConeHeads, or even print on a T-shirt.</p>
                                        <p>(Please credit bitcone.ai for the images, so more coners can find us!)</p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader tag="div" targetId="8">How can I support Bitcone.ai?</AccordionHeader>
                                    <AccordionBody accordionId="8">
                                        <p>By simply using the bitcone.ai Dapp you are already supporting it!</p>
                                        <p>You can also choose to give a percentage of the Creator fees to the Official BitCone Deployer Address to conetribute to the BitCone LP: </p>
                                        <p>bitcones.eth </p>
                                        <p>or</p>
                                        <p>0x7e7c3543C4426B9E149a837eE843c4aD730738e4</p>
                                        <p>We always welcome feedback from our conemunity on how to better BitCone & BitCone.ai! </p>
                                        <p className="mb-0">If you're interested in supporting BitCone in additional ways, please conesider purchasing one of the <a className="underline" href="https://opensea.io/thebitcone" target="_blank" rel="noreferrer">Official BitCone NFT</a> on OpenSea [https://opensea.io/thebitcone]. </p>
                                        <p className="mb-0">As well you can conetribute to BitCone directly by providing liquidity to one of the (CONE)  <a className="underline" href="https://quickswap.exchange/#/pools/v2?currency0=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&currency1=0xbA777aE3a3C91fCD83EF85bfe65410592Bdd0f7c" target="_blank" rel="noreferrer">Liquidity Pools on Quickswap!</a></p>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>

                            <div className="text-center mt-5">
                                <a href="https://quickswap.exchange/#/swap/v2?currency0=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&currency1=0xbA777aE3a3C91fCD83EF85bfe65410592Bdd0f7c" className="btn btn_primary" rel="noreferrer" target="_blank">Purchase BitCones</a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Home