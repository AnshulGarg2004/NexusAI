import { getModel } from "../graph/llmModel.js"
import axios from 'axios'
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getfromS3.js";

export const imageGen = async (state) => {
    const imageLLM = await getModel("image");

    console.log("im in image aget");
    try {
            const prompt = `
   You are an elite AI image prompt engineer specializing in creating cinematic, photorealistic, production-quality prompts for modern image generation models (GPT Image, Flux, Midjourney, SDXL, Ideogram, etc.).

Your task is to transform the user's idea into a single, highly detailed, visually rich image generation prompt.

Instructions

Analyze the user's request and expand it into a professional prompt that includes:

The main subject with accurate visual details
Environment and background
Camera angle and framing
Professional composition
Cinematic storytelling
Dramatic, realistic lighting
Natural color grading
Rich textures and materials
Depth and atmosphere
Lens and camera characteristics
Photorealistic details
Mood and emotion
Realistic shadows and reflections
Fine environmental details
High-end photography aesthetics

When appropriate, naturally incorporate concepts such as:

Cinematic lighting
Golden hour, blue hour, volumetric lighting, rim lighting, soft diffused light, practical lights
Professional composition (rule of thirds, leading lines, balanced framing)
Ultra realistic
Hyper detailed
Photorealistic
Stunning color palette
Sharp focus
Selective depth of field
HDR
Global illumination
Physically accurate materials
Natural skin textures
High dynamic range
Atmospheric perspective
Realistic reflections
Fine surface detail
Professional photography
Editorial quality
Luxury commercial photography
IMAX-level cinematic quality
8K resolution
Award-winning photography
Masterpiece quality

User Request : ${state.prompt}

If the user does not specify details (lighting, environment, mood, camera, etc.), intelligently choose options that best enhance the image while remaining faithful to the original intent.

Never change the core subject or introduce unrelated elements.

The output should be one cohesive paragraph optimized for image generation.
    `;

    const resp = await imageLLM.invoke(prompt);
    const imagePrompt = resp.content.trim();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}`;

    const imageResp = await axios.get(imageUrl, {responseType :"arraybuffer"});
    console.log("image response: ", imageResp);
    
    const buffer = Buffer.from(imageResp.data);
    const fileName = `image-${Date.now()}.png`

    await uploadToS3(fileName, buffer, "image/png");

    const downloadUrl = await getFromS3(fileName, 24*60*60);

    return {...state, 
       aiResponse : `
🎉 Image Generated Successfully!

🖼️ **Your image is ready!**

![Generated Image](${downloadUrl})

📥 **Download your image:**
👉 [Download Image](${downloadUrl})

⏳ **Note:** This download link expires in **10 minutes**, so be sure to save your image soon.

✨ Enjoy your creation!`,

    }
    } catch (error) {
        console.log("error in image creating: ", error.message);

        return {...state, aiResponse : "Failed to generate Image"};
        
    }



}