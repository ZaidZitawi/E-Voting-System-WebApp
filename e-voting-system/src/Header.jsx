
function Header(){
    return(
        
           <div className="flex flex-col gap-2 bg-[#f9fbf9] p-4 pb-2">
                <div className="flex items-center h-12 justify-end">
                <div className="flex w-12 items-center justify-end">
                    <button
                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#101911] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
                    >
                    <div className="text-[#101911]" data-icon="Bell" data-size="24px" data-weight="regular">
                        <BellIcon />
                    </div>
                    </button>
                </div>
                </div>
                <p className="text-[#101911] tracking-light text-[28px] font-bold leading-tight">Dashboard</p>
            </div>
       
    );

}

export default Header