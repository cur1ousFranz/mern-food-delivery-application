const Footer = () => {
    return (
        <footer className="w-full px-12 py-6 mt-44 bg-gray-100 border-t text-gray-800 sticky top-[100vh]">
            <div className="max-w-screen-xl py-10 mx-auto px-6 flex-col justify-center">
                <div className="flex">
                    <div className="w-1/2">
                        <h1 className="text-xl font-semibold">FOOD DELIVERY APPLICATION</h1>
                        <div className="flex space-x-12 mt-16">
                            <img src="/img/apple_store.svg" alt="" />
                            <img src="/img/playstore.png" style={{ width: '135px' }} alt="" />

                        </div>
                    </div>
                    <div className="w-1/2 flex space-x-24">
                        <div className="space-y-4 text-lg">
                            <h1>Get Help</h1>
                            <h1>Buy gift cards</h1>
                            <h1>Add your restaurant</h1>
                            <h1>Sign up to deliver</h1>
                            <h1>Create a business account</h1>
                        </div>
                        <div className="space-y-4 text-lg">
                            <h1>Restaurants near me</h1>
                            <h1>View all cities</h1>
                            <h1>View all countries</h1>
                            <h1>Pickup near me</h1>
                            <h1>About</h1>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <div className="flex justify-center space-x-12">
                        <h1>Privacy Policy</h1>
                        <h1>Terms</h1>
                        <h1>Pricing</h1>
                    </div>
                    <h1 className="text-center mt-4">© 2023 Developed by
                        <span className="font-semibold"> Franz Jeff Dignos</span>
                    </h1>
                </div>
            </div>
        </footer >
    );
}

export default Footer;