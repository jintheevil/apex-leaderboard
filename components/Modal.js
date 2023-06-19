export default function ModalComponent({text}) {
    return (
        <div className={ "h-[100vh] w-[100vw] bg-gray-600 bg-opacity-60 grid place-items-center absolute"}>
            <div className={ 'p-6 bg-black rounded-xl '}>
                {text}
            </div>
        </div>
    )
}