import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { TechGuide } from "@/entities/TechGuide";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const hardcodedSimplifyGuide = {
  title: "How to Simplify My Phone",
  category: "basics",
  description: "Set up your phone to be easier to use with bigger buttons, larger text, and fewer distractions.",
  showDeviceSelection: true,
  devices: [
    {
      id: "iphone",
      name: "iPhone",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Open Settings", "description": "Tap the gray gear icon on your Home Screen. This is where you change all your phone's settings.", "image_url": "https://pf-upload-prod.s3.us-west-2.amazonaws.com/68d2c3d10887bbe5530210d4%2F2024-05-23T20-41-11.859Z%2FiPhone%20Settings.png" },
        { "step": 2, "title": "Go to Accessibility", "description": "In the Settings menu, scroll down until you see 'Accessibility' and tap on it. Accessibility has features to make the phone easier to use.", "image_url": "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop" },
        { "step": 3, "title": "Find Assistive Access", "description": "Scroll to the very bottom of the Accessibility screen. Under the 'General' section, tap on 'Assistive Access'.", "image_url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop" },
        { "step": 4, "title": "Begin Setup", "description": "Tap the blue 'Set Up Assistive Access' button. A new screen will appear. Tap 'Continue' to begin.", "tip": "Assistive Access is a special mode that makes the iPhone much simpler.", "image_url": "https://images.unsplash.com/photo-1583573636332-35633a2588c7?q=80&w=600&auto=format&fit=crop" },
        { "step": 5, "title": "Verify Your Apple Account", "description": "The phone will show you an Apple ID (an email address). Confirm this is your account and tap 'Continue'. This is important for security and for resetting your passcode if you forget it.", "image_url": "https://images.unsplash.com/photo-1628191137573-7a1a700354e7?q=80&w=600&auto=format&fit=crop" },
        { "step": 6, "title": "Choose Your App Layout", "description": "You can choose how your apps will look. 'Rows' shows them in a simple list. 'Grid' shows them as large, easy-to-tap icons. Tap on the layout you prefer.", "image_url": "https://images.unsplash.com/photo-1593428939747-73540b611e15?q=80&w=600&auto=format&fit=crop" },
        { "step": 7, "title": "Select Apps and Features", "description": "Now you choose which apps you want to see in this simple mode. Tap the green plus (+) button next to essential apps like Calls, Messages, and Camera. You can customize what each app can do.", "tip": "For the 'Calls' app, you can choose to only allow calls to specific family members to keep things simple.", "image_url": "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=600&auto=format&fit=crop" },
        { "step": 8, "title": "Set an Assistive Access Passcode", "description": "Create a new passcode just for this mode. You will use this passcode to exit the simple mode and get back to the regular iPhone settings. Enter it twice to confirm.", "image_url": "https://images.unsplash.com/photo-1580674285054-f484557f353a?q=80&w=600&auto=format&fit=crop" },
        { "step": 9, "title": "Learn to Enter and Exit", "description": "To turn ON Assistive Access, quickly press the side button (the power button) three times. The screen will change to the simple mode you just set up. To EXIT, press the side button three times again and enter your Assistive Access passcode.", "tip": "Text and buttons will automatically be very large in this mode, so you don't need to change text size separately!", "image_url": "https://images.unsplash.com/photo-1618384887928-63b751298839?q=80&w=600&auto=format&fit=crop" },
        { "step": 10, "title": "Enable Siri (Optional)", "description": "To use your voice to make calls or send texts, make sure Siri is on. Exit Assistive Access, go to Settings > Siri & Search, and turn on 'Listen for \"Hey Siri\"'. Now you can say 'Hey Siri, call Jane' even in the simple mode.", "tip": "This is a great hands-free way to use your phone.", "image_url": "https://images.unsplash.com/photo-1617097447883-a9a309833f0c?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      id: "android",
      name: "Android Phone",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbf1?q=80&w=400&auto=format&fit=crop",
      subDevices: [
        { "id": "samsung", "name": "Samsung Galaxy", "image": "https://images.unsplash.com/photo-1610945415242-a1f7523a479a?q=80&w=400&auto=format&fit=crop", "steps": [{ "step": 1, "title": "Turn On 'Easy Mode'", "description": "Go to Settings, tap 'Display', then find and select 'Easy mode'. Turn it on. This will make your home screen layout much simpler with bigger icons and text.", "tip": "Easy Mode is the best and fastest way to simplify a Samsung phone." }] },
        { "id": "pixel", "name": "Google Pixel", "image": "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b10?q=80&w=400&auto=format&fit=crop", "steps": [{ "step": 1, "title": "Increase Display and Font Size", "description": "Go to Settings > Display. Tap 'Display size and text'. Use the sliders for 'Font size' and 'Display size' to make everything on your screen bigger.", "tip": "Pixel doesn't have a dedicated 'Easy Mode', so you'll need to adjust these settings manually." }] }
      ]
    }
  ]
};

const hardcodedWindowsGuide = {
  title: "Navigate Your Windows PC with Confidence",
  category: "windows",
  description: "Learn the essential skills to use your Windows computer comfortably and safely.",
  steps: [
    {
      stepNumber: 1,
      title: "Understanding Your Desktop",
      description: "The Desktop is your computer's main workspace. It's like the top of a desk where you keep important items. You'll see icons (small pictures) that represent programs and files. The bottom bar is called the Taskbar.",
      tip: "Your most important programs are usually on the Desktop. Double-click any icon to open it.",
      image_url: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 2,
      title: "Using the Start Menu",
      description: "Click the Windows button (looks like four squares) in the bottom-left corner. This opens the Start Menu where you can find all your programs. You can also just press the Windows key on your keyboard.",
      tip: "Type the name of what you're looking for right after opening the Start Menu - your computer will search for it automatically!",
      image_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 3,
      title: "Opening Programs (Applications)",
      description: "To open a program: Click Start, then look through the list of programs, or type the program name (like 'Word' or 'Chrome'). Click on the program when you see it. You can also double-click program icons on your Desktop.",
      tip: "Pin your favorite programs to the Taskbar by right-clicking them and selecting 'Pin to taskbar' for quick access.",
      image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 4,
      title: "Finding Your Files and Folders",
      description: "Click the yellow folder icon on your Taskbar to open File Explorer. This shows you all the files and folders on your computer. Your personal files are usually in folders like 'Documents', 'Pictures', and 'Downloads'.",
      tip: "Think of folders like filing cabinets - they help organize your documents, photos, and other files.",
      image_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 5,
      title: "Switching Between Open Programs",
      description: "Look at your Taskbar at the bottom of the screen. Each open program shows as a button there. Click any button to switch to that program. You can also hold Alt and press Tab to see all open programs.",
      tip: "If you have too many programs open and your computer feels slow, close some by clicking the X button in their top-right corner.",
      image_url: "https://imgur.com/a/Y6KGjEE"
    },
    {
      stepNumber: 6,
      title: "Adjusting Volume and Brightness",
      description: "For volume: Click the speaker icon in the bottom-right corner and drag the slider up or down. For brightness: Click the battery/power icon in the same area, or look for brightness controls on your keyboard (usually sun symbols).",
      tip: "Many laptops have function keys (F1-F12) that control volume and brightness when pressed with the Fn key.",
      image_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 7,
      title: "Connecting to WiFi",
      description: "Click the WiFi symbol (looks like curved lines) in the bottom-right corner. You'll see a list of available networks. Click your home network name and enter your password. Ask a family member for your WiFi password if you're not sure.",
      tip: "Once connected, your computer will remember the password and connect automatically next time.",
      image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 8,
      title: "Making Text and Icons Bigger",
      description: "Right-click on an empty area of your Desktop and select 'Display settings'. Look for 'Scale and layout' and change it to 125% or 150% to make everything bigger and easier to read.",
      tip: "If text is still too small in web browsers, press Ctrl and + together to zoom in on any webpage.",
      image_url: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 9,
      title: "Safely Shutting Down",
      description: "Always shut down properly to keep your computer healthy. Click Start, then click the Power button (circle with a line). Choose 'Shut down'. Wait until the computer completely turns off before closing the laptop or unplugging it.",
      tip: "Never just unplug your computer or hold the power button - this can damage your files. Always use the proper shutdown process.",
      image_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop"
    },
    {
      stepNumber: 10,
      title: "Getting Help When You Need It",
      description: "Windows has built-in help. Press the Windows key and type 'Get Help' to open the help app. You can also ask family members, or search online for 'how to [what you want to do] Windows'. Most problems have simple solutions!",
      tip: "Don't be afraid to explore! It's very hard to break anything on your computer just by clicking around.",
      image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop"
    }
  ]
};

const hardcodedSafetyGuide = {
  title: "Staying Safe Online",
  category: "safety",
  description: "Learn to recognize common online threats and browse the internet with confidence.",
  steps: [
    {
      stepNumber: 1,
      title: "Spotting Fake 'Virus' Warnings",
      description: "Have you ever seen a big, flashy warning that your computer is infected with viruses? These are almost always scams. They try to scare you into calling a phone number or downloading a fake program.",
      tip: "Real antivirus software (like Norton or McAfee) doesn't use scary pop-ups. If you see one, just close the web page. Never call the number or click download.",
      image_url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800&auto=format&fit=crop"
    },
    {
      stepNumber: 2,
      title: "Is This Email a Scam? (Phishing)",
      description: "Scammers send fake emails that look real to trick you into giving them your passwords or personal information. This is called 'phishing'.",
      tip: "Look for clues: Does it ask for your password? Is the sender's email address strange? Is there a sense of urgency, like 'Your account will be closed'? If you're unsure, don't click any links. Call the company directly using a number you trust.",
      image_url: "https://images.unsplash.com/photo-1555940280-66e40aDC3ce0?q=80&w=800&auto=format&fit=crop"
    },
    {
      stepNumber: 3,
      title: "Safe Online Shopping: Look for the Lock",
      description: "When you're on a website where you might enter personal information (like a credit card), look for a small lock icon in the address bar at the top of your browser.",
      tip: "The lock means the website is secure (using HTTPS). If you don't see the lock on a checkout page, do not enter your payment information.",
      image_url: "https://images.unsplash.com/photo-1616401784845-180862534591?q=80&w=800&auto=format&fit=crop"
    },
    {
      stepNumber: 4,
      title: "Understanding Pop-Up Ads",
      description: "Pop-ups are small windows that 'pop up' over the webpage you're viewing. Most are just advertisements. It's best to close them without clicking inside them.",
      tip: "Look for an 'X' in the corner of the pop-up to close it. Be careful not to click a fake 'X' that's actually part of the ad. If you can't find the 'X', you can just close the browser tab.",
      image_url: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop"
    },
    {
      stepNumber: 5,
      title: "Creating a Strong, Memorable Password",
      description: "A strong password helps protect your accounts. Don't use simple things like 'password123' or your pet's name.",
      tip: "A good trick is to use a short, memorable phrase, and add numbers and symbols. For example, 'MyDogLovesBacon!' becomes 'Myd0gL0vesB@c0n!'. It's easier to remember than random characters.",
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    }
  ]
};

const hardcodedPasswordGuide = {
  title: "Creating and Managing Secure Passwords",
  category: "safety",
  description: "Learn to create strong passwords and use your devices to help manage them safely.",
  steps: [
    {
      stepNumber: 1,
      title: "Understanding Why Good Passwords Matter",
      description: "Think of passwords like the keys to your house. A weak password is like leaving your front door unlocked. Strong passwords protect your email, banking, social media, and personal information from criminals who want to steal your identity or money.",
      tip: "Never use the same password for important accounts like banking, email, or social media. If one gets compromised, all your accounts could be at risk."
    },
    {
      stepNumber: 2,
      title: "What Makes a Password Strong",
      description: "A strong password should be at least 12 characters long and include: uppercase letters (A,B,C), lowercase letters (a,b,c), numbers (1,2,3), and symbols (!,@,#). Avoid using personal information like your name, birthday, pet names, or address.",
      tip: "Instead of 'password123', try something like 'Coffee&Sunshine2024!' - it's longer, has different character types, but is still memorable to you."
    },
    {
      stepNumber: 3,
      title: "Creating Memorable Strong Passwords",
      description: "Use a method that's easy for you to remember but hard for others to guess. Try combining 3-4 unrelated words with numbers and symbols. For example: 'Garden$Train47Blue' or use a favorite phrase: 'I love my 3 grandchildren!' becomes 'ILmy3gc!'",
      tip: "Make it personal but not obvious. Think of a favorite memory, book, or movie quote, then modify it with numbers and symbols that mean something to you."
    },
    {
      stepNumber: 4,
      title: "Using iPhone's Built-in Password Manager",
      description: "Your iPhone can create and remember strong passwords for you. When signing up for a new account, look for 'Use Strong Password' suggestion that appears above the keyboard. Tap it to let iPhone create a secure password automatically.",
      tip: "These saved passwords sync across all your Apple devices. You can view and manage them in Settings > Passwords > Password Options."
    },
    {
      stepNumber: 5,
      title: "Finding Your Saved iPhone Passwords",
      description: "To see your saved passwords: Go to Settings > Passwords. You'll need to use Face ID, Touch ID, or your phone passcode. Here you can see all your saved login information, copy passwords, or update them if needed.",
      tip: "If you forget a password, check here first before trying to reset it. Your iPhone probably saved it automatically."
    },
    {
      stepNumber: 6,
      title: "Using Android's Built-in Password Manager",
      description: "Android phones with Google Chrome can save and suggest passwords too. When creating an account in Chrome, look for 'Use suggested strong password' or the key icon. Tap it to let Google create a secure password for you.",
      tip: "These passwords are saved to your Google account and work on any device where you're signed into Chrome."
    },
    {
      stepNumber: 7,
      title: "Finding Your Saved Android Passwords",
      description: "To see your saved passwords on Android: Open Chrome, tap the three dots in the top right, select Settings > Passwords. Or go to passwords.google.com on any computer while signed into your Google account.",
      tip: "You can also check Settings > Google > Manage your Google Account > Security > Password Manager on your Android phone."
    },
    {
      stepNumber: 8,
      title: "Setting Up Auto-Fill on Your Computer",
      description: "Your computer's web browser can remember passwords too. In Chrome: go to Settings > Passwords and turn on 'Offer to save passwords'. In Safari: go to Safari menu > Preferences > Passwords and check 'AutoFill user names and passwords'.",
      tip: "Once set up, your browser will ask if you want to save passwords when you log into websites. Click 'Save' for sites you trust."
    },
    {
      stepNumber: 9,
      title: "Writing Down Important Passwords Safely",
      description: "It's okay to write down some passwords! Keep a notebook in a safe place at home with your most important passwords. Don't carry this notebook with you, and don't include the website names - use code words you'll remember.",
      tip: "For example, instead of writing 'Facebook password', write 'Social site' or 'Blue site'. This way if someone finds your notebook, they won't know what the passwords are for."
    },
    {
      stepNumber: 10,
      title: "Updating Old Weak Passwords",
      description: "Look through your saved passwords for any that are short, use only letters, or contain personal information. Update these one at a time to stronger versions. Start with your most important accounts: email, banking, and social media.",
      tip: "Don't try to update all passwords at once - it can be overwhelming. Do 2-3 per week until they're all strong and unique."
    },
    {
      stepNumber: 11,
      title: "What to Do If You Forget a Password",
      description: "First, check your phone's or computer's saved passwords (steps 5, 7, or 8). If it's not there, use the 'Forgot Password' link on the website. This will send a reset link to your email. Create a new strong password and let your device save it.",
      tip: "Always use 'Forgot Password' rather than guessing repeatedly. Too many wrong attempts can lock your account temporarily."
    },
    {
      stepNumber: 12,
      title: "Red Flags: When NOT to Save Passwords",
      description: "Don't let public computers (library, internet café) save your passwords. Don't save banking passwords on shared family devices. If someone else has access to your phone or computer, consider not saving passwords for sensitive accounts.",
      tip: "For banking and other sensitive accounts, consider writing the password in your secure notebook at home rather than saving it on devices others might use."
    }
  ]
};

const hardcodedRestartGuide = {
  title: "How to Restart Your Device Safely",
  category: "troubleshooting",
  description: "Restarting (or 'rebooting') your device can fix many common problems like slowness or freezing. It's like giving your device a short nap to refresh itself.",
  showDeviceSelection: true,
  devices: [
    {
      id: "iphone",
      name: "iPhone",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Press and Hold Buttons", "description": "For newer iPhones (without a Home button): Press and hold the Side button (on the right) AND one of the Volume buttons (on the left) at the same time.", "tip": "For older iPhones (with a Home button): Just press and hold the Side or Top button.", "image_url": "https://images.unsplash.com/photo-1603273259169-36b359f03221?q=80&w=600&auto=format&fit=crop" },
        { "step": 2, "title": "Slide to Power Off", "description": "Keep holding the buttons until you see a 'slide to power off' slider appear on the screen. Let go of the buttons.", "image_url": "https://images.unsplash.com/photo-1580674285054-f484557f353a?q=80&w=600&auto=format&fit=crop" },
        { "step": 3, "title": "Drag the Slider", "description": "Drag the power icon from left to right across the screen. The screen will turn black. Wait about 30 seconds for it to shut down completely.", "image_url": "https://images.unsplash.com/photo-1618384887928-63b751298839?q=80&w=600&auto=format&fit=crop" },
        { "step": 4, "title": "Turn it Back On", "description": "Press and hold the Side button (on the right) again. Keep holding it until you see the Apple logo appear. Your phone is now restarting.", "image_url": "https://images.unsplash.com/photo-1617097447883-a9a309833f0c?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      id: "android",
      name: "Android Phone",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbf1?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Press and Hold Power Button", "description": "Press and hold the Power button on the side of your phone for a few seconds.", "image_url": "https://images.unsplash.com/photo-1603273259169-36b359f03221?q=80&w=600&auto=format&fit=crop" },
        { "step": 2, "title": "Tap 'Restart'", "description": "A menu will appear on the screen with options like 'Power off' and 'Restart'. Tap the 'Restart' button.", "tip": "'Restart' is better than 'Power off' because it does everything in one step.", "image_url": "https://images.unsplash.com/photo-1580674285054-f484557f353a?q=80&w=600&auto=format&fit=crop" },
        { "step": 3, "title": "Wait for it to Restart", "description": "Your phone will automatically turn off and then turn back on by itself. This may take a minute or two. You will see the brand logo (like Samsung or Google) when it's starting up.", "image_url": "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b10?q=80&w=600&auto=format&fit=crop" }
      ]
    }
  ]
};

const hardcodedVideoCallGuide = {
  title: "Video Calling Your Family",
  category: "tools",
  description: "Learn how to use popular apps like FaceTime and WhatsApp to see and talk to your loved ones, no matter where they are.",
  showDeviceSelection: true,
  devices: [
    {
      id: "iphone",
      name: "Using FaceTime on iPhone/iPad",
      image: "https://images.unsplash.com/photo-1554224311-be7779423658?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Find the Contact", "description": "Open your 'Contacts' app (the address book). Find the person you want to call and tap on their name.", "image_url": "https://images.unsplash.com/photo-1521404226002-371d37e45c43?q=80&w=600&auto=format&fit=crop" },
        { "step": 2, "title": "Start the FaceTime Call", "description": "In their contact details, you'll see a 'FaceTime' section with a video camera icon. Tap the camera icon to start a video call.", "tip": "The person you are calling must also have an Apple device (iPhone, iPad, or Mac) for FaceTime to work.", "image_url": "https://images.unsplash.com/photo-1617097447883-a9a309833f0c?q=80&w=600&auto=format&fit=crop" },
        { "step": 3, "title": "During the Call", "description": "Once they answer, you will see them on your screen, and they will see you! You can tap the screen to see options like muting your microphone or ending the call with the red button.", "image_url": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      id: "android",
      name: "Using WhatsApp on Any Phone",
      image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Open WhatsApp", "description": "Find and tap the green WhatsApp icon on your phone. Make sure you and the person you're calling both have the app installed.", "image_url": "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=600&auto=format&fit=crop" },
        { "step": 2, "title": "Find Your Contact", "description": "Go to the 'Chats' tab and find your conversation with the person you want to call. Or, tap the new message icon to find them in your contacts.", "image_url": "https://images.unsplash.com/photo-1521404226002-371d37e45c43?q=80&w=600&auto=format&fit=crop" },
        { "step": 3, "title": "Start the Video Call", "description": "At the top of the chat screen, you will see a video camera icon. Tap this icon to start the video call.", "tip": "WhatsApp works on both iPhones and Android phones, so it's a great option for calling anyone.", "image_url": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" }
      ]
    }
  ]
};

const hardcodedDocusignGuide = {
  title: "How to Use DocuSign to Sign Documents",
  category: "tools",
  description: "Learn how to safely and easily sign documents sent to you online via email using DocuSign.",
  steps: [
    { "stepNumber": 1, "title": "Open the Email", "description": "Find the email from DocuSign. The subject line will usually say something like 'Please DocuSign this document'. Open the email and look for a yellow button that says 'REVIEW DOCUMENT'. Click it.", "image_url": "https://images.unsplash.com/photo-1555940280-66e40aDC3ce0?q=80&w=800&auto=format&fit=crop", "tip": "Never click links from senders you don't recognize. Make sure the email is from someone you expect to send you a document." },
    { "stepNumber": 2, "title": "Agree to Use Electronic Signatures", "description": "A box will pop up asking you to agree to use electronic records and signatures. Check the box that says 'I agree to use electronic records and signatures' and then click the 'CONTINUE' button.", "image_url": "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop" },
    { "stepNumber": 3, "title": "Find the Signature Fields", "description": "The document will appear. Look for yellow tabs that say 'Sign' or 'Initial'. DocuSign will guide you to the first place you need to sign. You can also click the 'Start' tag on the left to be taken there automatically.", "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" },
    { "stepNumber": 4, "title": "Adopt Your Signature", "description": "When you click the first 'Sign' tag, a window will pop up. It will show your name written in a few different styles. You can pick one you like, or you can draw your own with your mouse. Once you're happy, click the 'ADOPT AND SIGN' button.", "tip": "You only have to do this once per document. DocuSign will use this same signature for all other fields in this document." },
    { "stepNumber": 5, "title": "Complete Signing", "description": "After you adopt your signature, DocuSign will automatically place it in the first spot. Keep clicking the 'Next' tags to go to any other places you need to sign or initial. When you've filled everything in, a 'FINISH' button will appear at the top. Click it.", "image_url": "https://images.unsplash.com/photo-1606787366850-de6330128214?q=80&w=800&auto=format&fit=crop" },
    { "stepNumber": 6, "title": "Save a Copy", "description": "That's it, you're done! DocuSign will ask if you want to save a copy. You can download it as a PDF to your computer or just close the window. A final, completed copy will also be emailed to you and the sender.", "image_url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop", "tip": "It's a good idea to download a copy for your records. Save it in your 'Documents' folder." }
  ]
};

const hardcodedWifiGuide = {
  title: "Understanding WiFi and Internet",
  category: "basics",
  description: "Learn what WiFi is, how it works, and how to connect your devices to the internet at home.",
  steps: [
    { "stepNumber": 1, "title": "What is WiFi?", "description": "Think of WiFi as an invisible cord that connects your devices (like your phone, tablet, or computer) to the internet. It's a radio signal that comes from a box in your house called a 'router'. This lets you use the internet without plugging in any cables.", "image_url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop", "tip": "The 'router' is usually a small box with blinking lights, often provided by your internet company (like Comcast, AT&T, or Verizon)." },
    { "stepNumber": 2, "title": "Find Your WiFi Network Name (SSID)", "description": "Every WiFi network has a name, like 'Smith Family WiFi' or 'MyInternet'. This name is often written on a sticker on a sticker on the side or bottom of your router box. You will also need the password, which is usually on the same sticker.", "image_url": "https://images.unsplash.com/photo-1594394488582-841b96435c7c?q=80&w=800&auto=format&fit=crop" },
    { "stepNumber": 3, "title": "Connecting a Phone or Tablet", "description": "Go to 'Settings' on your device. Tap on 'WiFi' or 'Network & Internet'. You'll see a list of nearby WiFi network names. Find your network name in the list and tap on it.", "image_url": "https://images.unsplash.com/photo-1618384887928-63b751298839?q=80&w=600&auto=format&fit=crop" },
    { "stepNumber": 4, "title": "Enter the Password", "description": "Your device will ask for the password. Carefully type in the password from the sticker on your router. Passwords are case-sensitive, which means uppercase (A) and lowercase (a) letters are different. Tap 'Connect' or 'Join'.", "image_url": "https://images.unsplash.com/photo-1580674285054-f484557f353a?q=80&w=600&auto=format&fit=crop", "tip": "Tap the 'eye' icon as you type to see the password and make sure you typed it correctly." },
    { "stepNumber": 5, "title": "Confirm You're Connected", "description": "Once you're connected, you'll see a checkmark next to your network name, and a WiFi symbol (like curved lines) will appear at the top of your screen. Your device will remember the password and connect automatically next time you're at home.", "image_url": "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop" },
    { "stepNumber": 6, "title": "Troubleshooting: What if it doesn't work?", "description": "If you can't connect, try these things: 1) Double-check the password. 2) Make sure you are close enough to the router. 3) Restart your router by unplugging it, waiting 30 seconds, and plugging it back in. It will take a few minutes to start up again.", "image_url": "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800&auto=format&fit=crop", "tip": "Restarting the router fixes most common WiFi problems!" }
  ]
};

const hardcodedTextSizeGuide = {
  title: "Making Text Bigger on Your Phone",
  category: "basics",
  description: "Learn how to increase text size on your phone so it's easier to read.",
  showDeviceSelection: true,
  devices: [
    {
      id: "iphone",
      name: "iPhone",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Open Settings", "description": "Find the gray Settings app on your home screen - it looks like a gear. Tap on it to open your phone's settings.", "image_url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d2c3d10887bbe5530210d6/a476d11fb_Gemini_Generated_Image_xertvlxertvlxert.png" },
        { "step": 2, "title": "Find Display & Brightness", "description": "Scroll down in Settings until you see 'Display & Brightness'. This section controls how your screen looks. Tap on it.", "image_url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d2c3d10887bbe5530210d6/8a8ff862b_ios-17-iphone-15-pro-settings-general.png" },
        { "step": 3, "title": "Tap Text Size", "description": "In the Display & Brightness section, look for 'Text Size' and tap on it. This is where you can make text bigger or smaller.", "image_url": "https://images.unsplash.com/photo-1583573636332-35633a2588c7?q=80&w=600&auto=format&fit=crop" },
        { "step": 4, "title": "Adjust the Text Size", "description": "You'll see a slider at the bottom with small 'A' on the left and big 'A' on the right. Drag the circle toward the big 'A' to make text larger. You can see the preview text change as you move it.", "tip": "Try different sizes until you find one that's comfortable for your eyes. You can always come back and change it again.", "image_url": "https://images.unsplash.com/photo-1628191137573-7a1a700354e7?q=80&w=600&auto=format&fit=crop" },
        { "step": 5, "title": "For Even Larger Text", "description": "If the regular text size isn't big enough, go back to Display & Brightness and tap 'Accessibility'. Then tap 'Larger Text' and turn on 'Larger Accessibility Sizes'. This gives you even bigger text options.", "tip": "This feature makes text much larger throughout your entire phone, not just in some apps.", "image_url": "https://images.unsplash.com/photo-1593428939747-73540b611e15?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      id: "android",
      name: "Android Phone",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbf1?q=80&w=400&auto=format&fit=crop",
      steps: [
        { "step": 1, "title": "Open Settings", "description": "Find the Settings app on your home screen or in your app drawer - it usually looks like a gear or has 'Settings' written under it. Tap to open.", "image_url": "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop" },
        { "step": 2, "title": "Find Display Settings", "description": "Look for 'Display' in your settings menu. On some phones it might be called 'Display & Brightness' or 'Screen'. Tap on it.", "tip": "Different Android phones organize settings differently, but Display is usually near the top of the settings list.", "image_url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop" },
        { "step": 3, "title": "Look for Font Size or Text Size", "description": "In the Display menu, look for options like 'Font size', 'Text size', or 'Font size and style'. The exact name depends on your phone brand. Tap on it.", "image_url": "https://images.unsplash.com/photo-1583573636332-35633a2588c7?q=80&w=600&auto=format&fit=crop" },
        { "step": 4, "title": "Choose a Larger Size", "description": "You'll see different size options like Small, Normal, Large, or Extra Large. Tap on 'Large' or 'Extra Large' to make text bigger. You should see the preview text change immediately.", "tip": "Some phones also have a 'Huge' option for very large text. Try different sizes to see what works best for you.", "image_url": "https://images.unsplash.com/photo-1628191137573-7a1a700354e7?q=80&w=600&auto=format&fit=crop" },
        { "step": 5, "title": "Make Everything Bigger (Optional)", "description": "While you're in Display settings, look for 'Display size' or 'Screen zoom'. This makes everything bigger - not just text, but buttons, icons, and images too.", "tip": "This is helpful if you want everything on your screen to be larger and easier to see and tap.", "image_url": "https://images.unsplash.com/photo-1593428939747-73540b611e15?q=80&w=600&auto=format&fit=crop" }
      ]
    }
  ]
};

export default function GuidePage() {
  const [searchParams] = useSearchParams();
  const guideTitle = searchParams.get('title');
  const [guide, setGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGuide = useCallback(async () => {
    if (!guideTitle) return;
    setIsLoading(true);

    if (guideTitle === "How to Simplify My Phone") {
      setGuide(hardcodedSimplifyGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "Navigate Your Windows PC with Confidence") {
      setGuide(hardcodedWindowsGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "Staying Safe Online") {
      setGuide(hardcodedSafetyGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "Creating and Managing Secure Passwords") {
      setGuide(hardcodedPasswordGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "How to Restart Your Device Safely") {
      setGuide(hardcodedRestartGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "Video Calling Your Family") {
      setGuide(hardcodedVideoCallGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "How to Use DocuSign to Sign Documents") {
      setGuide(hardcodedDocusignGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "Understanding WiFi and Internet") {
      setGuide(hardcodedWifiGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (guideTitle === "Making Text Bigger on Your Phone") {
      setGuide(hardcodedTextSizeGuide);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch the newest version of the guide by sorting by updated_date
      const guides = await TechGuide.filter({ title: guideTitle }, "-updated_date");
      if (guides.length > 0) {
        setGuide(guides[0]);
      } else {
        setError(`Sorry, we couldn't find a guide called "${guideTitle}".`);
      }
    } catch (err) {
      console.error("Error loading guide:", err);
      setError("There was a problem loading the guide. Please try again later.");
    }
    setIsLoading(false);
  }, [guideTitle]);

  useEffect(() => {
    if (guideTitle) {
      loadGuide();
    } else {
      setError("No guide specified.");
      setIsLoading(false);
    }
  }, [guideTitle, loadGuide]);

  const [selectedDevice, setSelectedDevice] = React.useState(null);
  const [selectedSubDevice, setSelectedSubDevice] = React.useState(null);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
        <p className="text-2xl text-gray-600 mt-6">Loading your guide...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">An Error Occurred</h2>
        <p className="text-xl text-gray-700 mb-8">{error}</p>
        <Link to={createPageUrl("Dashboard")}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-6 rounded-2xl">
            <ArrowLeft className="w-6 h-6 mr-3" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const renderSteps = (device) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {guide.showDeviceSelection && ( // Only show "Choose Different Phone" button if device selection was involved
        <Card className="bg-white shadow-lg border-4">
          <CardHeader className="text-center">
            <Button 
              variant="outline"
              onClick={() => selectedSubDevice ? setSelectedSubDevice(null) : setSelectedDevice(null)}
              className="mb-4 text-lg px-6 py-3 rounded-xl mx-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {selectedSubDevice ? `Choose Different ${selectedDevice.name}` : 'Choose Different Phone'}
            </Button>
            <img 
              src={device.image}
              alt={device.name}
              className="mx-auto mb-4 rounded-lg shadow-md h-32 w-auto object-contain"
            />
            <CardTitle className="text-3xl font-bold text-gray-800">
              {guide.title.includes("Simplify") || guide.title.includes("Restart") || guide.title.includes("Calling") || guide.title.includes("Text Bigger") ? `${guide.title.replace('Your Phone', `Your ${device.name}`).replace('Your Device', `Your ${device.name}`)}` : guide.title}
            </CardTitle>
            <p className="text-xl text-gray-600 mt-2">
              {guide.description}
            </p>
          </CardHeader>
        </Card>
      )}

      <AnimatePresence>
        {device.steps?.map((step, index) => (
          <motion.div
            key={step.stepNumber || step.step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden shadow-2xl border-4 border-gray-100 rounded-3xl">
              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                {step.image_url && (
                  <div className="p-4 bg-gray-100 flex items-center justify-center">
                    <img 
                      src={step.image_url} 
                      alt={`Visual for: ${step.title}`}
                      className="rounded-2xl object-cover w-full h-full shadow-lg border-4 border-white"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className={`p-8 ${!step.image_url ? 'md:col-span-2' : ''}`}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                      {step.stepNumber || step.step}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-3xl font-bold text-gray-800">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {step.tip && (
                    <div className="bg-yellow-100 border-l-8 border-yellow-400 p-5 rounded-r-lg">
                      <div className="flex items-start">
                        <Lightbulb className="w-10 h-10 text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold text-yellow-900">Helpful Tip</h4>
                          <p className="text-lg text-yellow-800 mt-1">
                            {step.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" className="mb-6 text-xl px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to All Guides
            </Button>
          </Link>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            {guide.title}
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed">
            {guide.description}
          </p>
        </header>

        <main className="space-y-8">
          {!guide.showDeviceSelection && guide.steps ? (
            // Regular guide steps (for guides without any device selection)
            <AnimatePresence>
              {guide.steps?.map((step, index) => (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden shadow-2xl border-4 border-gray-100 rounded-3xl">
                    <div className="grid md:grid-cols-2">
                      {/* Image Section */}
                      {step.image_url && (
                        <div className="p-4 bg-gray-100 flex items-center justify-center">
                          <img 
                            src={step.image_url} 
                            alt={`Visual for: ${step.title}`}
                            className="rounded-2xl object-cover w-full h-full shadow-lg border-4 border-white"
                          />
                        </div>
                      )}
                      
                      {/* Content Section */}
                      <div className={`p-8 ${!step.image_url ? 'md:col-span-2' : ''}`}>
                        <div className="flex items-start gap-4 mb-5">
                          <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                            {step.stepNumber}
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-3xl font-bold text-gray-800">
                              {step.title}
                            </h2>
                          </div>
                        </div>
                        
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {step.tip && (
                          <div className="bg-yellow-100 border-l-8 border-yellow-400 p-5 rounded-r-lg">
                            <div className="flex items-start">
                              <Lightbulb className="w-10 h-10 text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="text-xl font-bold text-yellow-900">Helpful Tip</h4>
                                <p className="text-lg text-yellow-800 mt-1">
                                  {step.tip}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : !selectedDevice ? (
            // Top-level device selection (e.g., iPhone vs Android)
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-white shadow-lg border-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    {guide.title}
                  </CardTitle>
                  <p className="text-xl text-gray-600 mt-2">
                    {guide.title.includes("Simplify") || guide.title.includes("Restart") || guide.title.includes("Calling") || guide.title.includes("Text Bigger") ? "Choose your device type below:" : guide.description}
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guide.devices.map((device, index) => (
                      <motion.div
                        key={device.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedDevice(device)}
                      >
                        <Card className="bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6 text-center">
                            <img 
                              src={device.image}
                              alt={device.name}
                              className="mx-auto mb-4 rounded-lg shadow-md h-32 w-full object-cover"
                            />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {device.name}
                            </h3>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                              {guide.title.includes("Simplify") ? `Simplify My ${device.name}` : guide.title.includes("Restart") ? `Restart My ${device.name}` : guide.title.includes("Calling") ? `Use ${device.name}` : guide.title.includes("Text Bigger") ? `Text Bigger on ${device.name}` : `Select ${device.name}`}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : selectedDevice.subDevices && !selectedSubDevice ? (
            // Sub-device selection (e.g., Samsung vs Pixel for Android)
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-white shadow-lg border-4">
                <CardHeader className="text-center">
                   <Button 
                    variant="outline"
                    onClick={() => setSelectedDevice(null)}
                    className="mb-4 text-lg px-6 py-3 rounded-xl mx-auto"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Choose Different Phone Type
                  </Button>
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    Choose Your {selectedDevice.name}
                  </CardTitle>
                  <p className="text-xl text-gray-600 mt-2">
                    Select your specific phone brand:
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedDevice.subDevices.map((subDevice, index) => (
                      <motion.div
                        key={subDevice.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedSubDevice(subDevice)}
                      >
                        <Card className="bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6 text-center">
                            <img 
                              src={subDevice.image}
                              alt={subDevice.name}
                              className="mx-auto mb-4 rounded-lg shadow-md h-32 w-full object-cover"
                            />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {subDevice.name}
                            </h3>
                             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                              Select {subDevice.name}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : selectedSubDevice ? (
            // Render steps for a selected sub-device
            renderSteps(selectedSubDevice)
          ) : (
            // Render steps for a selected top-level device (that has no sub-devices, or for non-device specific guides)
            renderSteps(selectedDevice)
          )}
        </main>
        
        {/* Completion Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (selectedSubDevice?.steps?.length || selectedDevice?.steps?.length || guide.steps?.length || 0) * 0.2 + 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl rounded-3xl">
            <CardContent className="p-10 text-center">
              <CheckCircle className="w-20 h-20 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">You're All Done!</h2>
              <p className="text-2xl mb-8">
                Great job following the steps. You've successfully learned a new skill!
              </p>
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" className="bg-white text-green-600 hover:bg-gray-100 text-xl px-10 py-6 rounded-2xl shadow-lg">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}