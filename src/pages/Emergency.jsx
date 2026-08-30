
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  RefreshCw, 
  Power, 
  Wifi, 
  Phone,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";

const emergencyProblems = [
  {
    id: 'frozen',
    title: 'My Device is Frozen',
    description: 'Screen is stuck and won\'t respond to touches',
    icon: RefreshCw,
    color: 'red',
    showDeviceSelection: true, // New property to indicate device-specific steps
    devices: [
      {
        id: 'iphone',
        name: 'iPhone',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop',
        steps: [
          {
            step: 1,
            title: 'Try the Home Button (If You Have One)',
            description: 'If your iPhone has a round home button at the bottom, press it firmly once. If nothing happens, press and hold it for 3 seconds. If your iPhone doesn\'t have a home button, swipe up from the very bottom of the screen and hold for 2 seconds.',
            tip: 'Newer iPhones (iPhone X and later) don\'t have home buttons. Older iPhones (iPhone 8 and earlier) do have them.'
          },
          {
            step: 2,
            title: 'Force Restart Your iPhone',
            description: 'For iPhone 8 and newer: Quickly press the Volume Up button, then quickly press the Volume Down button, then press and hold the Side button until you see the Apple logo (about 10 seconds). For iPhone 7: Press and hold both the Volume Down button and the Side button until you see the Apple logo. For iPhone 6s and older: Press and hold both the Home button and the Top (or Side) button until you see the Apple logo.',
            tip: 'Don\'t let go until you see the Apple logo appear! This is completely safe and won\'t delete any of your information.'
          },
          {
            step: 3,
            title: 'Wait for Your iPhone to Restart',
            description: 'After you see the Apple logo, let go of the buttons and wait. Your iPhone will take 1-2 minutes to fully restart. Don\'t press anything during this time - just be patient.',
            tip: 'If your iPhone doesn\'t restart after 3 minutes, try the force restart steps again, making sure to hold the buttons long enough.'
          }
        ]
      },
      {
        id: 'android-phone',
        name: 'Android Phone',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbf1?q=80&w=400&auto=format&fit=crop',
        steps: [
          {
            step: 1,
            title: 'Try the Home Button First',
            description: 'Look for buttons at the bottom of your phone screen or physical buttons below the screen. Tap the home button (usually looks like a house or circle). If your phone has three buttons, tap the middle one.',
            tip: 'Some newer Android phones don\'t have physical buttons - just swipe up from the bottom of the screen instead.'
          },
          {
            step: 2,
            title: 'Force Restart Your Android Phone',
            description: 'Find the power button (usually on the right side or top of your phone). Press and hold it down firmly for 15-20 seconds. Don\'t let go even if nothing happens at first. Keep holding until the screen goes completely black.',
            tip: 'The power button might be labeled with a circle and line symbol, or it might just be a button that\'s slightly different from the volume buttons.'
          },
          {
            step: 3,
            title: 'Turn Your Phone Back On',
            description: 'After the screen goes black, wait 5 seconds, then press the power button once (don\'t hold it this time). You should see your phone\'s logo appear - this might be Samsung, LG, Google, or another brand name.',
            tip: 'If your phone has a removable battery (older models), you can also remove the battery for 10 seconds and put it back in.'
          }
        ]
      },
      {
        id: 'laptop',
        name: 'Windows Laptop',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop',
        steps: [
          {
            step: 1,
            title: 'Try Ctrl + Alt + Delete First',
            description: 'Hold down three keys at the same time: Ctrl (bottom left), Alt (next to Ctrl), and Delete (top right). This might bring up a blue screen where you can choose "Task Manager" or "Sign out". If you see options, try clicking "Sign out" first.',
            tip: 'These three keys together are a special Windows command that can often break through frozen screens.'
          },
          {
            step: 2,
            title: 'Force Shut Down Your Laptop',
            description: 'Find the power button on your laptop (usually at the top right of the keyboard, or on the side). Press and hold it down for 10-15 seconds until the screen goes completely black and any lights turn off.',
            tip: 'Don\'t worry about "properly shutting down" when your laptop is frozen - this method is safe when nothing else works.'
          },
          {
            step: 3,
            title: 'Wait and Restart',
            description: 'After your laptop is completely off, wait 30 seconds. Then press the power button once (don\'t hold it) to turn it back on. You\'ll see the Windows logo and it will take 1-3 minutes to fully start up.',
            tip: 'Your laptop might show a message about "Windows didn\'t shut down properly" - this is normal and you can just click "Start Windows Normally".'
          }
        ]
      },
      {
        id: 'ipad',
        name: 'iPad',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d2c3d10887bbe5530210d6/47c5bad5d_Gemini_Generated_Image_n95mfyn95mfyn95m.png',
        steps: [
          {
            step: 1,
            title: 'Try the Home Button (If You Have One)',
            description: 'If your iPad has a round home button at the bottom, press it firmly once. If that doesn\'t work, press and hold it for 3 seconds. If your iPad doesn\'t have a home button, swipe up from the very bottom of the screen and hold.',
            tip: 'Newer iPads (iPad Pro, iPad Air 4th gen) don\'t have home buttons. Older iPads do have them.'
          },
          {
            step: 2,
            title: 'Force Restart Your iPad',
            description: 'For iPads without home button: Quickly press Volume Up, then quickly press Volume Down, then press and hold the Top button until you see the Apple logo. For iPads with home button: Press and hold both the Home button and the Top (or Side) button until you see the Apple logo.',
            tip: 'Hold the buttons for about 10 seconds - don\'t let go until you see the Apple logo appear on screen.'
          },
          {
            step: 3,
            title: 'Let Your iPad Restart',
            description: 'Once you see the Apple logo, release the buttons and wait patiently. Your iPad will take 1-2 minutes to fully restart. The screen might be black for a while - this is normal.',
            tip: 'Don\'t try to use your iPad until it\'s completely finished restarting and shows your home screen or lock screen.'
          }
        ]
      },
      {
        id: 'android-tablet',
        name: 'Android Tablet',
        image: 'https://images.unsplash.com/photo-1605170429432-a63315694c79?q=80&w=400&auto=format&fit=crop',
        steps: [
          {
            step: 1,
            title: 'Try the Home Button',
            description: 'Look for a home button on your tablet - it might be on the screen or a physical button. Tap it once. If your tablet has three buttons at the bottom, tap the middle one (usually a circle or house shape).',
            tip: 'Some tablets have the buttons on the screen itself, while others have physical buttons below the screen.'
          },
          {
            step: 2,
            title: 'Force Restart Your Android Tablet',
            description: 'Find the power button on your tablet (usually on the top edge or right side). Press and hold it down firmly for 15-20 seconds. Keep holding even if nothing happens at first - wait until the screen goes completely black.',
            tip: 'Android tablets can take a bit longer to force restart than phones, so be patient and keep holding the power button.'
          },
          {
            step: 3,
            title: 'Turn Your Tablet Back On',
            description: 'After the screen is black and the tablet is off, wait 10 seconds. Then press the power button once (just a quick press, don\'t hold). You should see the manufacturer\'s logo (Samsung, Lenovo, etc.) appear.',
            tip: 'Your tablet might take 2-3 minutes to fully start up, especially if it had been frozen for a while.'
          }
        ]
      },
      {
        id: 'kindle',
        name: 'Kindle E-Reader',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d2c3d10887bbe5530210d6/318baae27_Gemini_Generated_Image_5sl3n35sl3n35sl3.png',
        steps: [
          {
            step: 1,
            title: 'Try the Home Button First',
            description: 'Look for a home button on your Kindle - on older models, it\'s a physical button at the bottom. On newer models, tap the top of the screen to see if menu options appear. If you see a home icon, tap it.',
            tip: 'Different Kindle models have different button layouts, but there\'s usually some way to get back to the home screen.'
          },
          {
            step: 2,
            title: 'Force Restart Your Kindle',
            description: 'Find the power button on your Kindle (usually on the bottom edge or back). Press and hold it for 20-30 seconds. Kindle e-readers can take longer to respond than phones or tablets, so be very patient.',
            tip: 'Unlike phones, Kindles don\'t have batteries that run out quickly, so if it\'s frozen, it really needs a full restart.'
          }
        ]
      }
    ]
  },
  {
    id: 'wont-turn-on',
    title: 'My Device Won\'t Turn On',
    description: 'Black screen, no response when pressing buttons',
    icon: Power,
    color: 'orange',
    steps: [
      {
        step: 1,
        title: 'Check if It\'s Really Off',
        description: 'Sometimes the screen is just very dim. Take your device to a dark room and look closely at the screen while pressing the power button. You might see a very faint image. If you do, the problem might be screen brightness, not power.',
        tip: 'If you can see anything at all on the screen, try adjusting the brightness by going to Settings > Display > Brightness.'
      },
      {
        step: 2,
        title: 'Check Your Charger and Cable',
        description: 'Plug your device into its original charger. Look for any signs of life - a charging symbol, a small light, or the screen lighting up even briefly. Wait at least 15 minutes while it\'s plugged in. If nothing happens, try a different wall outlet.',
        tip: 'Even if the battery was completely dead, most devices should show some charging indication within 15 minutes. Make sure the charging cable clicks or fits snugly into your device.'
      },
      {
        step: 3,
        title: 'Try a Different Charger',
        description: 'If possible, borrow a charger from a friend or family member who has the same type of device. Charging cables can break internally even if they look fine on the outside. Try charging for 30 minutes with the different charger.',
        tip: 'Check that you\'re using the right type of charger. iPhones use Lightning cables, newer Android phones often use USB-C, and older Android phones use Micro-USB.'
      },
      {
        step: 4,
        title: 'Force Restart While Charging',
        description: 'While your device is plugged into the charger, try the force restart methods described in the "Device Frozen" section. Keep it plugged in while doing this and for 10 minutes afterward.',
        tip: 'Sometimes devices get stuck in a state where they appear dead but just need both charging and a force restart to wake up.'
      },
      {
        step: 5,
        title: 'When to Seek Help',
        description: 'If none of these steps work after trying for 2-3 hours, the problem may be with the battery or internal components. Contact the device manufacturer\'s support or visit a repair shop. Don\'t try to open the device yourself.',
        tip: 'Most devices have a warranty that covers hardware failures. Check if your device is still under warranty before paying for repairs.'
      }
    ]
  },
  {
    id: 'no-internet',
    title: 'No Internet Connection',
    description: 'Can\'t access websites, email, or apps',
    icon: Wifi,
    color: 'blue',
    steps: [
      {
        step: 1,
        title: 'Check Your WiFi Connection',
        description: 'Look at the very top of your screen for the WiFi symbol - it looks like curved lines stacked on top of each other, like a fan. If you see this symbol with no X or exclamation mark, you\'re connected. If there\'s an X or you don\'t see the symbol at all, you\'re not connected to WiFi.',
        tip: 'The WiFi symbol should be solid white or black. If it\'s grayed out or has an X, that means there\'s a connection problem.'
      },
      {
        step: 2,
        title: 'Reconnect to Your Home WiFi',
        description: 'Go to Settings, then look for "WiFi" or "Network." Make sure WiFi is turned on (the switch should be blue or green). Look for your home network name in the list - it\'s usually something like your internet provider\'s name or what you named it. Tap on your network name and enter your WiFi password.',
        tip: 'Your WiFi password is often printed on a sticker on your internet router (the box with blinking lights). It might be called "Network Key," "WPA Key," or "Passphrase."'
      },
      {
        step: 3,
        title: 'Restart Your Internet Router',
        description: 'Find your internet router - it\'s usually a box with several blinking lights and antennas. Unplug the power cord from the back of the router. Wait exactly 30 seconds (count them), then plug it back in. Wait 2-3 minutes for all the lights to stop blinking and become steady.',
        tip: 'This step fixes about 80% of home internet problems. The router is like a computer and sometimes needs to be restarted to work properly again.'
      },
      {
        step: 4,
        title: 'Test Your Connection',
        description: 'After your router has restarted and the lights are steady, try opening a website like Google.com or checking your email. If it works, you\'re all set! If not, try turning your device\'s WiFi off and on again in Settings.',
        tip: 'If you\'re still having trouble, the problem might be with your internet service provider. You can call their customer service number (usually found on your monthly bill).'
      },
      {
        step: 5,
        title: 'Use Mobile Data Temporarily',
        description: 'If you have a smartphone and still can\'t get WiFi working, you can use your phone\'s mobile data temporarily. Go to Settings > Cellular (iPhone) or Mobile Data (Android) and make sure it\'s turned on. This uses your phone plan\'s data.',
        tip: 'Be mindful of your data usage if you have a limited plan. Mobile data is great for essential things like calls and texts, but avoid watching videos or downloading large files.'
      }
    ]
  },
  {
    id: 'cant-make-calls',
    title: 'Can\'t Make Phone Calls',
    description: 'Phone calls won\'t connect or no sound during calls',
    icon: Phone,
    color: 'purple',
    steps: [
      {
        step: 1,
        title: 'Check Your Signal Strength',
        description: 'Look at the top-left corner of your phone screen for the signal bars - these look like stairs or ascending lines. You need at least 2-3 bars to make clear calls. If you see "No Service" or only 1 bar, try moving to a different location, preferably near a window or outside.',
        tip: 'Cell phone signals are stronger outdoors and near windows. Basements, thick buildings, and rural areas often have weaker signals.'
      },
      {
        step: 2,
        title: 'Make Sure You\'re Not in Airplane Mode',
        description: 'Look for an airplane symbol at the top of your screen. If you see it, airplane mode is on and blocking all calls. To turn it off: iPhone users go to Settings > Airplane Mode and turn it off. Android users swipe down from the top of the screen and tap the airplane icon to turn it off.',
        tip: 'Airplane mode is sometimes accidentally turned on. When it\'s on, you can\'t make calls, send texts, or use the internet unless you\'re connected to WiFi.'
      },
      {
        step: 3,
        title: 'Check if Do Not Disturb is On',
        description: 'Look for a moon symbol at the top of your screen. If you see it, Do Not Disturb mode is blocking calls. iPhone: Go to Settings > Do Not Disturb and turn it off. Android: Swipe down from the top, look for "Do Not Disturb" and tap to turn it off.',
        tip: 'Do Not Disturb is designed to silence calls and notifications, but it might be blocking calls you actually want to receive.'
      },
      {
        step: 4,
        title: 'Restart Your Phone',
        description: 'Turn your phone completely off by holding the power button and selecting "Power Off" or "Shut Down." Wait 30 seconds, then turn it back on. This refreshes your connection to the cell phone tower.',
        tip: 'Restarting fixes many calling issues because it forces your phone to reconnect to the cellular network with a fresh connection.'
      },
      {
        step: 5,
        title: 'Check for Blocked Numbers',
        description: 'If you can\'t call a specific person, they might be accidentally blocked. iPhone: Go to Settings > Phone > Blocked Contacts. Android: Open the Phone app, tap the three dots, select Settings > Blocked Numbers. Look for the person\'s number and unblock if needed.',
        tip: 'Numbers can be accidentally blocked, especially if you were trying to stop spam calls and accidentally blocked a contact.'
      },
      {
        step: 6,
        title: 'Test with Different Numbers',
        description: 'Try calling different phone numbers - a family member, your home phone, or even a business like your bank. If some calls work but others don\'t, the problem might be with the specific numbers, not your phone.',
        tip: 'If you can\'t call anyone at all, contact your phone carrier (Verizon, AT&T, T-Mobile, etc.) as there might be an issue with your account or service.'
      },
      {
        step: 7,
        title: 'Check Your Phone Bill and Account',
        description: 'Sometimes calling issues are caused by account problems. Make sure your phone bill is paid and your service hasn\'t been suspended. You can usually check this by logging into your carrier\'s website or calling their customer service.',
        tip: 'Even if you\'re set up for automatic payments, sometimes there can be issues with credit cards expiring or bank account changes that affect your service.'
      }
    ]
  }
];

export default function Emergency() {
  const [searchParams] = useSearchParams();
  const problemParam = searchParams.get('problem');
  const deviceParam = searchParams.get('device'); // New search parameter for device
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null); // New state for selected device

  useEffect(() => {
    if (problemParam) {
      const problem = emergencyProblems.find(p => p.id === problemParam);
      if (problem) {
        setSelectedProblem(problem);
        
        // If the problem requires device selection and a device param exists
        if (problem.showDeviceSelection && problem.devices && deviceParam) {
          const device = problem.devices.find(d => d.id === deviceParam);
          if (device) {
            setSelectedDevice(device);
          }
        } else if (!problem.showDeviceSelection) {
          // If the problem doesn't require device selection, clear any previously selected device
          setSelectedDevice(null);
        }
      }
    } else {
      setSelectedProblem(null);
      setSelectedDevice(null);
    }
  }, [problemParam, deviceParam]); // Add deviceParam to dependency array

  const getColorClasses = (color) => {
    const colors = {
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', button: 'bg-red-600 hover:bg-red-700' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', button: 'bg-orange-600 hover:bg-orange-700' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', button: 'bg-blue-600 hover:bg-blue-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', button: 'bg-purple-600 hover:bg-purple-700' }
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" className="mb-4 text-lg px-6 py-3 rounded-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            Emergency Tech Help
          </h1>
          <p className="text-2xl text-gray-600">
            Don't panic! We'll help you fix common problems step by step.
          </p>
        </div>

        {!selectedProblem ? (
          // Problem Selection
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                What's Wrong?
              </h2>
              <p className="text-xl text-gray-600 mb-8 text-center">
                Choose the problem you're experiencing
              </p>

              <div className="grid gap-6">
                {emergencyProblems.map((problem, index) => {
                  const colorClasses = getColorClasses(problem.color);
                  return (
                    <motion.div
                      key={problem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer ${colorClasses.bg} ${colorClasses.border} border-4 hover:shadow-xl transition-all duration-300`}
                        onClick={() => setSelectedProblem(problem)}
                      >
                        <CardContent className="p-8">
                          <div className="flex items-center">
                            <problem.icon className={`w-16 h-16 ${colorClasses.text} mr-6`} />
                            <div className="flex-1">
                              <h3 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
                                {problem.title}
                              </h3>
                              <p className="text-xl text-gray-700">
                                {problem.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <Button className={`${colorClasses.button} text-white text-lg px-6 py-3 rounded-xl`}>
                                Fix This
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-3xl shadow-lg p-8 border-4 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                Remember: Stay Calm
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-lg text-blue-800 font-medium">
                    Most problems can be fixed easily
                  </p>
                </div>
                <div>
                  <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-lg text-blue-800 font-medium">
                    Your information is usually safe
                  </p>
                </div>
                <div>
                  <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-lg text-blue-800 font-medium">
                    Take your time with each step
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : selectedProblem.showDeviceSelection && !selectedDevice ? (
          // Device Selection for Frozen Devices
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white shadow-lg border-4">
              <CardHeader className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedProblem(null)}
                  className="mb-4 text-lg px-6 py-3 rounded-xl mx-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Choose Different Problem
                </Button>
                <selectedProblem.icon className={`w-16 h-16 mx-auto mb-4 ${getColorClasses(selectedProblem.color).text}`} />
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {selectedProblem.title}
                </CardTitle>
                <p className="text-xl text-gray-600 mt-2">
                  First, choose your device type below:
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedProblem.devices.map((device, index) => (
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
                            className={`mx-auto mb-4 rounded-lg shadow-md object-contain ${
                              device.id === 'kindle' ? 'h-28 w-auto' : 'h-32 w-full object-cover'
                            }`}
                          />
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {device.name}
                          </h3>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                            Fix My {device.name}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : selectedDevice ? (
          // Device-Specific Steps
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white shadow-lg border-4">
              <CardHeader className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedDevice(null)} // Go back to device selection
                  className="mb-4 text-lg px-6 py-3 rounded-xl mx-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Choose Different Device
                </Button>
                <img 
                  src={selectedDevice.image}
                  alt={selectedDevice.name}
                  className="mx-auto mb-4 rounded-lg shadow-md h-32 w-auto object-contain"
                />
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Fixing Your Frozen {selectedDevice.name}
                </CardTitle>
                <p className="text-xl text-gray-600 mt-2">
                  Follow these steps carefully for your {selectedDevice.name}
                </p>
              </CardHeader>
            </Card>

            {selectedDevice.steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-white shadow-lg border-2">
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 ${getColorClasses(selectedProblem.color).button} text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-xl text-gray-700 leading-relaxed mb-4">
                          {step.description}
                        </p>
                        {step.tip && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <p className="text-lg text-yellow-800">
                              <strong>Helpful Tip:</strong> {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Still Need Help */}
            <Card className="bg-green-50 border-4 border-green-200">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Still Having Trouble?
                </h3>
                <p className="text-xl text-gray-700 mb-6">
                  That's okay! Sometimes these problems need extra help.
                </p>
                <div className="space-y-4">
                  <Link to={createPageUrl("Ask")}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-4 rounded-xl">
                      Ask for More Help
                    </Button>
                  </Link>
                  <p className="text-lg text-green-700">
                    You can also ask a family member or friend to help you with these steps.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          // Regular step-by-step solution for other problems (or if 'frozen' problem is selected but no device)
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white shadow-lg border-4">
              <CardHeader className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedProblem(null)}
                  className="mb-4 text-lg px-6 py-3 rounded-xl mx-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Choose Different Problem
                </Button>
                <selectedProblem.icon className={`w-16 h-16 mx-auto mb-4 ${getColorClasses(selectedProblem.color).text}`} />
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {selectedProblem.title}
                </CardTitle>
                <p className="text-xl text-gray-600 mt-2">
                  Follow these steps carefully - don't rush!
                </p>
              </CardHeader>
            </Card>

            {selectedProblem.steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-white shadow-lg border-2">
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 ${getColorClasses(selectedProblem.color).button} text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-xl text-gray-700 leading-relaxed mb-4">
                          {step.description}
                        </p>
                        {step.tip && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <p className="text-lg text-yellow-800">
                              <strong>Helpful Tip:</strong> {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Still Need Help */}
            <Card className="bg-green-50 border-4 border-green-200">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Still Having Trouble?
                </h3>
                <p className="text-xl text-gray-700 mb-6">
                  That's okay! Sometimes these problems need extra help.
                </p>
                <div className="space-y-4">
                  <Link to={createPageUrl("Ask")}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-4 rounded-xl">
                      Ask for More Help
                    </Button>
                  </Link>
                  <p className="text-lg text-green-700">
                    You can also ask a family member or friend to help you with these steps.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
