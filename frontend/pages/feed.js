// import  Head  from "next/head";
// import { useState } from "react";
// import Minter from "./components/minter";
// import { Dialog } from '@headlessui/react'
// import Wallet from './components/wallet'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// export default function getDtweets() {
//     const [currentAccount, setCurrentAccount] = useState("");

//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//     const [allDtweets, setDtweets] = useState([]);
//     const contractAddress = "0xd5f08a0ae197482FA808cE84E00E97d940dBD26E";

//     return(
//       <>
//       <Head>
//         <title>Dtweet | Add tweet</title>
//         <link rel="icon" href="/favicon.ico"/>1`  q`
//       </Head>

//       <div className="px-6 pt-6 pb-1 lg:px-8">
//       <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        
//       </div>
//         <div>
//           <nav className="flex h-9 items-center justify-between" aria-label="Global">
//             <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
//               <h1 className="text-2xl">Dtweet</h1>
//             </div>
//             <div className="flex lg:hidden">
//               <button
//                 type="button"
//                 className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>
//             <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end bottom-0">              
//             {/* <div className='pl-0 pr-0 grid grid-cols-2 gap-2'> */}
//               {/* <div> <Wallet/> </div> */}
//               <a
//                       href="/dtweet"
//                       className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
//                     >
//                       Write a Dtweet
//                     </a>
//               {/* <div><button onClick={() => auth.signOut()} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
//           Sign Out
//         </button></div> */}
//               </div>
              
//             {/* </div> */}
//           </nav>
//           <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
//             <Dialog.Panel  className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
//               <div className="flex h-9 items-center justify-between">
//                 <div className="flex">
//                   <a href="#" className="-m-1.5 p-1.5">
//                     <span className="sr-only">Your Company</span>
//                   </a>
//                 </div>
//                 <div className="flex">
//                   <button
//                     type="button"
//                     className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-6 flow-root">
//                 <div className="-my-6 divide-y divide-gray-500/10">
                  
//                   <div className="py-6">
//                   {/* <div><button onClick={() => auth.signOut()} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
//           Sign Out
//         </button></div> */}
//                     <Wallet/>
//                     <a
//                       href="/dtweet"
//                       className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
//                     >
//                       Write a Dtweet
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </Dialog.Panel>
//           </Dialog>
//         </div>
//       </div>
//       <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                
//               </div>

      

        
        
//         </>
//     )
// }


import  Head  from "next/head";
import { useState } from "react";
import Minter from "./components/minter";
import { Dialog } from '@headlessui/react'
import Wallet from './components/wallet'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'  
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export default function dTweetForm() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const abi = CONTRACT_ABI;
  const address = CONTRACT_ADDRESS;
  const getAllDtweets = async () => {
    try {
      const ethereum = (window).ethereum;

      // const { ethereum } = window;
    
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dtweetsContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const dtweets = await dtweetsContract.getAllDtweets();

        let wdtweetsCleaned = [];
        dtweets.forEach(dtweet => {
          wdtweetsCleaned.push({
            address: dtweet.dtweetOwner,
            timestamp: new Date(dtweet.timestamp * 1000),
            msg: dtweet.msg
          });
        });


      }
      }catch(error){
        console.log(error)
      }
    return(
      <>
      <Head>
        <title>Dtweet | Add tweet</title>
        <link rel="icon" href="/favicon.ico"/>1`  q`
      </Head>


      <div className="px-6 pt-6 pb-1 lg:px-8">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
       
      </div>
        <div>
          <nav className="flex h-9 items-center justify-between" aria-label="Global">
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <h1 className="text-2xl">Dtweet</h1>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end bottom-0">              
            {/* <div className='pl-0 pr-0 grid grid-cols-2 gap-2'> */}
              {/* <div> <Wallet/> </div> */}
              <a
                      href="/feed"
                      className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Feed
                    </a>
              {/* <div><button onClick={() => auth.signOut()} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          Sign Out
        </button></div> */}
              </div>
             
            {/* </div> */}
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel  className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex h-9 items-center justify-between">
                <div className="flex">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                  </a>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                 
                  <div className="py-6">
                  {/* <div><button onClick={() => auth.signOut()} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          Sign Out
        </button></div> */}
                    <Wallet/>
                    <a
                      href="/feed"
                      className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Feed
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
               
              </div>


        <Minter />
        </>
    )
}


}


