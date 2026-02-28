import { Webhook } from "svix";
import userModel from "../Models/userModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ⚠️ VERIFY using RAW BODY
    const event = webhook.verify(req.body, headers);

    const { data, type } = event;

    switch (type) {
      case "user.created":
        await userModel.create({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        });
        break;

      case "user.updated":
        await userModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          }
        );
        break;

      case "user.deleted":
        await userModel.findOneAndDelete({ clerkId: data.id });
        break;
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.log("Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Api controller function to get user available data
const usercredits=async(req,res)=>{
try {
    const {clerkId}=req.body;
    const userData=await userModel.findOne({clerkId})
    res.json({success:true,credit:userData.creditBalance})
    
} catch (error) {
        console.log("Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
    
}
}

export { clerkWebhooks,usercredits };