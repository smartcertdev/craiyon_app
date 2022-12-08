import React, { useState, useEffect } from 'react';
import { InputGroup, Input, Button, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import DrawIcon from "../../Assets/Images/download.png";
import ImageIcon from "../../Assets/Images/image_icon.svg";
import StarIconLarge from "../../Assets/Images/staricon01.svg";
import StarIconSmall from "../../Assets/Images/staricon02.svg";
import CameraIcon from "../../Assets/Images/camera_iocn.svg";
import { Configuration, OpenAIApi } from "openai";

const Home = () => {
    //States
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState('1');
    const [result, setResult] = useState("");
    const [prompt, setPrompt] = useState("");
    const [time, setTime] = useState('');
    // const [interval, setInterval] = useState(0);
    
    const [running, setRunning] = useState(false);

    //Timer
    
    useEffect(() => {
        debugger
        let interval;
        if (running) {
            interval = setInterval((index) => {
                debugger;
                setTime(time + 10);
                console.log("timer running");
            }, 100);
        } else if (!running) {
            clearInterval(interval);
        }
        // return () => clearInterval(interval);
    }, [running]);

    //Accordian Toggle
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    //OpenAI API integration
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_VITE_OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
   

    //Generate Image Button Function
    const generateImage = async () => {
        if (prompt !== "") {
            // startTimer();

            

            setLoading({ loading: true });

            setRunning(true);
            const res = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });
            setResult(res.data.data);
            setRunning(false);
        } else {
            setLoading({ loading: false });
            setResult("");
            setPrompt("");
        }
    };

    return (
        <section className="generated_image_sec">
            <div className="heading text-center">
                <h1>Cr<span className="text_orange">ai</span>yon <span className="normal_font">(Formerly DALL-E Mini)</span></h1>
                <p>Free online AI image generator from text</p>
            </div>
            <div className="inner_view">
                <InputGroup className="generated_input">
                    <Input type="text" placeholder="What image do you want to generate..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                    <Button color="transparent" disabled={!prompt} className="btn_primary" onClick={generateImage} ><img src={DrawIcon} alt="draw" className="img-fluid" />Draw</Button>
                </InputGroup>

                {result.length > 0 ?
                    <div className="results">
                        {result.map((item, index) => {
                            return (
                                <div className="result-image" key={index}>
                                    <img className="img-fluid" src={item.url} alt="result" />
                                </div>
                            )
                        })}
                    </div> : (
                        <>
                            <div className="image_loader_view">
                                {loading && <>
                                    <div className="loader">
                                        <i className="fa fa-spinner fa-pulse"></i>
                                        <p>This should not take long (up to 2 minutes)...</p>
                                    </div>
                                    <div className="timer">
                                       <span>{time}</span>
                                    </div>
                                </>}
                                {!loading && <div className="img_icon_text mix-blend-screen d-flex align-items-center justify-content-center">
                                    <div className="star">
                                        <img src={ImageIcon} alt="Empty state illustration" height="80" width="80" className="img-fluid" />
                                        <img src={StarIconLarge} alt="Star icon" height="24" width="24" className="star01 img-fluid" />
                                        <img src={StarIconSmall} alt="Star icon 2" height="16" width="16" className="star02 img-fluid" />
                                    </div>
                                    <p>Generated images will appear here!</p>
                                </div>}
                            </div>
                        </>
                    )}
            

                <div className="screen_s_btn text-center">
                    <Button color="transparent" className="btn_secondary">
                        <img src={CameraIcon} alt="camera icon" className="img-fluid" /> Screenshot
                    </Button>
                </div>
                {/* <div className="result_view text-center">
                    <p>Share your results on the <a className="underline" href="javascript:void(0);" target="_blank" rel="noreferrer">forum!</a></p>
                    <p>Join our <a className="underline" href="javascript:void(0);">newsletter</a> and <br className="d-md-none d-block" /> be first to learn about premium access</p>
                </div> */}

                <div className="faqs_view">
                    <h2>Frequently asked questions</h2>

                    <Accordion open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="1">What is craiyon?</AccordionHeader>
                            <AccordionBody accordionId="1"><p>Craiyon, formerly DALL·E mini, is an AI model that can draw images from any text prompt!</p></AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="2">Are you related to DALL·E mini?</AccordionHeader>
                            <AccordionBody accordionId="2">
                                <p>Yes, <a className="underline" href="https://twitter.com/borisdayma" target="_blank" rel="noreferrer"> Boris Dayma </a> (who trained the current version of the AI model) and <a className="underline" href="https://twitter.com/pcuenq" target="_blank" rel="noreferrer"> Pedro Cuenca </a> (who worked on the backend) are both part of the craiyon team. You can find more details in the <a className="underline" href="https://huggingface.co/dalle-mini/dalle-mini" target="_blank" rel="noreferrer"> DALL·E mini model card</a>!</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="3">How do you keep it free?</AccordionHeader>
                            <AccordionBody accordionId="3"><p>The model requires a lot of compute so we rely on ads and donations to pay for our servers.</p></AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="4">Do you have any tips to create better images?</AccordionHeader>
                            <AccordionBody accordionId="4"><p>It's always a good idea to be specific. Here are a few keywords that can be interesting to experiment with: "illustration", "photorealistic", "high definition"… We've seen so many cool tricks from the community so you should definitely check what others do for inspiration!</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="5">How does the AI model work?</AccordionHeader>
                            <AccordionBody accordionId="5">
                                <p>The model used is called "DALLE mini", specifically the larger version also known as "DALLE mega" and is trained using <a className="underline" href="https://sites.research.google/trc" target="_blank" rel="noreferrer"> Google TRC</a>. You can find more details in the <a className="underline" href="https://wandb.ai/dalle-mini/dalle-mini/reports/DALL-E-mini-Generate-images-from-any-text-prompt--VmlldzoyMDE4NDAy" target="_blank" rel="noreferrer"> W&amp;B Project Report </a> and the <a className="underline" href="https://huggingface.co/dalle-mini/dalle-mini" target="_blank" rel="noreferrer"> DALL·E mini model card</a>. You can also watch <a className="underline" href="https://wandb.ai/dalle-mini/dalle-mini/reports/DALL-E-mini-Generate-Images-from-Any-Text-Prompt--VmlldzoyMDE4NDAy" target="_blank" rel="noreferrer"> The Story Behind DALL·E mini </a> on Gradient Dissent with Boris Dayma.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="6">What about limitations and biases?</AccordionHeader>
                            <AccordionBody accordionId="6">
                                <p> While the capabilities of image generation models are impressive, they may also reinforce or exacerbate societal biases. Because the model was trained on unfiltered data from the Internet, it may generate images that contain harmful stereotypes. The extent and nature of the biases of the DALL·E mini model have yet to be fully documented. Work to analyze the nature and extent of these limitations is ongoing and being documented in more detail in the <a className="underline" href="https://huggingface.co/dalle-mini/dalle-mini" target="_blank" rel="noreferrer"> DALL·E mini model card</a>.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="7">Can you make larger images?</AccordionHeader>
                            <AccordionBody accordionId="7">
                                <p>Not at the moment but we plan to make it possible in the future.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="8">Where does the logo come from?</AccordionHeader>
                            <AccordionBody accordionId="8">
                                <p>We use the 🖍️ crayon emoji, which is displayed natively (inspired by 🤗 Hugging Face). Images of the emoji use Twemoji - Twitter's open-source emoji collection (License: CC BY-SA 4.0). We just changed the color to orange.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="9">Can I use the images generated through craiyon?</AccordionHeader>
                            <AccordionBody accordionId="9">
                                <p>Yes, as long as you respect the <a className="underline" href="/terms" target="_blank" rel="noreferrer"> Terms of Use</a>, feel free to use them as you wish for personal use, whether you want to share them with your friends or print on a T-shirt.</p>
                                <p>Please credit craiyon.com for the images.</p>
                                <p>For commercial use, please refer to the "Commercial Licenses" section of the <a className="underline" href="/terms" target="_blank" rel="noreferrer"> Terms of Use</a>.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="10">Do you have an app?</AccordionHeader>
                            <AccordionBody accordionId="10">
                                <p>Yes, we have an app for Android devices on <a className="" href="https://play.google.com/store/apps/details?id=com.craiyon.twa" target="_blank" rel="noreferrer">Google Play Store</a>.</p>
                                <p className="bold_font">WARNING: USE THE LINK ABOVE AS THERE ARE MANY COPYCATS.</p>
                                <p>There is currently no app available for iPhone as it requires more development. For Androids, we were able to offer a simple PWA which replicates the website and only caches files for a faster experience.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader tag="div" targetId="11">How can I support craiyon?</AccordionHeader>
                            <AccordionBody accordionId="11">
                                <p>We always welcome feedback, whether it is related to bugs or feature requests! If you enjoy craiyon, you can also <a className="underline" href="/donate" target="_blank" rel="noreferrer"> support us with a donation</a>!</p>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default Home