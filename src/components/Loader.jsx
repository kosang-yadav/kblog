import '../App.css'
const Loader = () => {
    return (

        <div className="flex items-center flex-col justify-center h-screen">
            <div className=" animte-body-spin flex flex-col items-center space-y-2 animate-bounce mt-8">
                <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="animate-arm-wave flex items-center justify-between w-16">
                    <div className="w-5 h-1 bg-blue-500 -rotate-45 "></div>
                    <div className="w-5 h-1 bg-blue-500 rotate-45"></div>
                </div>
                <div className="w-1 h-10 bg-blue-500"></div>
                <div className="animate-leg-step flex items-center justify-between w-12">
                    <div className="w-1 h-6 bg-blue-500 rotate-45"></div>
                    <div className="w-1 h-6 bg-blue-500 -rotate-45"></div>
                </div>
            </div>
        </div>

            //Loader - 9
        // <div class="flex items-center justify-center h-screen">
        //     <div class="flex flex-col items-center space-y-1 animate-bounce">
        //         <div class="w-6 h-6 bg-blue-500 rounded-full"></div>
        //         <div class="w-1 h-10 bg-blue-500"></div>
        //         <div class="flex items-center justify-between w-12">
        //             <div class="w-4 h-1 bg-blue-500 -rotate-45"></div>
        //             <div class="w-4 h-1 bg-blue-500 rotate-45"></div>
        //         </div>
        //         <div class="flex items-center justify-between w-12">
        //             <div class="w-1 h-6 bg-blue-500 -rotate-45"></div>
        //             <div class="w-1 h-6 bg-blue-500 rotate-45"></div>
        //         </div>
        //     </div>
        // </div>

        //     Loader - 8
        // <div class="loader flex items-center justify-center h-screen">
        //     <div class="relative w-24 h-24">
        //         <div class="absolute w-8 h-8 rounded-full bg-blue-500 top-0 left-8 animate-bounce"></div>
        //         <div class="absolute w-1 h-16 bg-blue-500 top-8 left-11 animate-pulse"></div>
        //         <div class="absolute w-1 h-8 bg-blue-500 top-16 left-6 animate-leg-left"></div>
        //         <div class="absolute w-1 h-8 bg-blue-500 top-16 left-14 animate-leg-right"></div>
        //         <div class="absolute w-12 h-1 bg-blue-500 top-8 left-0 animate-pulse"></div>
        //     </div>
        // </div>



            //Loader - 7
        // <div class="flex items-center justify-center h-screen">
        //     <div class="relative w-24 h-24">
        //         <div class="absolute w-8 h-8 rounded-full bg-blue-500 top-0 left-8 animate-bounce"></div>
        //         <div class="absolute w-1 h-16 bg-blue-500 top-8 left-11 animate-pulse"></div>
        //         <div class="absolute w-1 h-8 bg-blue-500 top-16 left-6 transform rotate-45 origin-bottom animate-ping"></div>
        //         <div class="absolute w-1 h-8 bg-blue-500 top-16 left-14 transform -rotate-45 origin-bottom animate-ping"></div>
        //         <div class="absolute w-12 h-1 bg-blue-500 top-8 left-0 animate-pulse"></div>
        //     </div>
        // </div>

        //     Loader - 6
        // <div class="flex items-center justify-center h-screen">
        //     <div class="relative flex items-center justify-center w-20 h-20">
        //         <div class="w-2 h-16 bg-blue-500 animate-pulse"></div>
        //         <div class="absolute w-2 h-10 bg-blue-500 transform rotate-45 origin-bottom -translate-x-1 animate-bounce"></div>
        //         <div class="absolute w-2 h-10 bg-blue-500 transform -rotate-45 origin-top -translate-x-1 animate-bounce"></div>
        //     </div>
        // </div>

        //     Loader - 5
        // <div class="flex items-center justify-center h-screen">
        //     <div class="relative w-16 h-16">
        //         <div class="absolute left-4 top-0 w-2 h-16 bg-blue-500 rounded animate-pulse"></div>
                
        //         <div class="absolute left-6 top-4 w-8 h-2 bg-blue-500 rounded transform rotate-45 origin-left animate-ping"></div>
        //         <div class="absolute left-6 bottom-4 w-8 h-2 bg-blue-500 rounded transform -rotate-45 origin-left animate-ping"></div>
        //     </div>
        // </div>

        //     Loader - 4
        // <div class="flex items-center justify-center h-screen">
        //     <div class="w-16 h-16 bg-gradient-to-tr from-blue-500 to-green-500 rounded-full animate-spin"></div>
        // </div>

        //     Loader - 3
        // <div class="flex items-center justify-center h-screen">
        //     <div class="relative flex">
        //         <div class="w-8 h-8 bg-blue-500 rounded-full animate-ping"></div>
        //         <div class="w-8 h-8 bg-blue-500 rounded-full animate-ping absolute left-4"></div>
        //         <div class="w-8 h-8 bg-blue-500 rounded-full animate-ping absolute left-8"></div>
        //     </div>
        // </div>

            //Loader - 2
        // <div class="flex items-center justify-center h-screen">
        //     <div class="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        // </div>

        //Loader - 1
    // <div className="min-h-screen flex items-center justify-center">
    //     <div className='loader'></div>;
    // </div>
    )
  };
  
  export default Loader;

  